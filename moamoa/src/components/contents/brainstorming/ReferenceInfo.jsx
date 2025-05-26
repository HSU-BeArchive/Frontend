import React, { useState, useEffect } from "react";
import editRefInfoApi from "../../../api/brainstorming/editRefInfoAPI";
import { GoPencil } from "react-icons/go";
import { IoCheckmark } from "react-icons/io5";
import "./Brainstorming.scss";

const ReferenceInfo = ({ data, folderId, refId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("레퍼런스 이름");
  const [memo, setMemo] = useState("");

  // props로 받은 데이터 적용
  useEffect(() => {
    if (data) {
      setName(data.referenceName || "");
      setMemo(data.referenceDescription || "");
    }
  }, [data]);

  // 레퍼런스 이름, 메모 수정
  const handleSave = async () => {
    if (name.trim() === "" || memo.trim() === "") {
      return;
    }
    const referenceName = name !== data.referenceName ? name : null;
    const referenceDescription =
      memo !== data.referenceDescription ? memo : null;

    // 변경사항 없으면 요청 생략
    if (referenceName === null && referenceDescription === null) {
      setIsEditing(false);
      return;
    }

    // 이름, 메모 수정 api 요청
    await editRefInfoApi(folderId, refId, referenceName, referenceDescription);

    setIsEditing(false);
    console.log("레퍼런스 수정됨");
  };

  return (
    <div className="ref-info">
      <div className="ref-info__image">
        <img
          src={
            data?.referenceImgUrl ||
            "https://cdn.spectory.net/src/images/noImg.gif"
          }
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
