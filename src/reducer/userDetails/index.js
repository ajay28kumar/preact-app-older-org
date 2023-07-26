import { combineReducers } from 'redux';
import smartUserDetails from './smartUserDetails';

const userDetails = combineReducers({
  smartUserDetails,
});

export default userDetails;
