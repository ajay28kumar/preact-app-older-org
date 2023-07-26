import { combineReducers } from 'redux';

import template from './template';
import cancelTransaction from './cancelTransaction';
import transactionHelpText from './transactionHelpText';
import errorBlockTransaction from './errorBlockTransaction';

export default combineReducers({
  template,
  cancelTransaction,
  transactionHelpText,
  errorBlockTransaction,
});
