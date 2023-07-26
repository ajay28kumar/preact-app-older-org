import { commonActionType, paymentInitActionType } from '../../actionTypes';
import paymentInitAction from './actionType';
import getTransactionInfo from './getTransactionInfo';
import { tracker } from '../../tracking';
import onTransactionErrorBlock from '../onTransactionErrorBlock';

export default (actionType, ...args) => (dispatch, getState) => {
  switch (actionType) {
    case paymentInitAction.initialize:
      const data = args[0];
      const { utmCampaign, txnUuid } = data || {};
      dispatch({
        type: commonActionType.INIT_QUERY,
        payload: {
          utmCampaign,
          txnUuid,
          shouldShowHeader: false,
          shouldShowDrawer: false,
        },
      });
      return dispatch(getTransactionInfo({ txnUuid }));
    case paymentInitAction.onTransactionTimeOut:
      const { config, modal } = getState() || {};
      const { pageKey } = config || {};
      const { errorBlockTransaction } = modal || {};
      const {
        cta,
        errorType,
        helpText,
        title,
        message = 'Transaction has exceeded the time limit and has been canceled.',
      } = errorBlockTransaction || {};
      tracker.trackApplicationError(
        'Transaction Timeout',
        pageKey || 'Missing pageKey',
      );
      dispatch({
        type: paymentInitActionType.TRANSACTION_TIMEOUT_ERROR_MESSAGE,
        payload: {
          errorMessage: message,
        },
      });
      return dispatch(
        onTransactionErrorBlock({ cta, errorType, helpText, title, message }),
      );
    default:
      return console.error(`missing handle for actionType: ${actionType}`);
  }
};
