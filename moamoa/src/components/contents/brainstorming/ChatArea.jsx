import React from "react";

import LoadingSpinner from "../../common/spinner/LoadingSpinner";
import { HiOutlineArrowCircleUp } from "react-icons/hi";

const ChatArea = ({ started, loading, messages, inputDisabled, onStart }) => {
  return (
    <div className="chat-area">
      <div className="chat-area__box">
        {!started ? (
          <div className="chat-area__intro">
            <p className="chat-area__intro-title">브레인스토밍 대화</p>
            <button className="chat-area__intro-button" onClick={onStart}>
              시작하기
            </button>
          </div>
        ) : (
          <>
            {loading ? (
              <LoadingSpinner
                message={
                  "AI가 레퍼런스를 분석하여\n브레인스토밍을 준비하고 있어요"
                }
              />
            ) : (
              messages.map((msg, i) => (
                <div className="chat-area__bubble" key={i}>
                  {msg}
                </div>
              ))
            )}
            <div className="chat-area__input-wrapper">
              <input
                className="chat-area__input"
                type="text"
                placeholder="답변을 입력하세요."
                disabled={inputDisabled}
              />
              <HiOutlineArrowCircleUp
                className="chat-area__icon"
                size="1.46vw"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatArea;
