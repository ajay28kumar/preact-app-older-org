/** @jsx h */
// @flow
import { h } from 'preact';
import { useState, useEffect, useCallback, useRef } from 'preact/compat';
import { connect } from 'react-redux';
import onModalAction from '../../../../actions/onModalAction';
import actionType, {
  modalType,
} from '../../../../actions/onModalAction/actionType';
import CancelTransactionModal from './cancelTransactionModal';
import HelpTransactionModal from './helpTransactionModal';
import ErrorBlockTransactionModal from './errorBlockTransactionModal';
import style from './style.css';
import AivfInfoModal from './aivfInfoModal';
import { tracker, UserActionType } from '../../../../tracking';
import ModalComponent from '../../../material-ui/Modal';

type Props = {
  pageKey: string,
  template: string,
  pageKey: string,
  onModalAction: Function,
};

const Modal = (props: Props) => {
  const [open, setOpen] = useState(false);
  const { template, onModalAction, pageKey } = props || {};
  const prevTemplate = useRef('none');

  const showModal = useCallback(() => {
    setOpen(true);
    prevTemplate.current = template;
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    onModalAction(actionType.closeModal);

    prevTemplate.current = template;
  }, []);

  const sendCancelTransactionTracking = () => {
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'continue_transaction',
      pageKey,
      '',
    );
  };

  useEffect(() => {
    if (template !== 'none' && prevTemplate.current !== template) {
      showModal();
    }
  }, [template]);

  switch (template) {
    case modalType.cancelTransactionModal:
      return (
        <ModalComponent
          open={open}
          onClose={() => {
            closeModal();
            sendCancelTransactionTracking();
          }}
          className={style.modalContainer}>
          <div className={style.modalBody}>
            <CancelTransactionModal
              closeModal={() => {
                closeModal();
                sendCancelTransactionTracking();
              }}
            />
          </div>
        </ModalComponent>
      );
    case modalType.helpTransactionModal:
      return (
        <ModalComponent
          open={open}
          onClose={closeModal}
          className={style.modalContainer}>
          <div className={style.modalBody}>
            <HelpTransactionModal closeModal={closeModal} />
          </div>
        </ModalComponent>
      );
    case modalType.errorBlockTransactionModal:
      return (
        <ModalComponent
          open={open}
          onClose={closeModal}
          className={style.modalContainer}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}>
          <div className={style.modalBody}>
            <ErrorBlockTransactionModal closeModal={closeModal} />
          </div>
        </ModalComponent>
      );
    case modalType.aivfTransactionInfoModal:
      return (
        <ModalComponent
          open={open}
          onClose={closeModal}
          className={style.modalContainer}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}>
          <div
            className={`${style.modalBody} ${style.aivfTransactionInfoModal}`}>
            <AivfInfoModal closeModal={closeModal} />
          </div>
        </ModalComponent>
      );
    case 'none':
      return null;
    default:
      console.info(`Missing modal handling for: ${template}`);
      return null;
  }
};

const mapStateToProps = ({ modal, config }) => {
  const { pageKey } = config || {};
  const { template } = modal || {};
  return {
    template,
    pageKey,
  };
};

export default connect(
  mapStateToProps,
  { onModalAction },
)(Modal);
