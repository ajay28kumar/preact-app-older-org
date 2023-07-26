import { Component } from 'preact';
import withBaseComponent from '../../HOC/withBaseComponent';
import VoucherTnc from '../../components/voucherTnc';
import { PageLoadType } from '../../tracking';

class VoucherTncPage extends Component {
  pageLoadType = PageLoadType.DYNAMIC;
  pageKey = 'Voucher Tnc Page';
  lenderId = 401;

  render() {
    return (
      <div>
        <VoucherTnc lenderId={this.lenderId} />
      </div>
    );
  }
}
export default withBaseComponent(VoucherTncPage);
