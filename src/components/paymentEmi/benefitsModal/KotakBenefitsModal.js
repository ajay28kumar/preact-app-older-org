import TopAppBar from 'preact-material-components/TopAppBar';
import 'preact-material-components/TopAppBar/style.css';
import style from './lender-benefits.css';

const KotakBenefitsModal = (props) => (
  <div>
    <TopAppBar
      class={`${style.lenderBenefits} ${style.kotakTheme}`}
      style={'height: 100% !important'}>
      <div style={{ backgroundColor: '#fff' }}>
        <span>
          <img
            align='left'
            style={{ margin: 16, height: 30 }}
            src='https://iccdn.in/lenders/kotak-consumer-v5.png'
          />
          <img
            align='right'
            id='dismissBenefits'
            src='https://iccdn.in/img/benefits-cross-icon.svg'
            style={'padding: 12px;width: 2.5em;'}
            onClick={props.closeFunc}
          />
        </span>
      </div>
      <div className={`${style.lenderBenefitsLineSeparator}`} />
      <div className={`${style.lenderBenefitsTitle}`}>
        You are now eligible to <br />
        Buy on EMI with your <br />
        Kotak Mahindra Bank
      </div>
      <div className={`${style.lenderBenefitsPointsLineSeperator}`} />
      <div className={`${style.lenderBenefitsPointsInfoGraphic}`}>
        <div align='left' className={`${style.lenderBenefitsPoints}`}>
          <span>
            <img
              className={`${style.lenderBenefitsPointsTick}`}
              align='left'
              src='https://iccdn.in/img/tick-small.svg'
            />
            <p className={`${style.lenderBenefitsPointsText}`}>
              Complete purchase with just one Tap
            </p>
          </span>
        </div>
        <div className={`${style.lenderBenefitsPointsLineSeperator}`} />
        <div align='left'>
          <span>
            <img
              className={`${style.lenderBenefitsPointsTick}`}
              align='left'
              src='https://iccdn.in/img/tick-small.svg'
            />
            <p className={`${style.lenderBenefitsPointsText}`}>
              No Additional fees to activate facility
            </p>
          </span>
        </div>
        <div className={`${style.lenderBenefitsPointsLineSeperator}`} />
        <div align='left'>
          <span>
            <img
              className={`${style.lenderBenefitsPointsTick}`}
              align='left'
              src='https://iccdn.in/img/tick-small.svg'
            />
            <p className={`${style.lenderBenefitsPointsText}`}>
              No Down payment needed
            </p>
          </span>
        </div>
      </div>
      <div style={'margin:20px;'} />
      <div align='center' className={`${style.lenderBenefitsFooter}`}>
        <span>
          <div align='right'>
            <div className={`${style.lenderBenefitsFooterPoweredBy}`}>
              Powered By
            </div>
            <img
              className={`${style.lenderBenefitsFooterBrandImg}`}
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

export default KotakBenefitsModal;
