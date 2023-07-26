// @flow
/** @jsx h */
import { h, Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'react-redux';
import SlickSlider from '../../common/slickSlider';
import LightBox from './lightBox';
import { scrollTo } from '../../../utils/scrollHandler';
import { tracker, UserActionType } from '../../../tracking';
import style from './style.css';

import type { BannerType } from '../../../modelType/bicType';

type Props = {
  pageKey: string,
  banners: Array<BannerType>,
};

type State = {
  showVideoLightBoxFlag: boolean,
  videoUrl: string,
};

class Banner extends Component<Props, State> {
  state = {
    showVideoLightBoxFlag: false,
    videoUrl: '',
  };

  showVideoLightBox = (videoUrl: string) => {
    scrollTo();
    const { classList } = document.body || {};
    if (classList) {
      classList.add('noScroll');
    }
    const bodyHeight = '100vh';
    this.setState({
      showVideoLightBoxFlag: true,
      videoUrl,
    });
    if (document.getElementById('lightBox')) {
      const { style } = document.getElementById('lightBox') || {};
      style.height = bodyHeight;
    }
  };

  hideVideoLightBox = () => {
    const { classList } = document.body || {};
    if (classList) {
      classList.remove('noScroll');
      scrollTo();
    }
    this.setState({
      showVideoLightBoxFlag: false,
      videoUrl: '',
    });
  };

  bannerClicked = (banner, index) => {
    this.trackBannerClickAction(banner, index);
    if (banner.type === 'VIDEO') {
      this.showVideoLightBox(banner.actionUrl);
    } else if (banner.type === 'IMAGE') {
      route(`${banner.actionUrl}${window.location.search}`);
    }
  };

  trackBannerClickAction = (banner = {}, index) => {
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'Banner Click Rank - ' + (index + 1),
      this.props.pageKey,
      { 'Image URL': banner.desktopImgUrl || null },
    );
  };

  render() {
    const { banners } = this.props;
    return (
      <div className={style.mainSliderContainer} id='mainSliderContainer'>
        <SlickSlider
          setting={{
            autoplay: true,
            customPaging: () => (
              <div
                style={{
                  margin: '8px auto',
                  width: 8,
                  height: 8,
                  border: '1px var(--primaryThemeColor, #1abc70) solid',
                  borderRadius: '50%',
                }}
              />
            ),
          }}>
          {banners.map((banner, index) => {
            return (
              <div rel={banner.actionUrl}>
                <div
                  className={style.bannerImgContainer}
                  style={{ backgroundImage: `url(${banner.mobileImgUrl})` }}
                  onClick={() => this.bannerClicked(banner, index)}
                />
              </div>
            );
          })}
        </SlickSlider>
        {this.state.showVideoLightBoxFlag && (
          <LightBox
            videoUrl={this.state.videoUrl}
            hideVideoLightbox={this.hideVideoLightBox}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ buyWithInstacred }) => {
  const { home } = buyWithInstacred;
  const { banners } = home;
  return {
    banners,
  };
};

export default connect(mapStateToProps)(Banner);
