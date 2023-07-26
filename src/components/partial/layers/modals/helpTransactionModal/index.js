/** @jsx h */
import { h } from 'preact';
import TransactionHelpBody from './transactionHelpBody';
import style from './style.css';

const HelpTransactionModal = ({ closeModal }) => {
  return (
    <div className={style.container}>
      <TransactionHelpBody closeModal={closeModal} />
    </div>
  );
};

export default HelpTransactionModal;
