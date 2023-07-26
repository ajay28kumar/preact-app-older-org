import { Component } from 'preact';
import PaymentHeader from '../../components/payment/PaymentHeader';
import Spinner from '../../components/spinner/spinner';
import PaymentFooter from '../../components/payment/PaymentFooter';
import Utils, { getSessionStorage } from '../../utils';
import withBaseComponent from '../../HOC/withBaseComponent';

import style from './style.css';
import { PageLoadType } from '../../tracking';

class underMaintenance extends Component {
  utils = new Utils();
  pageKey = 'Under Maintenance';
  pageLoadType = PageLoadType.FULL;
  state = {
    redirectingCopy: 'Redirecting back to merchant ...',
    uiTimeout: 7000,
    lenderDetails: getSessionStorage('lenderDetails') || null,
    uuId: this.props.uuId,
    headerText: 'UNABLE TO PROCESS',
    purchaseResultMsg:
      'Sorry, IDFC First Bank is down for scheduled maintenance. Please try again after 30th July, 05:30 PM.',
    iconUrl: 'https://iccdn.in/web-assets/error-icon-white.svg',
  };

  componentDidMount() {
    this.utils.disableBackButton(); //disable back button once txn is complete
    if (this.state.uuId) {
      setTimeout(function() {
        document.getElementById('txnForm').submit();
      }, this.state.uiTimeout);
    }
  }

  render(props) {
    return (
      <div>
        <PaymentHeader headerText={this.state.headerText} />
        <div className={`${style.lineSeparator}`} />
        <div align='center'>
          <div class={`${style.paymentResultMessage}`}>
            <div class={`${style.resultIcon}`}>
              <img src={this.state.iconUrl} />
            </div>

            <div class={`${style.purchaseResultText}`}>
              {this.state.purchaseResultMsg}
            </div>
          </div>
          {this.props.transactionResponseModel === null ? (
            ''
          ) : (
            <div>
              <div style='margin-top:24px;'>
                <Spinner />
              </div>
              <div class={`${style.redirectingText}`}>
                {this.state.redirectingCopy}
              </div>
            </div>
          )}
        </div>
        <PaymentFooter lenderDetails={this.state.lenderDetails} />
        <form method='POST' action='/txn/maintenance/redirect' id='txnForm'>
          <div>
            <input type='hidden' name='uuId' value={this.state.uuId} />
          </div>
        </form>
      </div>
    );
  }
}

export default withBaseComponent(underMaintenance);
