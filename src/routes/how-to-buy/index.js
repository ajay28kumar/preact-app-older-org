import { Component, h } from 'preact';
import Helmet from 'preact-helmet';
import { connect } from 'react-redux';
import { route } from 'preact-router';
import Dialog from 'preact-material-components/Dialog';
import Fab from 'preact-material-components/Fab';
import HowToBuyABComponent from '../../components/howToBuyAB';
import ImagePanel from '../../components/imagePanel';
import BranchLocator from '../../components/branchLocator';
import withBaseComponent from '../../HOC/withBaseComponent';
import Permissions from '../../utils/permissions';
import { pageNotFoundRoute } from '../../alias/commonRoutes';
import { isMobile } from '../../utils/helper';
import bicAction from '../../actions/bicAction';
import actionType from '../../actions/bicAction/actionType';
import { getStorageLenderId } from '../../utils/lenderTheme';
import howToBuyAction from '../../actions/howToBuyActions';
import bicActionType from '../../actions/howToBuyActions/actionType';
import { apiStatus } from '../../actionTypes';
import Redirect from '../../components/redirect';
import Spinner from '../../components/spinner/spinner';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Fab/style.css';
import style from './style.css';
import { buyWithInstacredLandingRoute } from '../../alias/homeRoutes';
import { tracker, UserActionType } from '../../tracking';

class HowToBuy extends Component {
  pageKey = 'pv_how_to_buy_bic';
  campaignId = this.props.matches.utm_campaign || '';
  lenderId = getStorageLenderId();
  merchantName = this.props.matches.handle || '';
  metadata = {
    campaign_id: this.campaignId,
    lender_id: this.lenderId,
    merchant_name: this.merchantName,
  };

  componentDidMount() {
    const { utm_campaign: campaignId } = this.props.matches || {};
    this.props.bicAction(actionType.initializeHTB, { campaignId });
    const { data } = this.props;
    const { handle } = this.props.matches || {};
    const lenderId = getStorageLenderId();
    //Checking if data already exist or not
    if (!data[handle] || data[handle].apiState === apiStatus.ERROR) {
      this.props.howToBuyAction(bicActionType.initHTBScreen, {
        campaignId: campaignId || 'DEFAULT',
        lenderId: lenderId || 'DEFAULT',
        handle,
      });
    }
  }

  redirectToMerchant = (merchantUrl, campaignId, lenderId, merchantName) => {
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'bic_continue_to_shop',
      this.pageKey,
      {
        campaign_id: campaignId,
        lender_id: lenderId,
        merchant_id: merchantId,
        merchant_name: merchantName,
      },
    );
    const { handle } = this.props.matches || {};
    const { merchantId } = this.props.data[handle];
    if (merchantId === '1913158' && !isMobile) {
      return this.dialogRef.MDComponent.show();
    }
    setTimeout(() => {
      new Permissions(this.pageKey).askForPushNotification();
    });
    window.open(merchantUrl, '_blank');
  };

  render() {
    const { matches, referralUrl } = this.props || {};
    const { handle, utm_campaign: campaignId } = matches || {};
    const data = this.props.data[handle];
    const lenderId = getStorageLenderId();
    const {
      apiState,
      merchantLogo,
      howToBuyTitle,
      howToBuyImage,
      merchantUrl,
      footerText,
      merchantId,
      merchantName,
      imgAltText,
      branchLocator,
      voucherMerchant,
    } = data || {};

    if (!apiState || apiState === apiStatus.INITIATED) {
      return (
        <div className='loaderContainer'>
          <Spinner />
        </div>
      );
    }

    if (apiState === apiStatus.ERROR) {
      return <Redirect to={pageNotFoundRoute.path} replace={true} />;
    }

    return (
      <div>
        <Fab
          ripple={true}
          mini={true}
          className={`${style.iconContainer} cursorPointer`}
          onClick={() => {
            tracker.trackUserInteraction(
              UserActionType.CLICK,
              'nav_back',
              this.pageKey,
              {
                campaign_id: campaignId,
                lender_id: lenderId,
              },
            );
            const backURL = `${referralUrl}${
              campaignId ? `?utm_campaign=${campaignId}` : ''
            }`;
            return route(backURL);
          }}>
          <Fab.Icon className={`${style.backIcon} font14`}>
            arrow_back_ios
          </Fab.Icon>
        </Fab>

        {merchantName && (
          <Helmet
            title={'How to buy on ' + merchantName + '  on EMI with InstaCred'}
            meta={[
              {
                name: 'description',
                content:
                  'Steps to buy on ' +
                  merchantName +
                  ' on EMI using Instacred Cardless EMI',
              },
            ]}
          />
        )}
        <div>
          <div class={`${style.logoContainer}`}>
            {!voucherMerchant && merchantLogo && <img src={merchantLogo} />}
            {voucherMerchant && merchantName && (
              <div
                class={`${style.variantMerchantHeaderImageContainer} ${
                  style.variantImageC
                }`}>
                <span
                  class={`${style.variantHeaderColumn} ${style.blockSection}`}>
                  <img
                    src={merchantLogo}
                    class={`${style.variantLogoC} ${style.merchantLogoFix}`}
                  />
                </span>
                <span
                  class={`${style.variantHeaderColumn} ${
                    style.variantHeaderTextC
                  }`}>
                  Shop on {merchantName} with easy EMIs
                </span>
                <div class='spacer' style='clear: both;' />
              </div>
            )}
          </div>
          <div class={`${style.mainContainer}`}>
            {voucherMerchant ? (
              <HowToBuyABComponent variantType='C' merchantId={merchantId} />
            ) : (
              <ImagePanel
                title={howToBuyTitle}
                desktopImgUrl={howToBuyImage}
                imgAltText={imgAltText}
              />
            )}
            {!branchLocator && (
              <div class={`${style.shopButtonContainer}`}>
                {!voucherMerchant && (
                  <button
                    type='button'
                    onclick={() =>
                      this.redirectToMerchant(
                        merchantUrl,
                        campaignId,
                        lenderId,
                        merchantName,
                      )
                    }
                    className='btn genericButtonFilled font16'>
                    CONTINUE TO SHOP
                  </button>
                )}
                {voucherMerchant && (
                  <button
                    type='button'
                    onclick={() =>
                      this.redirectToMerchant(
                        merchantUrl,
                        campaignId,
                        lenderId,
                        merchantName,
                      )
                    }
                    className='btn genericButtonFilled font16'>
                    <span
                      class={`${style.verticallyMiddle}`}
                      style='margin-top: 9px;display: inline-block;margin-left: 20px;'>
                      Select Amount
                    </span>
                    <img
                      src='https://iccdn.in/img/icon-chevron-right-36X38.png'
                      class={`${style.verticallyMiddle}`}
                      style='float: right'
                    />
                  </button>
                )}
                {merchantId === '11' && (
                  <div class={`${style.amazonBottomText}`}>
                    *The Amazon Pay balance will be issued via Amazon Pay
                    Giftcard
                  </div>
                )}
              </div>
            )}
            {!voucherMerchant && (
              <div className={footerText ? 'show' : 'hidden'}>
                <div class={`${style.infoText}`}>{footerText}</div>
              </div>
            )}
          </div>
        </div>
        {branchLocator && (
          <BranchLocator
            title={branchLocator.title}
            buttonText={branchLocator.buttonText}
            actionUrl={branchLocator.actionUrl}
            secondaryButtonText={branchLocator.secondaryButtonText}
            secondaryActionUrl={branchLocator.secondaryActionUrl}
            pageKey={this.pageKey}
          />
        )}
        <Dialog
          ref={(dialogRef) => {
            this.dialogRef = dialogRef;
          }}>
          <Dialog.Header>
            <div
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'var(--primaryThemeColor)',
              }}>
              Sorry for Inconvenience!
            </div>
          </Dialog.Header>
          <Dialog.Body>
            <p className='text60 text14'>
              InstaCred is currently available only on mobile website of Tata
              Cliq. To buy on EMI with InstaCred, log on to Tatacliq.com from
              your Mobile Browser
            </p>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.FooterButton
              cancel={true}
              onClick={() => this.dialogRef.MDComponent.destroy()}>
              <div style={{ color: 'var(--primaryThemeColor)' }}>Okay</div>
            </Dialog.FooterButton>
          </Dialog.Footer>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ buyWithInstacred }) => {
  const { howToBuy } = buyWithInstacred;
  const { data, referralUrl } = howToBuy;
  return {
    referralUrl: referralUrl || buyWithInstacredLandingRoute.path,
    data,
  };
};

export default connect(
  mapStateToProps,
  { bicAction, howToBuyAction },
)(withBaseComponent(HowToBuy));
