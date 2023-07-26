/** @jsx h */
import { h, Component } from 'preact';
import HeaderTab from './headerTab';
import EMITables from './emiTables';
import Benefit from './benefit';
import WidgetHowToBuy from './widgetHowToBuy';
import withBaseComponent from '../../../HOC/withBaseComponent';
import { isMobile } from '../../../utils/helper';

class WidgetBenefits extends Component {
  state = {
    activeTab: 'emiOptions',
  };

  changeTab = (activeTab) => {
    this.setState({ activeTab });
  };
  renderBenefitScreen = (activeTab) => {
    switch (activeTab) {
      case 'benefits': {
        const { mobile, metadata } = this.props || {};
        return <Benefit mobile={mobile} metadata={metadata} />;
      }
      case 'emiOptions':
        const {
          amount,
          mobile,
          getEmiInfoState,
          onSelectLender,
          selectedLendersBankCode,
          updateMobileNumber,
          metadata,
        } = this.props || {};
        return (
          <EMITables
            metadata={metadata}
            amount={amount}
            mobile={mobile}
            getEmiInfoState={getEmiInfoState}
            onSelectLender={onSelectLender}
            selectedLendersBankCode={selectedLendersBankCode}
            updateMobileNumber={updateMobileNumber}
          />
        );
      case 'howToAvail': {
        const { mobile, metadata } = this.props || {};
        return <WidgetHowToBuy mobile={mobile} metadata={metadata} />;
      }
      default:
        console.error(
          `Missing case needs to handle widget-emi-tab ${activeTab}`,
        );
        return null;
    }
  };
  render() {
    const { activeTab } = this.state || {};
    return (
      <div id='widget-benefits'>
        <HeaderTab activeTab={activeTab} changeTab={this.changeTab} />
        {this.renderBenefitScreen(activeTab)}
      </div>
    );
  }
}

export default WidgetBenefits;
