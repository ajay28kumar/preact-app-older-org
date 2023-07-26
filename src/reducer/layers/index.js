import { combineReducers } from 'redux';
import snackBar from './snackBar';

const layers = combineReducers({
  snackBar,
});

export default layers;
