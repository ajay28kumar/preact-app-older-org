import { combineReducers } from 'redux';
import categories from './categories';
import brands from './brands';
import merchants from './merchants';
import home from './home';
import offers from './offers';
import howToBuy from './howToBuy';

const buyWithInstacredLandingPage = combineReducers({
  categories,
  brands,
  merchants,
  home,
  offers,
  howToBuy,
});

export default buyWithInstacredLandingPage;
