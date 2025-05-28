import React, { useState, useEffect, useRef } from "react";
import startChatApi from "../../../api/brainstorming/startChatApi";
import sendChatApi from "../../../api/brainstorming/sendChatApi";
import historyChatApi from "../../../api/brainstorming/historyChatApi";
import getRecomIdApi from "../../../api/brainstorming/getRecomIdApi";
import LoadingSpinner from "../../common/spinner/LoadingSpinner";
import useThinkingDots from "../../../hooks/useThinkingDots";
import useAutoScroll from "../../../hooks/useAutoScroll";
import { HiOutlineArrowCircleUp } from "react-icons/hi";
import CHATBOT from "../../../assets/images/chat-bot.svg";

const ChatArea = ({ refId }) => {
  const [started, setStarted] = useState(false);
  const [loadingInit, setLoadingInit] = useState(false); // 최초 추천 질문
  const [loadingAI, setLoadingAI] = useState(false); // AI 응답 대기
  const [messages, setMessages] = useState([]);
  const [recommendationId, setRecommendationId] = useState(null);
  const [inputMessage, setInputMessage] = useState("");

  const thinkingDots = useThinkingDots(loadingAI); // 늘어나는 점
  const chatBoxRef = useRef(null);
  const inputRef = useRef(null);
  useAutoScroll(chatBoxRef, messages); // 자동 스크롤

  // 채팅 존재 여부 확인
  useEffect(() => {
    const fetchExisting = async () => {
      // RecommendationId 가져오는 api 호출
      const result = await getRecomIdApi(refId);
      if (result?.recommendationId) {
        setRecommendationId(result.recommendationId);

        const history = await historyChatApi(result.recommendationId);
        const initialQuestion = result.question
          ? [{ text: result.question, role: "AI" }]
          : [];

        setMessages([...initialQuestion, ...history]);
        setStarted(true);
      }
    };
    fetchExisting();
  }, [refId]);

  // AI 채팅 시작
  const startConversation = async () => {
    setStarted(true);
    setLoadingInit(true); // 초기 로딩

    // 시작 질문 api 호출
    const result = await startChatApi(refId);
    if (result) {
      const { question, recommendationId } = result;
      setMessages([{ text: question, role: "AI" }]);
      setRecommendationId(recommendationId);
    } else {
      setMessages([{ text: "추천 질문을 생성하지 못했습니다.", role: "AI" }]);
    }

    setLoadingInit(false);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !recommendationId) return;

    // 사용자 메세지
    const userMsg = inputMessage.trim();
    setMessages((prev) => [
      ...prev,
      { text: userMsg, role: "USER" },
      { text: "", role: "AI", thinking: true },
    ]);

    setInputMessage("");
    setLoadingAI(true);

    // 메세지 전송, AI 답변 요청 api
    const aiResponse = await sendChatApi({
      recommendationId,
      sendMsg: userMsg,
    });

    setMessages((prev) => {
      const newMsgs = [...prev];
      newMsgs[newMsgs.length - 1] = {
        text: aiResponse?.aiMessage || "잠시 후 다시 시도해 주세요.",
        role: "AI",
      };
      return newMsgs;
    });

    setLoadingAI(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // Enterkey 이벤트
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-area">
      <div className="chat-area__box" ref={chatBoxRef}>
        {!started ? (
          <div className="chat-area__intro">
            <p className="chat-area__intro-title">브레인스토밍 대화</p>
            <button
              className="chat-area__intro-button"
              onClick={startConversation}
            >
              시작하기
            </button>
          </div>
        ) : loadingInit ? (
          <LoadingSpinner
            message={"AI가 레퍼런스를 분석하여\n브레인스토밍을 준비하고 있어요"}
          />
        ) : (
          messages.map((msg, i) => (
            <div
              className="chat-area__message-wrapper"
              style={{
                justifyContent: msg.role === "USER" ? "flex-end" : "flex-start",
              }}
              key={i}
            >
              {msg.role === "AI" && (
                <img src={CHATBOT} alt="AI" className="chat-area__avatar" />
              )}
              <div
                className={`chat-area__bubble chat-area__bubble--${msg.role.toLowerCase()}`}
              >
                {msg.role === "AI" && msg.thinking
                  ? `생각 퍼즐 맞추는 중${thinkingDots}`
                  : msg.text}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="chat-area__input-wrapper">
        {started && (
          <>
            <input
              className="chat-area__input"
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="답변을 입력하세요."
              disabled={loadingInit || loadingAI}
            />
            <HiOutlineArrowCircleUp
              className="chat-area__icon"
              size="1.46vw"
              onClick={handleSendMessage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatArea;
