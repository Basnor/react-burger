import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./modal.module.css";

const modalRoot = document.getElementById("react-modals");

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

function ModalOverlay(props: { onClose: () => void }) {
  const { onClose } = props;

  const handleClick = () => {
    onClose();
  };

  return <div className={styles.overlay} onClick={handleClick}></div>;
}

function Modal(props: ModalProps) {
  const { children, onClose } = props;

  const closeModal = () => {
    onClose();
  };

  useEffect(() => {
    const onKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return createPortal(
    <>
      <ModalOverlay onClose={closeModal} />
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={closeModal}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </>,
    modalRoot as HTMLDivElement
  );
}

export default Modal;
