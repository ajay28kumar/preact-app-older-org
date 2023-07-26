/** @jsx h */
import { Component, h } from 'preact';
import { apiStatus } from '../../../../actionTypes';
import style from '../style.css';
import EmiList from './emiList';
import { isMobile } from '../../../../utils/helper';
import LenderListDesktop from '../lenderListDesktop';
import { connect } from 'react-redux';
import widgetEmiInfoAction from '../../../../actions/widgetEmiInfoAction';
import widgetActionTypes from '../../../../actions/widgetEmiInfoAction/actionType';
import SpinLoader from '../../../spinLoader';
import EmiHeaders from './emiHeaders';
import GenericError from '../../genericError';
import PoweredBy from '../../poweredBy';
import NonLender from './nonLender';
import { tracker, UserActionType } from '../../../../tracking';

class EMITables extends Component {
  componentDidMount() {
    const { amount, mobile, emiInfo } = this.props || {};
    const { getEmiInfoState } = emiInfo || {};
    if (getEmiInfoState !== apiStatus.SUCCESS) {
      this.widgetBenefitAction(widgetActionTypes.getEmiData, {
        amount: amount.split(',').join(''),
        mobile,
      });
    }
  }
  widgetBenefitAction = (actionType, ...rest) => {
    this.props.widgetEmiInfoAction(actionType, ...rest);
  };

  render() {
    const {
      amount,
      selectedLendersBankCode,
      onSelectLender,
      emiInfo,
      getEmiInfoState,
      updateMobileNumber,
      metadata,
    } = this.props || {};
    switch (getEmiInfoState) {
      case apiStatus.SUCCESS:
        const { isPreApproved, lenders } = emiInfo;
        if (lenders.length === 0) {
          return <NonLender />;
        }
        if (!isMobile) {
          return (
            <div id='emi-info'>
              <div className={style.emiDesktopScreenBody}>
                <div className={style.headerContainer}>
                  <EmiHeaders emiInfo={emiInfo} />
                  {isPreApproved ? (
                    emiInfo.hashedMobile.length > 0 && (
                      <div className={style.phoneNumberContainer}>
                        <div
                          className='font14 text60'
                          id='pre-approved-sub-text'>
                          *For phone number <b>{emiInfo.hashedMobile}</b>
                        </div>
                        <img
                          id='update-mobile-number-icon'
                          src='https://iccdn.in/img/widget-img/ic-widget-edit-phone.svg'
                          className={style.editIcon}
                          onClick={() => {
                            tracker.trackUserInteraction(
                              UserActionType.CLICK,
                              'change_number',
                              'pv_emi_options',
                              metadata,
                            );
                            updateMobileNumber();
                          }}
                          alt='edit-contact'
                        />
                      </div>
                    )
                  ) : (
                    <div className={style.phoneNumberContainer}>
                      <div
                        id='non-approved-user-check-eligibility-button'
                        className='font14 text-color cursorPointer'
                        onClick={() => {
                          tracker.trackUserInteraction(
                            UserActionType.CLICK,
                            'change_number',
                            'pv_emi_options',
                            metadata,
                          );
                          updateMobileNumber();
                        }}>
                        Check eligibility >
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className={style.emiTableContainer}>
                <LenderListDesktop
                  metadata={metadata}
                  amount={amount}
                  lenders={lenders}
                  selectedLendersBankCode={
                    selectedLendersBankCode || lenders[0].bankCode
                  }
                  onSelectLender={onSelectLender}
                />
              </div>
              {!isMobile && (
                <div className={style.poweredByContainer}>
                  <PoweredBy />
                </div>
              )}
            </div>
          );
        }

        return (
          <div className={style.emiMobileScreenBody}>
            <EmiHeaders emiInfo={emiInfo} />
            {isPreApproved ? (
              emiInfo.hashedMobile.length > 0 && (
                <div className={style.phoneNumberContainer}>
                  <div className='font14 text60'>
                    *For phone number <b>{emiInfo.hashedMobile}</b>
                  </div>
                  <img
                    src='https://iccdn.in/img/widget-img/ic-widget-edit-phone.svg'
                    className={style.editIcon}
                    onClick={() => {
                      tracker.trackUserInteraction(
                        UserActionType.CLICK,
                        'change_number',
                        'pv_emi_options',
                        metadata,
                      );
                      updateMobileNumber();
                    }}
                    alt='edit-contact'
                  />
                </div>
              )
            ) : (
              <div className={style.phoneNumberContainer}>
                <div
                  className='font12 text-color cursorPointer'
                  onClick={() => {
                    tracker.trackUserInteraction(
                      UserActionType.CLICK,
                      'change_number',
                      'pv_emi_options',
                      metadata,
                    );
                    updateMobileNumber();
                  }}>
                  Check eligibility >
                </div>
              </div>
            )}
            <div className={style.emiTableContainer}>
              <EmiList
                metadata={metadata}
                lenders={lenders}
                selectedLendersBankCode={selectedLendersBankCode}
                onSelectLender={onSelectLender}
              />
            </div>
          </div>
        );
      case apiStatus.ERROR:
        return <GenericError />;
      default:
        return (
          <div className={style.benefitScreenBody}>
            <SpinLoader />
          </div>
        );
    }
  }
}

const mapStateToProps = ({ widgetData }) => {
  const { emiInfo } = widgetData || {};
  return {
    emiInfo,
  };
};

export default connect(
  mapStateToProps,
  { widgetEmiInfoAction },
)(EMITables);
