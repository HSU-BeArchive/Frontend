import React, { useState } from "react";
import "./UploadDialog.scss";
import uploadIcon from "../../../assets/images/archive-icon1.svg";
import UploadDropzone from "./UploadDropzone";

const UploadDialog = ({ onClose, onUpload }) => {
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className="upload-overlay">
      <div className="upload-box">
        <div className="upload-body">
          <div className="upload-left">
            <UploadDropzone onFileSelect={handleFileSelect}>
              <img src={previewUrl || uploadIcon} alt="preview" />
              {!previewUrl && <button>파일찾기</button>}
            </UploadDropzone>
          </div>

          <div className="upload-right">
            <div className="upload-title-box">
              <input
                type="text"
                className="upload-title-input"
                placeholder="레퍼런스 이름"
                maxLength={30}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="underline" />
            </div>

            <div className="upload-memo-box">
              <div className="upload-memo-label">아이디어 메모</div>
              <textarea
                className="upload-memo-textarea"
                placeholder="텍스트를 입력하세요."
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="upload-actions">
          <button
            className="btn btn__upload"
            onClick={() => onUpload(file, title, memo)}
          >
            업로드
          </button>
          <button className="btn btn__cancel" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadDialog;
