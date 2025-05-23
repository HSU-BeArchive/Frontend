import React, { useState, useEffect } from "react";
import { GoPencil } from "react-icons/go";
import { IoCheckmark } from "react-icons/io5";
import "./Brainstorming.scss";

const ReferenceInfo = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("레퍼런스 이름");
  const [memo, setMemo] = useState("");

  // props로 받은 데이터 적용
  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setMemo(data.description || "");
    }
  }, [data]);

  const handleSave = () => {
    if (name.trim() !== "") {
      setIsEditing(false);
      // 서버 저장  추가 예정
      //console.log("저장됨:", { name, memo });
    }
  };

  return (
    <div className="ref-info">
      <div className="ref-info__image">
        <img
          src={data?.img || "https://cdn.spectory.net/src/images/noImg.gif"}
          alt="레퍼런스 이미지"
        />
      </div>

      <div className="ref-info__reference">
        {isEditing ? (
          <input
            className="ref-info__reference-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
        ) : (
          <span className="ref-info__reference-name">{name}</span>
        )}
        {isEditing ? (
          <IoCheckmark
            className="ref-info__reference-icon"
            onClick={handleSave}
          />
        ) : (
          <GoPencil
            className="ref-info__reference-icon"
            onClick={() => setIsEditing(true)}
          />
        )}
      </div>

      <div className="ref-info__memo">
        <div className="ref-info__memo-title">아이디어 메모</div>
        <textarea
          className="ref-info__memo-input"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="텍스트를 입력하세요."
          disabled={!isEditing}
        />
      </div>
    </div>
  );
};

export default ReferenceInfo;
