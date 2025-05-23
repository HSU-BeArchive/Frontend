import React, { useState } from "react";
import ArchiveCard from "./ArchiveCard";
import BrainstormButton from "./BrainstormButton";
import UploadButton from "./UploadButton";
import UploadDialog from "./UploadDialog";
import "./archive.scss";

const Archive = () => {
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [cards, setCards] = useState([]);

  const handleDelete = (index) => {
    setCards((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = (file, memo) => {
    if (!file) return;

    const newCard = {
      name: file.name,
      previewUrl: URL.createObjectURL(file),
    };

    setCards((prev) => [...prev, newCard]);
    setShowUploadDialog(false);
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

      <div className="archive-board">
        {cards.map((card, index) => (
          <ArchiveCard
            key={index}
            name={card.name}
            previewUrl={card.previewUrl}
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
