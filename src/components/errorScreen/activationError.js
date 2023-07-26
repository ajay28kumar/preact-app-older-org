import style from './style.css';
import BlockResult from '../blockResult';
import { route } from 'preact-router';
import { buyWithInstacredLandingRoute } from '../../alias/homeRoutes';

const ActivationError = ({ errorMessage }) => {
  return (
    <div className={style.errorContainer}>
      <div className={`${style.errorIcon} errorColor material-icons`}>
        warning
      </div>
      <div className='font20 errorColor bold-text' id='payment-failure'>
        Unable To Process
      </div>
      <div className={style.errorMessageContainer}>
        <div className={`${style.errorMessage} font14`} id='error-message'>
          <span className='text60 bold-text'>{errorMessage}</span>
        </div>
      </div>
      <BlockResult
        visibilityTimeUntilRedirect={5}
        displayMessage='Redirecting to instacred home page in '
        buttonText='Explore Merchants'
        submitFormCallback={() =>
          route(
            `${buyWithInstacredLandingRoute.path}${window.location.search}`,
            true,
          )
        }
      />
    </div>
  );
};
export default ActivationError;
