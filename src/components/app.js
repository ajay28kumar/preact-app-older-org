/** @jsx h */
import { h, Component } from 'preact';
import { lazy, Suspense } from 'preact/compat';
import { Router } from 'preact-router';
import { Provider } from 'react-redux';
import AsyncRoute from 'preact-async-route';
import 'promise-polyfill/src/polyfill';
import { paymentRoutes } from '../alias/paymentRoutes';
import { activationRoutes } from '../alias/activationRoutes';
import {
  buyWithInstacredLandingRoute,
  instacredHomeRoutes,
} from '../alias/homeRoutes';
import { pageNotFoundRoute } from '../alias/commonRoutes';
import NotFound from '../routes/page-not-found';
import Utils, {
  getLocalstorage,
  setLocalStorage,
  setSessionStorage,
} from '../utils';
import store from '../store';
import AppContainer from './appContainer';
import Redirect from './redirect';
import Spinner from './spinner/spinner';
import { commonRoutes } from '../alias/commonRoutes';
import { PrivateRoute } from './privateRoute';
import { scrollTo } from '../utils/scrollHandler';
import { commonActionType } from '../actionTypes';
import {
  validateAndSetClientIdCookie,
  setUserUUIDCookie,
  CLIENT_ID_COOKIE_KEY,
} from '../tracking/helper';

const RollBarComponent = lazy(() =>
  import(/* webpackChunkName: "rollbar-component" */ './rollbarComponent'),
);

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  state = {
    url: document.referrer,
    path: '',
    template: '',
    routeDetails: {},
  };
  constructor() {
    super();
    this.showAppIncompatiableUI =
      !Utils.isClientSideStorageEnabled() || !Utils.isSessionStorageEnabled();
  }
  componentDidMount() {
    if (!this.showAppIncompatiableUI) {
      validateAndSetClientIdCookie();
      window.addEventListener('storage', this.validateClientIdStorage);
    }
    if (!Utils.getUserUUIDCookie() || !getLocalstorage('userUUID')) {
      return setUserUUIDCookie();
    }
  }

  handleRoute = (e) => {
    if (Utils.isClientSideStorageEnabled() && Utils.isSessionStorageEnabled()) {
      setSessionStorage('referralUrl', this.state.url);
      const { current, url } = e || {};
      const { props: urlProps } = current || {};
      const { path } = urlProps || {};
      scrollTo();
      this.setState({
        url,
        path,
      });
    }
  };

  validateClientIdStorage(storageEvent) {
    if (storageEvent.key === 'clientId' && !storageEvent.newValue) {
      setLocalStorage(
        CLIENT_ID_COOKIE_KEY,
        store.getState().config.clientId ||
          Utils.getCookie(CLIENT_ID_COOKIE_KEY),
      );
    }
  }

  updateTemplate = (routeDetails) => {
    const { template } = routeDetails || {};
    store.dispatch({
      type: commonActionType.CHANGE_ROUTE,
      payload: { routeDetails },
    });
    this.setState({ template });
  };

  render() {
    return (
      <Provider store={store}>
        <AppContainer
          currentPath={this.state.path}
          template={this.state.template}>
          <Router onChange={this.handleRoute} default={pageNotFoundRoute.path}>
            {[
              ...commonRoutes,
              ...instacredHomeRoutes,
              ...activationRoutes,
              ...paymentRoutes,
            ].map((childRoute) => {
              if (childRoute.authenticate) {
                return (
                  <PrivateRoute
                    path={childRoute.path}
                    component={childRoute.component}
                    updateTemplate={this.updateTemplate}
                  />
                );
              }

              return (
                <AsyncRoute
                  path={childRoute.path}
                  getComponent={() =>
                    import(`../routes/${childRoute.component.toString()}`).then(
                      (module) => {
                        this.updateTemplate(childRoute);
                        return module.default;
                      },
                    )
                  }
                  loading={() => (
                    <div className='loaderContainer'>
                      <Spinner />
                    </div>
                  )}
                />
              );
            })}
            <Redirect
              path='/'
              replace={true}
              to={`${buyWithInstacredLandingRoute.path}${
                window.location.search
              }`}
            />
            <NotFound default />
          </Router>
          <Suspense fallback={null}>
            <RollBarComponent />
          </Suspense>
        </AppContainer>
      </Provider>
    );
  }
}
