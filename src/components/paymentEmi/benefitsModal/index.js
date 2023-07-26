import { Component } from 'preact';
import IDFCBenefitsModal from './IDFCBenefitsModal';
import FederalBenefitsModal from './FederalBenefitsModal';
import KotakBenefitsModal from './KotakBenefitsModal';
import HdfcBenefitsModal from './HdfcBenefitsModal';
import HomeCreditBenefitsModal from './HomeCreditBenefitsModal';
import InstaLendBenefitsModal from './InstaLendBenefitsModal';
import ICICICreditBenefitModal from './ICICICreditBenefitModal';

class BenefitsModal extends Component {
  onClose = () => {
    this.props.closeFunc();
  };

  render() {
    const { lenderId } = this.props || {};
    switch (lenderId) {
      case 201:
        return <IDFCBenefitsModal closeFunc={this.onClose} />;
      case 102:
        return <FederalBenefitsModal closeFunc={this.onClose} />;
      case 401:
        return <KotakBenefitsModal closeFunc={this.onClose} />;
      case 501:
      case 502:
        return <HdfcBenefitsModal closeFunc={this.onClose} />;
      case 601:
        return <HomeCreditBenefitsModal closeFunc={this.onClose} />;
      case 701:
        return <ICICICreditBenefitModal closeFunc={this.onClose} />;
      case 1:
        return <InstaLendBenefitsModal closeFunc={this.onClose} />;
      default:
        return null;
    }
  }
}

export default BenefitsModal;
