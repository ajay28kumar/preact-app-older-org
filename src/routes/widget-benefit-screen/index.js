/** @jsx h */
import { h, Component } from 'preact';
import { connect } from 'react-redux';
import withWidgetCommunication from '../../HOC/withWidgetCommunication';
import WidgetBenefits from '../../components/widget/widgetBenefit';
import WidgetEMITables from '../../components/widget/widgetEMITable';
import { isMobile } from '../../utils/helper';
import { tracker, UserActionType } from '../../tracking';

class WidgetBenefitScreen extends Component {
  state = {
    selectedLendersBankCode: '',
  };

  selectLender = (selectedLendersBankCode, lenderName) => {
    const { metadata: merchantMetadata } = this.props || {};
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'lender_select',
      'pv_emi_plans',
      {
        ...merchantMetadata,
        lenderName,
      },
    );
    this.setState({ selectedLendersBankCode });
  };

  updateMobileNumber = () => {
    const { communicateDataToParent } = this.props || {};
    const { mobile } = this.props.matches || {};
    communicateDataToParent({
      actionType: 'CLICK',
      actionName: 'closeBottomPanel_editMobileNumber',
      contactNumber: mobile,
      widgetState: mobile ? 'PreApproved' : 'NotLoggedIn',
    });
  };

  render() {
    const { selectedLendersBankCode } = this.state || {};
    const { amount, mobile } = this.props.matches || {};
    const { emiInfo, metadata: merchantMetadata } = this.props || {};
    const { getEmiInfoState, lenders } = emiInfo || {};
    const selectedLender = lenders.filter(
      (lender) => lender.bankCode === selectedLendersBankCode,
    );
    const lenderName = lenders.length
      ? lenders.reduce((accumulator, currentValue, i) => {
          const lenderList = accumulator + currentValue.name;
          if (lenders.length === i + 1) {
            return lenderList;
          }
          return lenderList + ',';
        }, '')
      : '';
    const metadata = {
      ...merchantMetadata,
      lender_list: lenderName,
    };

    if (isMobile && selectedLendersBankCode.length > 0) {
      return (
        <WidgetEMITables
          metadata={metadata}
          amount={amount}
          lenderDetails={selectedLender.length ? selectedLender[0] : []}
          removeSelectedLender={this.selectLender}
        />
      );
    } else {
      return (
        <WidgetBenefits
          metadata={metadata}
          mobile={mobile}
          amount={amount}
          getEmiInfoState={getEmiInfoState}
          selectedLendersBankCode={selectedLendersBankCode}
          updateMobileNumber={this.updateMobileNumber}
          onSelectLender={this.selectLender}
        />
      );
    }
  }
}

const mapStateToProps = ({ widgetData }) => {
  const { emiInfo, metadata } = widgetData || {};

  return {
    emiInfo,
    metadata,
  };
};

export default withWidgetCommunication(
  connect(mapStateToProps)(WidgetBenefitScreen),
);
