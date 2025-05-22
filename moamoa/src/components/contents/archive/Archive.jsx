import React, { useState } from "react";
import ArchiveCard from "./ArchiveCard";
import BrainstormButton from "./BrainstormButton";
import UploadButton from "./UploadButton";
import UploadDialog from "./UploadDialog";
import "./archive.scss";

const dummyData = Array(9).fill("레퍼런스 이름");

const Archive = () => {
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const handleDelete = (index) => alert(`${index + 1}번 카드 삭제`);
  const handleUpload = () => {
    alert("업로드 완료");
    setShowUploadDialog(false);
  };

  return (
    <div className="archive-board-wrapper">
      <div className="archive-board-header">
        <div className="archive-board-title">아카이브 보드</div>
        <div className="archive-board-buttons">
          <BrainstormButton onClick={() => alert("브레인스토밍 시각화")} />
          <UploadButton
            onClick={() => setShowUploadDialog(true)}
            isActive={showUploadDialog}
          />
        </div>
      </div>

      <div className="archive-board">
        {dummyData.map((name, index) => (
          <ArchiveCard
            key={index}
            name={name}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>

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
