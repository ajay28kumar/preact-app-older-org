/** @jsx h */
//@flow
import { h } from 'preact';
import style from './style.css';
import { tracker, UserActionType } from '../../tracking';
import AutoRedirect from '../common/autoRedirect';

type Props = {
  merchantName: string,
  pageKey: string,
  redirectUrl: string,
};

const NtbMerchants = ({ merchantName, redirectUrl, pageKey }: Props) => {
  const hideAutoRedirect = merchantName.indexOf('instacred.me') === -1;
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
        <div className={`font16 text80 text-center ${style.thankYouContainer}`}>
          Sorry, You are currently not pre-approved with our lending partners.
        </div>
        <div
          className={`text-center font18 text80 ${style.eligibilityContainer}`}>
          Download and get Instant Credit approved from
          <div className='font20 bold-text text60'>IDFC FIRST Bank</div>
        </div>
      </div>
      <div className={style.activationPoints}>
        <div className={style.activationImage}>
          <img
            src='https://iccdn.in/img/AppScreen@2x.png'
            alt='application-screen'
          />
        </div>
        <div className={`font14 ${style.activationStepsText}`}>
          <div className={style.activationSteps}>
            <span className={style.checkMark}>&#10004;</span>{' '}
            <span className='text60 font14'>Activate in </span>
            <span className='text80 bold-text font14'>less</span>
            <div className={style.secondLineText}>
              <span className='text80 bold-text font14'>than 5 mins!</span>
            </div>
          </div>
          <div className={style.activationSteps}>
            <span className={style.checkMark}>&#10004;</span>{' '}
            <span className='text80 bold-text font14'>Get instant credit</span>
          </div>
          <div className={style.activationSteps}>
            <span className={style.checkMark}>&#10004;</span>{' '}
            <span className='text80 bold-text font14'>All digital, no</span>
            <div className={style.secondLineText}>
              <span className='text80 bold-text font14'>paperwork!</span>
            </div>
          </div>
          <div className={style.activationSteps}>
            <span className={style.checkMark}>&#10004;</span>{' '}
            <span>
              <span className='text80 bold-text font14'>Automatic</span>
            </span>
            <div className={style.secondLineText}>
              <span className='text80 bold-text font14'>repayments!</span>
            </div>
          </div>
        </div>
      </div>
      <div className='font16 bold-text text-center text80'>
        <div>
          <a
            href='https://play.google.com/store/apps/details?id=me.instacred.instantcredit'
            target='_blank'
            onClick={() => {
              tracker.trackUserInteraction(
                UserActionType.CLICK,
                'Google Play Download',
                pageKey,
              );
            }}>
            <button
              type='button'
              className={`${style.downloadButton} btn genericButtonFilled`}>
              <span className={`${style.downloadButtonText} font16`}>
                Download and Apply Now
              </span>
              <img
                src='https://iccdn.in/img/play-store-icon-2.png'
                className={style.playStoreIcon}
                alt='play-store-icon'
              />
            </button>
          </a>
        </div>
      </div>
      {hideAutoRedirect && (
        <AutoRedirect
          timer={60}
          redirectUrl={redirectUrl}
          redirectText={'Redirecting to ' + merchantName}
          overrideCss={true}
          pageKey={this.pageKey}
        />
      )}
    </div>
  );
};

export default NtbMerchants;
