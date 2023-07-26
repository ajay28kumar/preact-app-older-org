/** @jsx h */
import { h } from 'preact';
import TransactionErrorBlockBody from './transactionErrorBlockBody';
import style from './style.css';

const ErrorBlockTransactionModal = ({ closeModal }) => {
  return (
    <div className={style.container}>
      <TransactionErrorBlockBody closeModal={closeModal} />
    </div>
  );
};

export default ErrorBlockTransactionModal;
