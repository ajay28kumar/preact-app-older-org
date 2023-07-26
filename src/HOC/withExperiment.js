/** @jsx h */
import { h } from 'preact';
import { connect } from 'react-redux';
import { apiStatus } from '../actionTypes';
import Spinner from '../components/spinner/spinner';

const withExperiment = (experimentName, Components, defaultBucket) => (
  props,
) => {
  const EnhancedComponent = ({ Component, apiState }) => {
    if (apiState === apiStatus.SUCCESS) {
      return <Component {...props} />;
    }
    return (
      <div className='loaderContainer'>
        <Spinner />
      </div>
    );
  };
  const mapStateToProps = ({ config }) => {
    const { experimentDetails } = config;
    const bucket = experimentDetails[experimentName];
    const Component = Components[bucket] || Components[defaultBucket];
    return {
      apiState: experimentDetails.apiState,
      Component,
    };
  };
  return connect(mapStateToProps)(EnhancedComponent);
};

export default withExperiment;
