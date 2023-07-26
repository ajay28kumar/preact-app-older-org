import { h, Component } from 'preact';
import connect from 'react-redux/es/connect/connect';
import withBaseComponent from '../../HOC/withBaseComponent';

class EMandateResult extends Component {
  componentDidMount() {
    if (window.Android) {
      window.Android.mandateSetupResultReceived(this.props.id);
    }
  }

  render() {
    return null;
  }
}

export default withBaseComponent(EMandateResult);
