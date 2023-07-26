/** @jsx h */
import { h } from 'preact';
import 'preact-material-components/Dialog/style.css';
import style from './style.css';
import TransactionCancelBody from './transactionCancelBody';

const CancelTransactionModal = ({ closeModal }) => {
  return (
    <div className={style.container}>
      <TransactionCancelBody closeModal={closeModal} />
    </div>
  );
};

export default CancelTransactionModal;
