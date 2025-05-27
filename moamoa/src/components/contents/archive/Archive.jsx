import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArchiveCard from "./ArchiveCard";
import BrainstormButton from "./BrainstormButton";
import UploadButton from "./UploadButton";
import UploadDialog from "./UploadDialog";
import EmptyBoard from "./EmptyBoard";
import createRefApi from "../../../api/archive/createRefApi";
import getAllRefsApi from "../../../api/archive/getAllRefsApi";
import deleteRefApi from "../../../api/archive/deleteRefApi";
import extractKeywordsApi from "../../../api/keywords/extractKeywordsApi";
import Wordcloud from "../wordcloud/Wordcloud";
import "./archive.scss";

const Archive = () => {
  const { folderId } = useParams();
  const navigate = useNavigate();
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [cards, setCards] = useState([]);
  const [keywords, setKeywords] = useState([]);

  // 레퍼런스 전체 목록 불러오기
  useEffect(() => {
    const fetchCards = async () => {
      const refs = await getAllRefsApi(folderId); // 전체 조회 api 호출
      if (refs) {
        setCards(
          refs.map((ref) => ({
            referenceId: ref.referenceId,
            referenceName: ref.referenceName,
            referenceImgUrl: ref.referenceImgUrl,
          }))
        );
      }
    };

    fetchCards();
  }, [folderId]);

  // 레퍼런스 삭제
  const handleDelete = async (referenceId) => {
    const isdeleted = await deleteRefApi(folderId, referenceId);
    if (isdeleted) {
      setCards((prev) =>
        prev.filter((card) => card.referenceId !== referenceId)
      );
    } else {
      alert("레퍼런스 삭제 실패..");
    }
  };

  // 레퍼런스 생성
  const handleUpload = async (file, title, memo) => {
    if (!file || !title.trim() || !memo.trim()) return;

    // 레퍼런스 생성 api 호출
    const result = await createRefApi(title, memo, file, folderId);

    if (result) {
      setCards((prev) => [
        ...prev,
        {
          referenceId: result.referenceId,
          referenceName: result.referenceName,
          referenceImgUrl: result.referenceImgUrl,
        },
      ]);
      setShowUploadDialog(false);
    } else {
      alert("레퍼런스 업로드 실패..");
    }
  };

  const handleExtractKeywords = async () => {
    const res = await extractKeywordsApi(folderId);
    if (res?.isSuccess) {
      setKeywords(res.data.keywordList);
      console.log("추출된 키워드:", res.data.keywordList);
    } else {
      alert("키워드 추출 실패");
    }
  };

  return (
    <div className="archive-board-wrapper">
      <div className="archive-board-header">
        <div className="archive-board-title">아카이브 보드</div>
        <div className="archive-board-buttons">
          <BrainstormButton onClick={handleExtractKeywords} />
          <UploadButton
            onClick={() => setShowUploadDialog(true)}
            isActive={showUploadDialog}
          />
        </div>
      </div>

      {cards.length === 0 ? (
        <EmptyBoard />
      ) : (
        <div className="archive-board">
          {cards.map((card) => (
            <ArchiveCard
              key={card.referenceId}
              name={
                card.referenceName.length > 13
                  ? `${card.referenceName.slice(0, 13)}…`
                  : card.referenceName
              }
              image={card.referenceImgUrl}
              onDelete={() => handleDelete(card.referenceId)}
              onClick={
                () =>
                  navigate(
                    `/archive/${folderId}/brainstorm/${card.referenceId}`
                  ) // 브레인
              }
            />
          ))}
        </div>
      )}

      {showUploadDialog && (
        <UploadDialog
          onClose={() => setShowUploadDialog(false)}
          onUpload={handleUpload}
        />
      )}
      {keywords.length > 0 && (
        <div className="archive-board-wordcloud">
          <Wordcloud keywords={keywords} />
        </div>
      )}
    </div>
  );
};

export default Archive;
