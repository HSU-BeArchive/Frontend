import React, { useState } from "react";
import LoadingSpinner from "../../common/spinner/LoadingSpinner";
import { HiOutlineArrowCircleUp } from "react-icons/hi";

const ChatArea = () => {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  // AI 채팅 시작
  const startConversation = () => {
    setStarted(true);
    setLoading(true);
    setTimeout(() => {
      // 테스트용
      setMessages(["AI가 처음 하는 말."]);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="chat-area">
      <div className="chat-area__box">
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
        ) : loading ? (
          <LoadingSpinner
            message={"AI가 레퍼런스를 분석하여\n브레인스토밍을 준비하고 있어요"}
          />
        ) : (
          messages.map((msg, i) => (
            <div className="chat-area__bubble" key={i}>
              {msg}
            </div>
          ))
        )}
      </div>
      <div className="chat-area__input-wrapper">
        {started && (
          <>
            <input
              className="chat-area__input"
              type="text"
              placeholder="답변을 입력하세요."
              disabled={loading}
            />
            <HiOutlineArrowCircleUp className="chat-area__icon" size="1.46vw" />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatArea;
