/** @jsx h */
//@flow
import { h, Component } from 'preact';
import style from './style.css';
import withBaseComponent from '../../HOC/withBaseComponent';
import { connect } from 'react-redux';
import ntbAction from '../../actions/ntbAction';
import ActivationInputBox from '../../components/ntbActivation/activationInputBox';
import OtpOverlayScreen from '../../components/ntbActivation/otpOverlayScreen';
import { lenderTheme } from '../../utils/lenderTheme';
import { tracker, UserActionType } from '../../tracking';
import BrowserExitTracking from '../../components/common/browserExitTracking';
import Dialog from 'preact-material-components/Dialog';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Button/style.css';
import {
  buyWithInstacredLandingRoute,
  ntbFaqRoute,
} from '../../alias/homeRoutes';

type Props = {
  message: string,
  shouldShowOTPScreen: boolean,
  matches: Object,
  ntbAction: Function,
};
type State = {
  mobileNo: string,
};

class NewUserActivationLanding extends Component<Props, State> {
  pageKey = 'UA Shop On EMI';
  metadata = {
    metadata: this.props.matches.merchantId || '',
  };

  state = {
    mobileNo: '',
  };

  dialogRef = (dialog) => (this.dialog = dialog);
  showServiceUnavailableModal = () => this.dialog.MDComponent.show();

  redirectToBic = () => {
    return this.props.redirectUrl
      ? (location.href = this.props.redirectUrl)
      : route(buyWithInstacredLandingRoute.path);
  };

  render() {
    const {
      message,
      shouldShowOTPScreen,
      shouldShowServiceUnavailableModal,
      matches,
      ntbAction,
    } = this.props || {};
    const { merchantId, utm_source: utmSource } = matches || {};
    const { merchantName, merchantIcon } = merchantData[merchantId] || {};
    const channel = merchantId
      ? 'NTB_LANDING_PAGE'
      : utmSource === 'FMwebsite'
      ? 'FM_CORPORATE_WEBSITE'
      : 'ORGANIC';
    const {
      '201': idfcFirst,
      '102': federal,
      '401': kotak,
      '501': hdfc,
      '601': homeCredit,
      '701': icici,
    } = lenderTheme;
    if (shouldShowServiceUnavailableModal) {
      this.showServiceUnavailableModal();
    }
    return (
      <div
        className={`${style.pageWrapper} ${
          merchantName ? style.merchantBenefitsHeight : ''
        }`}>
        {message && (
          <div className={style.errorMessageContainer}>{message}</div>
        )}
        <BrowserExitTracking
          pageKey={this.pageKey}
          elementName='Close Window'
        />
        <div
          className={`${style.ntbLandingPageContainer} ${
            merchantName ? style.merchantHeight : ''
          }`}>
          <div className={style.instaCredHeaderBranding}>
            <div>
              <img
                src='https://iccdn.in/img/instacred-logo-white-bg.png'
                alt='InstaCred Cardless EMI'
              />
            </div>
          </div>
          <div className={style.ntbTitleContainer}>
            <span className='bold-text text80'>
              Shop
              {merchantName && (
                <span>
                  {' '}
                  on <span className='bold-text'>{merchantName}</span>
                  <br />
                </span>
              )}{' '}
              with Cardless EMI
            </span>
            {merchantIcon && (
              <div>
                <img
                  src={merchantIcon}
                  alt={merchantName}
                  className={style.merchantIcon}
                />
              </div>
            )}
          </div>
          <div className={style.ntbSubtitleContainer}>
            <div className={style.subtitleRow}>
              <div className={style.subtitleImgContainer}>
                <div className={style.imgWrapper}>
                  <img src='https://iccdn.in/img/ic_verify_phone-green.png' />
                </div>
              </div>
              <div className={`${style.subtitleTextContainer} font16`}>
                <span className='bold-text text80'>No card needed.</span> Just
                use your phone number to shop
              </div>
            </div>

            <div className={style.subtitleRow}>
              <div className={style.subtitleImgContainer}>
                <div className={style.imgWrapper}>
                  <img src='https://iccdn.in/img/ic_credit-green.png' />
                </div>
              </div>
              <div
                className={`${
                  style.subtitleTextContainer
                } font16 bold-text text80`}>
                Credit line from Leading Banks/NBFCs
              </div>
            </div>

            <div className={style.subtitleRow}>
              <div className={style.subtitleImgContainer}>
                <div className={style.imgWrapper}>
                  <img src='https://iccdn.in/img/ic_shop_outlined_green.png' />
                </div>
              </div>
              <div className={`${style.subtitleTextContainer} font16`}>
                <span className='bold-text text80'>Shop on EMIs </span>for
                Mobiles, electronics, fashion, home furnishings & more.
              </div>
            </div>
          </div>

          <div className={style.activateNowContainer}>
            <div className='font14 text60 bold-text'>
              Activate and Shop Now!
            </div>
            <span className={`${style.mobileNoPrefix}`}>+91</span>
            <ActivationInputBox
              pageKey={this.pageKey}
              channel={channel}
              mobileNo={this.state.mobileNo}
              merchantId={merchantId}
              onChange={(mobileNo) => {
                this.setState({ mobileNo });
              }}
              ntbAction={ntbAction}
            />
          </div>

          <div
            className={`text80 bold-text text-center ${
              style.whyUseInstaCredContainer
            }`}>
            Why use InstaCred Cardless Credit?
          </div>
          <div className={style.instaCredBenefit}>
            <div>
              <div className={style.iconContainer}>
                <img src='https://iccdn.in/img/ic_stopwatch.svg' />
              </div>
              <div className={`font16 ${style.benefitTextContainer}`}>
                <span className='bold-text text80'>Activate </span>
                <span className='text80'>Credit in less than 5 minutes</span>
              </div>
            </div>
            <div>
              <div className={style.iconContainer}>
                <img src='https://iccdn.in/img/ic_easy_repayment-colored.png' />
              </div>
              <div className={style.benefitTextContainer}>
                <span className='bold-text text80'>PAY in EMI </span>
                <span className='text80'>easily via auto repayment</span>
              </div>
            </div>
            <div>
              <div className={style.iconContainer}>
                <img src='https://iccdn.in/img/ic_no_paperwork-1x.png' />
              </div>
              <div
                className={`${style.benefitTextContainer} ${
                  style.benefitsSteps3
                }`}>
                <span className='bold-text text80'>No Paperwork </span>
              </div>
            </div>
          </div>
          <div className='text-center'>
            <div className={style.highlightBenefit}>
              <div className={`${style.iconContainer} text-left`}>
                <img src='https://iccdn.in/img/ic_no_fee-ic_approvedusers.png' />
              </div>
              <div
                className={`${style.benefitTextContainer} ${
                  style.benefitsSteps3
                } text-left`}>
                <span className='bold-text text80'>2.5+ Crore</span>
                <div className='text80'>preapproved users</div>
              </div>
            </div>
          </div>

          <div className={style.lenderListContainer}>
            <div className='font12 text60 bold-text text-center'>
              OUR LENDING PARTNERS
            </div>
            <div className={style.lenderListScrollableDiv}>
              <span className={style.lenderImage}>
                <img src={idfcFirst.lenderLogo} alt='logo' />
              </span>
              <span className={style.lenderImage}>
                <img src={hdfc.lenderLogo} alt='logo' />
              </span>
              <span className={style.lenderImage}>
                <img src={kotak.lenderLogo} alt='logo' />
              </span>
              {/* icici logo changed temporarily to support PR */}
              <span className={style.lenderImage}>
                <img
                  src='https://iccdn.in/img/icici-bank-logo.png'
                  alt='logo'
                />
              </span>
              <span className={style.lenderImage}>
                <img src={homeCredit.brandingLogo} alt='logo' />
              </span>
              <span className={style.lenderImage}>
                <img src={federal.lenderLogo} alt='logo' />
              </span>
            </div>
          </div>
          <div className={style.activateAndShopNow}>
            <div className={style.activateNowContainerBottom}>
              <div className='font16 text60 bold-text'>
                Activate and Shop Now!
              </div>
              <div className={style.bottomActivationInputBoxContainer}>
                <span className={`${style.mobileNoPrefix}`}>+91</span>
                <ActivationInputBox
                  pageKey={this.pageKey}
                  mobileNo={this.state.mobileNo}
                  merchantId={merchantId}
                  utmSource={utmSource}
                  onChange={(mobileNo) => {
                    this.setState({ mobileNo });
                  }}
                  ntbAction={ntbAction}
                />
                <div className={`font12 ${style.otpTextContainer}`}>
                  You will get an OTP on this number
                </div>
              </div>
            </div>
          </div>
          <div className={style.footerContainer}>
            <div className={style.footer}>
              <div>
                <a
                  href='#'
                  className={`font12 text-color ${style.footerLinks}`}
                  onClick={() => {
                    tracker.trackUserInteraction(
                      UserActionType.CLICK,
                      'AboutIC',
                      this.pageKey,
                    );
                  }}>
                  About InstaCred
                </a>
                |
                <a
                  href={ntbFaqRoute.path}
                  target='_blank'
                  className={`font12 text-color ${style.footerLinks}`}
                  onClick={() => {
                    tracker.trackUserInteraction(
                      UserActionType.CLICK,
                      'FAQ',
                      this.pageKey,
                    );
                  }}>
                  Frequently Asked Questions
                </a>
              </div>
              <div className={`font12 text40 ${style.flexmoneyBranding}`}>
                &#169;Flexmoney Technologies Pvt. Ltd.
              </div>
            </div>
          </div>
        </div>
        {shouldShowOTPScreen && (
          <OtpOverlayScreen
            pageKey={this.pageKey}
            mobileNo={this.state.mobileNo}
            merchantId={merchantId}
            channel={channel}
            ntbAction={ntbAction}
          />
        )}
        <Dialog ref={this.dialogRef}>
          <Dialog.Header>Temporarily Unavailable</Dialog.Header>
          <Dialog.Body>
            <div>
              Unfortunately, our Banking Partner's systems are not available
              right now. We will notify you as soon as their systems are working
              so that you can complete your application.
            </div>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.FooterButton accept onClick={() => this.redirectToBic()}>
              OK
            </Dialog.FooterButton>
          </Dialog.Footer>
        </Dialog>
      </div>
    );
  }
}
const merchantData = {
  //temporary merchantObject added and will be moved to BE response later
  '4743374': {
    merchantName: 'Dellstore.com',
    merchantIcon: 'https://iccdn.in/merchant/logos/dell-64h-trimmed-1x.png',
  },
};
const mapStateToProps = ({ ntbConfig }) => {
  const {
    shouldShowOTPScreen,
    shouldShowServiceUnavailableModal,
    message,
    redirectUrl,
  } = ntbConfig;
  return {
    shouldShowOTPScreen,
    shouldShowServiceUnavailableModal,
    message,
    redirectUrl,
  };
};
export default connect(
  mapStateToProps,
  { ntbAction },
)(withBaseComponent(NewUserActivationLanding));
