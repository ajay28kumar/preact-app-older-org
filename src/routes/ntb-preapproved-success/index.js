/** @jsx h */
//flow
import { h, Component } from 'preact';
import style from './style.css';
import withBaseComponent from '../../HOC/withBaseComponent';
import { connect } from 'react-redux';
import RequestButton from '../../components/requestButton';
import { route } from 'preact-router';
import {
  buyWithInstacredLandingRoute,
  newUserActivationLandingPageRoute,
} from '../../alias/homeRoutes';
import type { LenderDetails } from '../../modelType/transactionTypes';
import BrowserExitTracking from '../../components/common/browserExitTracking';
import AutoRedirect from '../../components/common/autoRedirect';

type Props = {
  showShowLenderList: boolean,
  getLenderList: Array<LenderDetails>,
  ntbDetails: Object,
  message: string,
};

class preApprovedUserActivationSuccess extends Component<Props> {
  pageKey = 'UA Preapproved';

  componentDidMount() {
    const { ntbDetails } = this.props || {};
    const { mobileNo, lenderDetailsList } = ntbDetails || {};
    if (!mobileNo || lenderDetailsList.length === 0) {
      return route(newUserActivationLandingPageRoute.path);
    }
  }

  render() {
    const { ntbDetails } = this.props;
    const { mobileNo, lenderDetailsList, redirectUrl } = ntbDetails || {};
    const redirect = () =>
      redirectUrl
        ? (location.href = redirectUrl)
        : route(buyWithInstacredLandingRoute.path);

    const extractHostname = (url) => {
      if (!url) {
        return 'Merchant';
      }
      var hostname;
      if (url.indexOf('//') > -1) {
        hostname = url.split('/')[2];
      } else {
        hostname = url.split('/')[0];
      }

      hostname = hostname.split(':')[0];
      hostname = hostname.split('?')[0];

      return hostname;
    };

    const merchantName = extractHostname(redirectUrl);

    return (
      <div className={style.pageWrapper}>
        <BrowserExitTracking
          pageKey={this.pageKey}
          elementName='Close Window'
        />
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
        <div className={`contrast-color ${style.registrationMessageContainer}`}>
          <div className={style.successContainer}>
            <i className={`${style.successIcon} text-color material-icons`}>
              done
            </i>
          </div>
          <div
            className={`font24 bold-text text-center ${
              style.congratulationsContainer
            }`}>
            Pre-Approved for InstaCred EMI!
          </div>
          <div className={`font16 ${style.preApprovedText}`}>
            <div className='font16'>
              You are already pre-approved for an InstaCred EMI credit line. No
              additional action needed.
            </div>
            <div className={`font16 ${style.mobileNumberContainer}`}>
              <span>Provide phone number </span>
              <span className='bold-text'>{mobileNo} </span>
              <span>while making the payment</span>
            </div>
          </div>
        </div>
        <div className={style.lenderListContainer}>
          <div className='contrast-color font12  text80'>YOUR CREDIT LINES</div>
        </div>
        {lenderDetailsList && (
          <div className={style.lenderListWrapper}>
            {lenderDetailsList.map((lender, index) => (
              <div
                className={style.lenderList}
                key={`${lender.lenderId}-${index}`}>
                <div className={style.lenderIcon}>
                  <img src={lender.lenderLogoIcon} />
                </div>
                <div className={style.lenderDetails}>
                  <div className={`font16 ${style.lenderName}`}>
                    {lender.lenderName}
                  </div>
                  <div className={`font12 ${style.emiStartsContainer}`}>
                    EMI starts @{' '}
                    <span className={style.emiHighlight}>
                      {lender.minInterestRate}% p.a
                    </span>
                  </div>
                </div>
                <span className={`font12 ${style.lenderActive}`}>
                  &#10004; Active
                </span>
              </div>
            ))}
          </div>
        )}
        <div>
          <RequestButton
            buttonId='start-shopping-button'
            loadingMsg='Verifying...'
            pageKey={this.pageKey}
            buttonWrapperClass={style.submitButton}
            elementName='Start Shopping Button'
            buttonText='Start Shopping with EMI'
            buttonOnClick={() => redirect()}
            requestStatus={false}
          />
        </div>
        <AutoRedirect
          timer={30}
          redirectUrl={redirectUrl}
          redirectText={'Redirecting to ' + merchantName}
          pageKey={this.pageKey}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ ntbConfig }) => {
  const { getLenderList, showShowLenderList, ntbDetails, message } = ntbConfig;
  return {
    showShowLenderList,
    getLenderList,
    ntbDetails,
    message,
  };
};
export default connect(mapStateToProps)(
  withBaseComponent(preApprovedUserActivationSuccess),
);
