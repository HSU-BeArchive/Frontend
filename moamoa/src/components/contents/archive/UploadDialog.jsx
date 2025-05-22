import React, { useState, useRef } from "react";
import "./UploadDialog.scss";
import uploadIcon from "../../../assets/images/archive-icon1.svg";

const UploadDialog = ({ onClose, onUpload }) => {
  const [memo, setMemo] = useState("");
  const fileRef = useRef();

  return (
    <div className="upload-overlay">
      <div className="upload-box">
        <div className="upload-body">
          {/* 왼쪽: 이미지 + 파일찾기 */}
          <div className="upload-left">
            <img src={uploadIcon} alt="upload" />
            <input type="file" ref={fileRef} hidden />
            <button onClick={() => fileRef.current.click()}>파일찾기</button>
          </div>

          {/* 오른쪽: 제목 + 메모 */}
          <div className="upload-right">
            <div className="upload-title">레퍼런스 이름</div>

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
          <button className="btn" onClick={onUpload}>
            업로드
          </button>
          <button className="btn" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadDialog;
