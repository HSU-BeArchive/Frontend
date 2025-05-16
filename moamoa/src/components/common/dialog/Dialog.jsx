import React from "react";
import "./Dialog.scss";
import { MdError } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

const Dialog = ({
  iconColor = "#D60000",
  title = "타이틀",
  message = "메세지",
  subMessage = "서브메세지",
  cancelText = "아니요",
  confirmText = "삭제",
  onCancel = () => {},
  onConfirm = () => {},
}) => {
  return (
    <div className="dialog-container">
      <div className="dialog-header">
        <div className="dialog-left">
          <MdError className="dialog-icon" color={iconColor} />
          <div className="dialog-title text-alert">{title}</div>
        </div>
        <IoCloseOutline className="dialog-close" onClick={onCancel} />
      </div>
      <div className="dialog-content">
        <div className="dialog-message">{message}</div>
        <div className="dialog-submessage">{subMessage}</div>
      </div>
      <div className="dialog-buttons">
        <button onClick={onCancel} className="dialog-button cancel">
          {cancelText}
        </button>
        <button onClick={onConfirm} className="dialog-button confirm">
          {confirmText}
        </button>
      </div>
    </div>
  );
};

export default Dialog;
