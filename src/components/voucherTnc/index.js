import { h, Component } from 'preact';
import style from './style';

export default class VoucherTnc extends Component {
  render(props, state, context) {
    return (
      <div>
        <div class={`${style.voucherTncHeader}`}>
          <img src='https://iccdn.in/resources/images/T-and-C-illustration.png' />
        </div>
        <div class={`${style.termsContainer}`}>
          <ul
            class={`${style.voucherTermsListHolder}`}
            id='tncList'
            dangerouslySetInnerHTML={{
              __html: voucherTnc[this.props.lenderId],
            }}
          />
        </div>
      </div>
    );
  }
}

const genericTnc =
  '<li>The voucher code will be delivered to you within <strong>3 business days</strong> of the purchase</li>' +
  '<li>First EMI will be deducted within 30 days from the date of <strong>voucher purchase</strong> irrespective of the voucher utilisation date.</li>' +
  '<li>Voucher Purchase cannot be <strong>Cancelled or Refunded</strong></li>';

const voucherTnc = Object.freeze({
  201: genericTnc,
  102: genericTnc,
  401: genericTnc,
});
