/** @jsx h */
import { h } from 'preact';
import style from '../../style.css';

const benefitDetails = [
  {
    icon: 'https://iccdn.in/img/widget-img/ic-widget-no-card.svg',
    headerText: 'No Card needed',
    bodyText: 'Only mobile number required',
  },
  {
    icon: 'https://iccdn.in/img/widget-img/ic-widget-pre-approved.svg',
    headerText: 'Pre-approved',
    bodyText: 'No application needed',
  },
  {
    icon: 'https://iccdn.in/img/widget-img/ic-widget-easy-autopay.svg',
    headerText: 'Easy Auto Repayments',
    bodyText: 'Never miss a payment due date',
  },
];

const CheckEligibleBenefit = () => {
  return (
    <div className={style.infoDetails}>
      <div
        className={`${style.infoHeader} font20 bold-text text60`}
        id='checkEligibleBenefitHeader'>
        InstaCred Cardless EMI Advantage
      </div>
      <div id='checkEligibleBenefitDetailsContainer'>
        {benefitDetails.map((benefitDetail) => {
          return (
            <div className={style.benefitContainer}>
              <div className={style.iconContainer}>
                <img src={benefitDetail.icon} className={style.icon} />
              </div>
              <div className={style.benefitText}>
                <div className='font14 text80 bold-text'>
                  {benefitDetail.headerText}
                </div>
                <div className='font14 text80'>{benefitDetail.bodyText}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckEligibleBenefit;
