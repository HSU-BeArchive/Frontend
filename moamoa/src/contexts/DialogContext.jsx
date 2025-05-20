import React, { createContext, useState, useCallback } from "react";
import Dialog from "../components/common/dialog/Dialog";

export const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [dialogConfig, setDialogConfig] = useState(null);

  // 보이기
  const showDialog = useCallback((config) => {
    setDialogConfig(config);
  }, []);

  // 닫기
  const closeDialog = useCallback(() => {
    setDialogConfig(null);
  }, []);

  // Confirm 버튼 -> 실행 후 닫음
  const handleConfirm = () => {
    dialogConfig?.onConfirm?.();
    closeDialog();
  };

  return (
    <DialogContext.Provider value={{ showDialog, closeDialog }}>
      {children}
      {dialogConfig && (
        <Dialog
          {...dialogConfig}
          onCancel={closeDialog}
          onConfirm={handleConfirm}
        />
      )}
    </DialogContext.Provider>
  );
};
