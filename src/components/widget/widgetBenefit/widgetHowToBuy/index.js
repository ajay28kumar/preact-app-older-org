/** @jsx h */
import { Component, h } from 'preact';
import { connect } from 'react-redux';
import widgetEmiInfoAction from '../../../../actions/widgetEmiInfoAction';
import widgetActionTypes from '../../../../actions/widgetEmiInfoAction/actionType';
import style from '../style.css';
import { apiStatus } from '../../../../actionTypes';
import SpinLoader from '../../../spinLoader';
import GenericError from '../../genericError';
import { isMobile } from '../../../../utils/helper';
import PoweredBy from '../../poweredBy';
import withBaseComponent from '../../../../HOC/withBaseComponent';

class WidgetHowToBuy extends Component {
  pageKey = 'pv_HTB';
  metadata = {
    ...this.props.metadata,
  };

  componentDidMount() {
    const { apiState } = this.props.howToBuyData || {};
    if (apiState !== apiStatus.SUCCESS) {
      this.props.widgetEmiInfoAction(widgetActionTypes.getHowToBuyData);
    }
  }

  render() {
    const { apiState } = this.props.howToBuyData || {};
    switch (apiState) {
      case apiStatus.SUCCESS:
        const { videoUrl } = this.props.howToBuyData || {};
        return (
          <div className={style.benefitScreenBody}>
            <div
              className='font20 bold-text text-center'
              id='how-to-avail-header'>
              How to Avail
            </div>
            <div className={style.htbContainer}>
              <video
                src={videoUrl}
                autoPlay
                loop
                height='296'
                id='how-to-avail-video'
              />
            </div>
            {!isMobile && (
              <div className={style.poweredByContainer}>
                <PoweredBy />
              </div>
            )}
          </div>
        );
      case apiStatus.ERROR:
        return <GenericError />;
      default:
        return (
          <div className={style.benefitScreenBody}>
            <SpinLoader />
          </div>
        );
    }
  }
}

const mapStateToProps = ({ widgetData }) => {
  const { howToBuy } = widgetData || {};
  return {
    howToBuyData: howToBuy,
  };
};

export default connect(
  mapStateToProps,
  { widgetEmiInfoAction },
)(withBaseComponent(WidgetHowToBuy));
