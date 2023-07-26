/** @jsx h */
//@flow
import { h } from 'preact';
import style from './style.css';
import RequestButton from '../requestButton';
import { route } from 'preact-router';
import { buyWithInstacredLandingRoute } from '../../alias/homeRoutes';

type Props = {
  pageKey: string,
};

const NonNTBMerchants = ({ pageKey }: Props) => {
  return (
    <div>
      <div className={style.ntbLandingPageContainer}>
        <div className={style.instaCredHeaderBranding}>
          <div>
            <img
              src='https://iccdn.in/img/instacred-cardless-emi-logo.svg'
              alt='InstaCred Cardless EMI'
              className={style.instaCredImg}
            />
          </div>
        </div>
      </div>
      <div className={style.registrationMessageContainer}>
        <div
          className={`font20 text80 bold-text text-center ${
            style.thankYouContainer
          }`}>
          We are Sorry
        </div>
        <div
          className={`font16 text60 text-center ${style.eligibilityContainer}`}>
          It seems that your number is not currently pre-approved with any of
          our lending partners for InstaCred Cardless EMI.
        </div>
        <div
          className={`font20 text80 bold-text text-center ${
            style.thankYouContainer
          }`}>
          Check back again!
        </div>
        <div
          className={`font16 text60 text-center ${style.eligibilityContainer}`}>
          We are continuously working to add more lending partners to InstaCred
          network and also our lending partners do keep updating their list
          regularly to approve more customers.
        </div>
        <RequestButton
          buttonId='go-to-bic'
          pageKey={pageKey}
          buttonWrapperClass={style.submitButton}
          elementName='Start Shopping Button'
          buttonText='Explore More'
          buttonOnClick={() => route(buyWithInstacredLandingRoute.path, true)}
        />
      </div>
    </div>
  );
};

export default NonNTBMerchants;
