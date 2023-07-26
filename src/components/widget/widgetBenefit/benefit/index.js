/** @jsx h */
import { h, Fragment, Component } from 'preact';
import style from '../style.css';
import LendersLogos from '../../../common/lenderBrands/lendersLogos';
import BrandingLogos from '../../checkEligible/footer/brandingLogos';
import { isMobile } from '../../../../utils/helper';
import PoweredBy from '../../poweredBy';
import withBaseComponent from '../../../../HOC/withBaseComponent';
import BenefitImages from '../../../common/benefit-images';

class Benefit extends Component {
  pageKey = 'pv_benefits';
  metadata = {
    ...this.props.metadata,
  };

  render() {
    return (
      <Fragment>
        <div className={style.benefitScreenBody}>
          <div className='font20 bold-text text-center' id='benefits-header'>
            Shop with Cardless EMI
          </div>
          <div className={style.shopImageContainer}>
            <BenefitImages />
          </div>
          <div className={style.shopInfoWrapper}>
            <div
              className={style.shopInfoContainer}
              id='benefit-no-card-needed'>
              <div className={`${style.infoIconContainer} text-center`}>
                <img
                  src='https://iccdn.in/img/ic_noCard.svg'
                  className={style.infoIcon}
                />
              </div>
              <div className={`${style.infoTextContainer} font14`}>
                <div className={`${style.infoHeader} bold-text text-center`}>
                  No Card needed
                </div>
                <div className='text-center'>Only mobile number required</div>
              </div>
            </div>
            <div
              className={style.shopInfoContainer}
              id='benefit-pre-approved-container'>
              <div className={`${style.infoIconContainer} text-center`}>
                <img
                  src='https://iccdn.in/img/ic_preappproved.svg'
                  className={style.infoIcon}
                />
              </div>
              <div className={`${style.infoTextContainer} font14`}>
                <div className={`${style.infoHeader} bold-text text-center`}>
                  Pre-approved
                </div>
                <div className='text-center'>No application needed</div>
              </div>
            </div>
            <div
              className={style.shopInfoContainer}
              id='benefit-easy-auto-repayments-container'>
              <div className={`${style.infoIconContainer} text-center`}>
                <img
                  src='https://iccdn.in/img/ic_easy_autopayment.svg'
                  className={style.infoIcon}
                />
              </div>
              <div className={`${style.infoTextContainer} font14`}>
                <div className={`${style.infoHeader} bold-text text-center`}>
                  Easy Auto Repayments
                </div>
                <div className='text-center'>Never miss a payment due date</div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.benefitFooter}>
          {isMobile ? (
            <div className={style.bankingPartnerContainer}>
              <div className='font14 bold-text text-center'>
                Partner Banks & NBFCs
              </div>
              <LendersLogos />
            </div>
          ) : (
            <div className={style.desktopBankingPartner}>
              <div
                className='font14 bold-text text-center'
                id='benefit-footer-text'>
                Partner Banks & NBFCs
              </div>
              <BrandingLogos />
            </div>
          )}
        </div>
        {!isMobile && (
          <div className={style.poweredByContainer}>
            <PoweredBy />
          </div>
        )}
      </Fragment>
    );
  }
}

export default withBaseComponent(Benefit);
