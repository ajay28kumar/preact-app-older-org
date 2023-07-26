// @flow
/** @jsx h */
import { h, Component } from 'preact';
import { connect } from 'react-redux';
import { buyWithInstacredLandingRoute } from '../../../alias/homeRoutes';
import { route } from 'preact-router';
import style from './style.css';
import { tracker } from '../../../tracking';

type Props = {
  /**
   * pageKey of component (required)
   * @property {string}
   */
  pageKey?: string,
  /**
   * timer of component (required)
   * @property {string}
   */
  timer?: string,
  /**
   * redirectUrl of component (required)
   * @property {string}
   */
  redirectUrl?: string,
  /**
   * redirectText of component (required)
   * @property {string}
   */
  redirectText?: string,
  /**
   * overrideCss of component (optional)
   * @property {string}
   */
  overrideCss?: boolean,
};

class AutoRedirect extends Component<Props> {
  state = {
    redirectTimer: this.props.timer,
  };

  componentDidMount() {
    this.autoRedirect();
  }

  autoRedirect = () => {
    let timer = this.state.redirectTimer;
    const interval = setInterval(() => {
      timer = timer - 1;
      if (timer === 0) {
        this.redirect();
        clearInterval(interval);
      } else {
        this.setState({
          redirectTimer: timer,
        });
      }
    }, 1000);
  };

  redirect = () => {
    tracker.trackImpression('Merchant Auto Redirect', this.props.pageKey);

    this.props.redirectUrl
      ? (location.href = this.props.redirectUrl)
      : route(buyWithInstacredLandingRoute.path);
  };

  render() {
    return (
      <div
        className={`font16 text-center bold-text ${style.redirectText} ${
          this.props.overrideCss ? style.override : ''
        }`}>
        {this.props.overrideCss ? (
          <div className='text-center'>
            <img src='https://iccdn.in/img/loader-green.svg' />
          </div>
        ) : (
          <div className='text-center'>
            <img src='https://iccdn.in/img/loader-white.svg' />
          </div>
        )}
        {this.props.redirectText}
        <div className={`${style.redirectTimer} text-center`}>
          in {this.state.redirectTimer} seconds.
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ modal }) => {
  const { template } = modal || {};
  return {
    template,
  };
};

export default connect(mapStateToProps)(AutoRedirect);
