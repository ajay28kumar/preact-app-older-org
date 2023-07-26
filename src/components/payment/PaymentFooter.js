import { h, Component } from 'preact';
import style from './payment.css';

export default class PaymentFooter extends Component {
  render() {
    return (
      <div align='center' class={`${style.footer}`}>
        <div class={`${style.footerWrapper}`}>
          <span>
            {this.props.lenderDetails &&
              this.props.lenderDetails.lenderLogo && (
                <img
                  align='left'
                  style={{ height: 35 }}
                  src={this.props.lenderDetails.lenderLogo}
                />
              )}
          </span>
          <span>
            <div align='right'>
              <div class={`${style.poweredBy}`}>Powered By</div>
              <img
                class={`${style.lenderImg}`}
                src='https://iccdn.in/web-assets/instacred-logo.svg'
              />
            </div>
          </span>
        </div>
      </div>
    );
  }
}
