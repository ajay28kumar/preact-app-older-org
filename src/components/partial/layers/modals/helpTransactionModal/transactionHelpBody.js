/** @jsx h */
import { h } from 'preact';
import style from './style.css';
import { connect } from 'react-redux';
import SubmitButton from '../../../../submitButton';

const TransactionHelpBody = (props) => {
  const { transactionHelpTitle, helpText: HelpText, pageKey } = props || {};
  return (
    <div>
      <div className={style.headerContainer}>
        <div className='font20 text80 bold-text text-center'>
          {transactionHelpTitle}
        </div>
      </div>
      <div>
        <HelpText />
      </div>
      <div>
        <SubmitButton
          buttonText='OK'
          buttonOnClick={props.closeModal}
          elementName={'help_modal_close'}
          buttonId='help-text-close'
          pageKey={pageKey}
          className={style.submitButton}
          trackClickEvent={false}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ modal, config }) => {
  const { transactionHelpText } = modal || {};
  const { transactionType, transactionHelpTitle, helpText } =
    transactionHelpText || {};
  const { pageKey } = config;
  return {
    transactionType,
    transactionHelpTitle,
    helpText,
    pageKey,
  };
};
export default connect(mapStateToProps)(TransactionHelpBody);
