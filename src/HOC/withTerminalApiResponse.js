/** @jsx h */
import { h } from 'preact';
import Spinner from '../components/spinner/spinner';
import ErrorScreen from '../components/errorScreen';
import { apiStatus } from '../actionTypes';

const withTerminalApiResponse = (WrappedComponent) => (props) => {
  const { apiStatus: apiState, loadingText, template, ...rest } = props || {};
  if (apiState === apiStatus.SUCCESS) {
    return <WrappedComponent {...rest} />;
  }
  if (apiState === apiStatus.ERROR) {
    if (template === 'payment') {
      return <WrappedComponent {...rest} />;
    }
    return <ErrorScreen errorMessage={props.errorMsg} />;
  }
  return (
    <div className='loaderContainer'>
      <Spinner />
      {loadingText && <div style={{ margin: 24 }}>{loadingText}</div>}
    </div>
  );
};

export default withTerminalApiResponse;
