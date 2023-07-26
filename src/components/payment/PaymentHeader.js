import { h, Component } from 'preact';
import TopAppBar from 'preact-material-components/TopAppBar';
import 'preact-material-components/TopAppBar/style.css';

import style from './payment.css';

export default class PaymentHeader extends Component {
  render() {
    return (
      <div>
        <TopAppBar
          class={`${style.genericHeader} ${style.toolbar}`}
          style={
            this.props.lenderTheme
              ? 'background-color:' +
                this.props.lenderTheme +
                ';background-image: none'
              : ''
          }>
          <TopAppBar.Row>
            <TopAppBar.Section
              align-start
              class={`${style.padding20}`}
              style={
                this.props.lenderTheme
                  ? 'background-color:' + this.props.lenderTheme
                  : ''
              }>
              <span class={`${style.pageHeading}`}>
                {this.props.headerText}
              </span>
            </TopAppBar.Section>
          </TopAppBar.Row>
        </TopAppBar>
      </div>
    );
  }
}
