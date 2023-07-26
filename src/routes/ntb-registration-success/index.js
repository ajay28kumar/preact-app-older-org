/** @jsx h */
//@flow
import { h, Component } from 'preact';
import style from './style.css';
import withBaseComponent from '../../HOC/withBaseComponent';
import BrowserExitTracking from '../../components/common/browserExitTracking';
import { connect } from 'react-redux';
import ntbAction from '../../actions/ntbAction';
import {
  NtbMerchants,
  NonNTBMerchants,
} from '../../components/ntbNonApprovedScreen';

type Props = {
  ntbAction: Function,
  matches: Object,
};

class NewUserActivationSuccess extends Component<Props> {
  pageKey = 'UA NTB Download';

  render() {
    const { redirectUrl } = this.props || {};
    const { isNTBEnabledOnMerchant } = this.props.matches || {};
    const extractHostname = (url) => {
      // TODO Merchant Name should come from BE
      if (!url) {
        return 'Merchant';
      }
      let hostname =
        url.indexOf('//') > -1 ? url.split('/')[2] : url.split('/')[0];
      hostname = hostname.split(':')[0];
      hostname = hostname.split('?')[0];
      return hostname;
    };

    const merchantName = extractHostname(redirectUrl);
    return (
      <div className={style.pageWrapper}>
        <BrowserExitTracking
          pageKey={this.pageKey}
          elementName='Close Window'
        />
        {isNTBEnabledOnMerchant === 'true' ? (
          <NtbMerchants
            merchantName={merchantName}
            redirectUrl={redirectUrl}
            pageKey={this.pageKey}
          />
        ) : (
          <NonNTBMerchants pageKey={this.pageKey} />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ ntbConfig }) => {
  const { redirectUrl } = ntbConfig;
  return {
    redirectUrl,
  };
};
export default connect(
  mapStateToProps,
  { ntbAction },
)(withBaseComponent(NewUserActivationSuccess));
