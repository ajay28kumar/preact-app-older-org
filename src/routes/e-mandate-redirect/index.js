import { h, Component } from 'preact';
import connect from 'react-redux/es/connect/connect';
import withBaseComponent from '../../HOC/withBaseComponent';
import eMandateController from '../../api/controllers/eMandateController';
import Utils from '../../utils';

class EMandateRedirect extends Component {
  componentDidMount() {
    eMandateController
      .getEMandateRedirectParams(
        this.props.requestId,
        this.props.matches.verificationMethod,
      )
      .then((value) => {
        value = value.data;
        const redirectUrl = value.redirectUrl;
        delete value.redirectUrl;
        new Utils().createAndSubmitDynamicForm(value, redirectUrl);
      });
  }

  render() {
    return null;
  }
}

export default withBaseComponent(EMandateRedirect);
