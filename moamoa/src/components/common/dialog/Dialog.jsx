import React from "react";
import "./Dialog.scss";
import { MdError } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

const Dialog = ({
  iconColor = "#D60000",
  title = "타이틀",
  message = "메세지",
  subMessage = "서브메세지",
  cancelText,
  confirmText,
  onCancel = () => {},
  onConfirm = () => {},
}) => {
  return (
    <div className="dialog">
      <div className="dialog__header">
        <div className="dialog__left">
          <MdError className="dialog__icon" color={iconColor} />
          <div className="dialog__title text-alert">{title}</div>
        </div>
        <IoCloseOutline className="dialog__close" onClick={onCancel} />
      </div>

      <div className="dialog__content">
        <div className="dialog__message">{message}</div>
        <div className="dialog__submessage">{subMessage}</div>
      </div>

      <div className="dialog__buttons">
        {cancelText && (
          <button
            onClick={onCancel}
            className="dialog__button dialog__button--cancel"
          >
            {cancelText}
          </button>
        )}
        {confirmText && (
          <button
            onClick={onConfirm}
            className="dialog__button dialog__button--confirm"
          >
            {confirmText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Dialog;
