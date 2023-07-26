import { h, Component } from 'preact';
import TopAppBar from 'preact-material-components/TopAppBar';
import 'preact-material-components/TopAppBar/style.css';
import style from './lender-benefits.css';

export default class IDFCBenefitsModal extends Component {
  render() {
    return (
      <div>
        <TopAppBar
          class={`${style.lenderBenefits} ${style.cflTheme}`}
          style={'height: 100% !important'}>
          <div>
            <span>
              <img
                align='left'
                class={`${style.lenderImg}`}
                src='https://iccdn.in/lenders/IDFC-First-Bank-Logo-150.jpg'
              />
              <img
                align='right'
                id='dismissBenefits'
                src='https://iccdn.in/img/close.svg'
                style={'padding:12px;'}
                onClick={this.props.closeFunc}
              />
            </span>
          </div>
          <div className={`${style.lenderBenefitsLineSeparator}`} />
          <div className={`${style.lenderBenefitsTitle}`}>
            You are eligible to complete this purchase with EMI on your IDFC
            First Bank EBC Limit
          </div>
          <div className={`${style.lenderBenefitsPointsLineSeperator}`} />
          <div className={`${style.lenderBenefitsPointsInfoGraphic}`}>
            <div align='left' class={`${style.lenderBenefitsPoints}`}>
              <span>
                <img
                  class={`${style.lenderBenefitsPointsTick}`}
                  align='left'
                  src='https://iccdn.in/img/tick-small.svg'
                />
                <p class={`${style.lenderBenefitsPointsText}`}>
                  Complete purchase with just one Tap
                </p>
              </span>
            </div>
            <div className={`${style.lenderBenefitsPointsLineSeperator}`} />
            <div align='left'>
              <span>
                <img
                  class={`${style.lenderBenefitsPointsTick}`}
                  align='left'
                  src='https://iccdn.in/img/tick-small.svg'
                />
                <p class={`${style.lenderBenefitsPointsText}`}>
                  No Down payment needed
                </p>
              </span>
            </div>
            <div className={`${style.lenderBenefitsPointsLineSeperator}`} />
            <div align='left'>
              <span>
                <img
                  class={`${style.lenderBenefitsPointsTick}`}
                  align='left'
                  src='https://iccdn.in/img/tick-small.svg'
                />
                <p class={`${style.lenderBenefitsPointsText}`}>
                  Auto-Debit of Monthly EMIs
                </p>
              </span>
            </div>
          </div>
          <div style={'margin:20px;'} />
          <div align='center' class={`${style.lenderBenefitsFooter}`}>
            <span>
              <div align='right'>
                <div class={`${style.lenderBenefitsFooterPoweredBy}`}>
                  Powered By
                </div>
                <img
                  class={`${style.lenderBenefitsFooterBrandImg}`}
                  src='https://iccdn.in/web-assets/instacred-logo.svg'
                />
              </div>
            </span>
          </div>
          <div style={'position:fixed; bottom:0px; margin-top:48px;'}>
            <img align='left' src='https://iccdn.in/img/benefits-person.svg' />
          </div>
        </TopAppBar>
      </div>
    );
  }
}
