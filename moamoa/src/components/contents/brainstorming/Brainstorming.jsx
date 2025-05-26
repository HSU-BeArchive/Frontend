import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getOneRefApi from "../../../api/brainstorming/getOneRefApi";
import ReferenceInfo from "./ReferenceInfo";
import ChatArea from "./ChatArea";
import "./Brainstorming.scss";

const Brainstorming = () => {
  const { folderId, refId } = useParams();
  const [referenceData, setReferenceData] = useState(null); // 레퍼런스 데이터

  useEffect(() => {
    const fetchReference = async () => {
      // 레퍼런스 단일 조회 api 호출
      const data = await getOneRefApi(folderId, refId);
      setReferenceData(data);
    };
    fetchReference();
  }, [folderId, refId]);

  return (
    <div className="brainstorming">
      <div className="brainstorming__header">
        <span className="brainstorming__title">아카이브 보드</span>
      </div>
      <div className="brainstorming__chat">
        <ReferenceInfo data={referenceData} folderId={folderId} refId={refId} />
        <ChatArea />
      </div>
    </div>
  );
};

export default Brainstorming;
