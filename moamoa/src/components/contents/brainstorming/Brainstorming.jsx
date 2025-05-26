import React from "react";
import { useParams } from "react-router-dom";
import ReferenceInfo from "./ReferenceInfo";
import ChatArea from "./ChatArea";
import useRefData from "../../../hooks/useRefData";
import "./Brainstorming.scss";

const Brainstorming = () => {
  const { folderId, refId } = useParams();
  const referenceData = useRefData(); // 레퍼런스 데이터

  return (
    <div className="brainstorming">
      <div className="brainstorming__header">
        <span className="brainstorming__title">아카이브 보드</span>
      </div>
      <div className="brainstorming__chat">
        {/* folderId, refId 전달 예정 */}
        <ReferenceInfo data={referenceData} folderId={folderId} refId={refId} />
        <ChatArea />
      </div>
    </div>
  );
};

export default Brainstorming;
