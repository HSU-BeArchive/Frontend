import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ArchiveCard from "./ArchiveCard";
import BrainstormButton from "./BrainstormButton";
import UploadButton from "./UploadButton";
import UploadDialog from "./UploadDialog";
import EmptyBoard from "./EmptyBoard";
import createRefApi from "../../../api/archive/createRefApi";
import "./archive.scss";

const Archive = () => {
  const { folderId } = useParams();
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [cards, setCards] = useState([]);

  const handleDelete = (id) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
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
          id: result.referenceId,
          name: result.name,
          image: result.imgUrl,
        },
      ]);
      setShowUploadDialog(false);
    } else {
      alert("레퍼런스 업로드 실패..");
    }
  };

  return (
    <div className="archive-board-wrapper">
      <div className="archive-board-header">
        <div className="archive-board-title">아카이브 보드</div>
        <div className="archive-board-buttons">
          <BrainstormButton onClick={() => {}} />
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
              key={card.id}
              name={
                card.name.length > 13 ? `${card.name.slice(0, 13)}…` : card.name
              }
              image={card.image}
              onDelete={() => handleDelete(card.id)}
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
    </div>
  );
};

export default Archive;
