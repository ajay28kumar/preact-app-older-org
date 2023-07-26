import { Component } from 'preact';
import style from './style.css';

export default class HowToBuyABComponent extends Component {
  state = {
    variantType: this.props.variantType,
    merchantId: this.props.merchantId,
  };

  render() {
    return (
      <div>
        {this.state.variantType === 'C' && (
          <div class={`${style.howToBuyStepsContainer} ${style.variantTypeC}`}>
            <div class={`${style.howToBuyStepsRow}`}>
              <div class={`${style.howToBuyStepsColumn} ${style.imgColumn}`}>
                <img src='https://iccdn.in/img/ic_giftcard_arrow.png' />
              </div>
              <div
                class={`${style.howToBuyStepsColumn} ${style.howToBuyContent}`}>
                {this.state.merchantId === '11' && (
                  <span>
                    <span class={`${style.boldContent}`}>
                      Buy Amazon Pay Card
                    </span>
                    &nbsp;using InstaCred Cardless EMI
                  </span>
                )}
                {this.state.merchantId === '12' && (
                  <span>
                    Buy
                    <span
                      class={`${style.boldContent}`}
                      style='margin-left: 5px;margin-right: 5px;'>
                      Flipkart Voucher on EMI
                    </span>
                    with InstaCred
                  </span>
                )}
              </div>
            </div>
            <div class={`${style.howToBuyStepsRow}`}>
              <div class={`${style.howToBuyStepsColumn} ${style.imgColumn}`}>
                <img src='https://iccdn.in/img/ic_wallet_arrow.png' />
              </div>
              <div
                class={`${style.howToBuyStepsColumn} ${style.howToBuyContent}`}>
                {this.state.merchantId === '11' && (
                  <span>
                    Add credit to your
                    <div>
                      <span class={`${style.boldContent}`}>
                        {' '}
                        Amazon Pay balance & Shop
                      </span>
                    </div>
                  </span>
                )}
                {this.state.merchantId === '12' && (
                  <span>
                    Add credit to your
                    <div class={`${style.boldContent}`}>
                      {' '}
                      Flipkart account & Shop
                    </div>
                  </span>
                )}
              </div>
            </div>
            <div class={`${style.howToBuyStepsRow}`}>
              <div class={`${style.howToBuyStepsColumn} ${style.imgColumn}`}>
                <img src='https://iccdn.in/img/ic-shoppingcart.png' />
              </div>
              <div
                class={`${style.howToBuyStepsColumn} ${style.howToBuyContent}`}>
                {this.state.merchantId === '11' && (
                  <span>
                    Shop on
                    <span class={`${style.boldContent}`}> Amazon </span>
                    with
                    <div>Pay Balance</div>
                  </span>
                )}
                {this.state.merchantId === '12' && (
                  <span>
                    Use account credit on
                    <span class={`${style.boldContent}`}> Checkout </span>
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
