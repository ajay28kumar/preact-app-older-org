/** @jsx h */
// @flow

import { h, Fragment, VNode } from 'preact';
import { useCallback, useEffect, useState, useRef } from 'preact/compat';
import style from './style.css';

type Props = {
  open: Boolean,
  disableBackdropClick?: Boolean,
  disableEscapeKeyDown?: Boolean,
  className?: String,
  children: VNode,
  onClose?: Function,
};

const Modal = (props: Props) => {
  Modal.defaultProps = {
    open: false,
    disableBackdropClick: false,
    disableEscapeKeyDown: false,
    className: '',
  };

  const {
    onClose,
    open,
    disableBackdropClick,
    disableEscapeKeyDown,
    children,
    className,
  } = props;

  const [openModal, setOpenModal] = useState(open || false);

  const showModal = useCallback(() => {
    setOpenModal(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleKeyDown = useCallback((event) => {
    if (event.keyCode === 27 && !disableEscapeKeyDown) {
      closeModal(event);
    }
  }, []);

  const handleBackDropClick = useCallback((event) => {
    if (!disableBackdropClick) {
      closeModal(event);
    }
  }, []);

  const cleanUp = () => {
    removeEvent();
    setOpenModal(false);
    document.body.style.overflow = null;
  };

  const closeModal = (event) => {
    cleanUp();
    if (onClose) {
      onClose(event);
    }
  };

  const addEvent = useCallback(() => {
    window.addEventListener('keydown', handleKeyDown, false);
  }, []);

  const removeEvent = useCallback(() => {
    window.removeEventListener('keydown', handleKeyDown, false);
  }, []);

  useEffect(() => {
    if (open && openModal !== open) {
      showModal();
      addEvent();
    }
    return () => {
      cleanUp();
    };
  }, [open]);

  return (
    <Fragment>
      {open && openModal && (
        <div className={`${style.modal__wrapper} ${className}`}>
          <div
            className={`${style.modal__backdrop} ${!disableBackdropClick &&
              style.clickable}`}
            onClick={handleBackDropClick}
          />
          <div className={style.modal__container}>{children}</div>
        </div>
      )}
    </Fragment>
  );
};

export default Modal;
