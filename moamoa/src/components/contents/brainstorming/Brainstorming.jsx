import React, { useState } from "react";
import ReferenceInfo from "./ReferenceInfo";
import ChatArea from "./ChatArea";
import useRefData from "../../../hooks/useRefData";
import "./Brainstorming.scss";

const Brainstorming = () => {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const referenceData = useRefData(); // 레퍼런스 데이터

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
    <div className="brainstorming">
      <div className="brainstorming__header">
        <span className="brainstorming__title">아카이브 보드</span>
      </div>
      <div className="brainstorming__chat">
        <ReferenceInfo data={referenceData} />
        <ChatArea
          started={started}
          loading={loading}
          messages={messages}
          inputDisabled={loading}
          onStart={startConversation}
        />
      </div>
    </div>
  );
};

export default Brainstorming;
