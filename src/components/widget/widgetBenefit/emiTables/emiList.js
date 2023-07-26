/** @jsx h */
import { Component, h } from 'preact';
import Panel from '../../../material-ui/panel';
import { currencyFormat } from '../../../directives/currencyFormat';
import style from '../style.css';
import withBaseComponent from '../../../../HOC/withBaseComponent';

class EmiList extends Component {
  pageKey = 'pv_emi_options';
  metadata = {
    ...this.props.metadata,
  };

  render() {
    const { lenders, onSelectLender, selectedLendersBankCode } =
      this.props || {};
    return (
      <div className={style.lenderListMobile}>
        {lenders.map((lenderDetail, index) => {
          const { logoIcon, name, emiPlans, bankCode } = lenderDetail || {};
          const checked = selectedLendersBankCode === bankCode;
          const minimumEmi =
            emiPlans &&
            emiPlans.length > 0 &&
            emiPlans.reduce(
              (a, b) => ({
                emi: Math.min(a.emi, b.emi),
              }),
              { emi: emiPlans[0].emi },
            );

          return (
            <Panel
              className={`${style.emiPanel} cursorPointer ${
                checked ? style.activePanel : ''
              }`}
              key={index}>
              <div
                className={style.emiContainer}
                onClick={() => {
                  onSelectLender(bankCode, name);
                }}>
                <div className={style.logoContainer}>
                  <img src={logoIcon} className={style.logoIcon} alt={name} />
                </div>
                <div className={style.emiDetailsContainer}>
                  <div className={style.lenderDetails}>
                    <div className='font14 bold-text'>{name}</div>
                    {minimumEmi && (
                      <div className={`font12 ${style.emiStarts}`}>
                        <span className='text60 '>EMI Starts</span>
                        <span className='text-color bold-text'>
                          {' '}
                          @ {currencyFormat(minimumEmi.emi)}/month
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <img
                      src='https://iccdn.in/img/widget-img/widget-right-arrow.svg'
                      className={style.rightArrowIcon}
                    />
                  </div>
                </div>
              </div>
            </Panel>
          );
        })}
      </div>
    );
  }
}
export default withBaseComponent(EmiList);
