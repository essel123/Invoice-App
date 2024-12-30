import React, { useCallback } from "react";
import "./Dialog.css";
import { useAppDispatch, useAppSelector } from "../../../State/hooks";
import { setDialog } from "../../../State/stateSlice";

interface DialogProps {
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ children }) => {
  const isOpen = useAppSelector(
    (state: { pageState: { isOpen: boolean } }) => state.pageState.isOpen
  );

  const isDelete = useAppSelector(
    (state: { pageState: { isDelete: boolean } }) => state.pageState.isDelete
  );
  const dispatch = useAppDispatch();

  const handleClose = useCallback(
    () => {
      dispatch(setDialog(!isOpen));
    },
    [dispatch, isOpen]
  );

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={handleClose}>
      <div
        className={` ${isDelete?'center':'dialog-content'} ${isOpen ? "slide-in" : "slide-out"}`}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default React.memo(Dialog);

