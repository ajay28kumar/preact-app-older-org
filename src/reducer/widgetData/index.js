import { combineReducers } from 'redux';
import userActivation from './userActivation';
import emiInfo from './emiInfo';
import howToBuy from './howToBuy';
import widgetHeaders from './headers';
import merchantData from './merchantData';
import metadata from './metadata';

const widgetData = combineReducers({
  userActivation,
  emiInfo,
  howToBuy,
  widgetHeaders,
  merchantData,
  metadata,
});

export default widgetData;
