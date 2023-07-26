// @flow
/** @jsx h */
import { h, Component } from 'preact';
import Lender from '../lender';
import withBaseComponent from '../../../HOC/withBaseComponent';
import ExitLayer from '../../common/exitLayer';
import type { LenderDetails } from '../../../modelType/transactionTypes';
import CancelTransactionButton from '../../cancelTransactionButton';

type Props = {
  metadata: Object,
  /**
   * @param {Array<LenderDetails>} lenderDetailsList is list of lenders and their EMI
   */
  lenderDetailsList: Array<LenderDetails>,
  /**
   * @property {Function} select function of lender
   * @callback
   * @return {LenderDetails}
   */
  lenderActionCallBack: Function,
};
class LenderContainer extends Component<Props> {
  pageKey = 'pv_multi_lender_len';
  metadata = this.props.metadata;
  render() {
    const { lenderDetailsList, lenderActionCallBack, metadata } =
      this.props || {};
    return (
      <div>
        <ExitLayer pageKey={this.pageKey} />
        {lenderDetailsList.map((lenderDetail) => {
          return (
            <Lender
              pageKey={this.pageKey}
              metadata={metadata}
              lenderDetail={lenderDetail}
              lenderActionCallBack={lenderActionCallBack}
            />
          );
        })}
        <CancelTransactionButton />
      </div>
    );
  }
}

export default withBaseComponent(LenderContainer);
