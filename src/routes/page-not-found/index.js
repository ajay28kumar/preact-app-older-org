import { Component } from 'preact';
import { route } from 'preact-router';
import style from './style.css';
import withBaseComponent from '../../HOC/withBaseComponent';
import { loginRoute } from '../../alias/homeRoutes';

class NotFound extends Component {
  pageKey = 'Page Not Found';

  navigateToLogin() {
    route(loginRoute.path);
  }
  render() {
    return (
      <div class={`${style.home}`}>
        <div
          class={`${style.container}`}
          onClick={() => this.navigateToLogin()}>
          <img
            src='https://iccdn.in/img/404-desktop.png'
            class={`${style.desktop}`}
          />
          <img
            src='https://iccdn.in/img/404-mobile.png'
            class={`${style.mobile}`}
          />
        </div>
      </div>
    );
  }
}

export default withBaseComponent(NotFound);
