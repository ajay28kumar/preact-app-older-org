import { Suspense, lazy } from 'preact/compat';
import Utils from '../utils';
import Redirect from './redirect';
import { loginRoute } from '../alias/homeRoutes';
import Spinner from './spinner/spinner';

export const PrivateRoute = ({ component, updateTemplate }) => {
  if (!Utils.getAuthToken()) {
    return <Redirect to={loginRoute.path} />;
  }
  return <AsyncRouter component={component} updateTemplate={updateTemplate} />;
};

export const AsyncRouter = ({ component, updateTemplate }) => {
  const AsyncComponent = lazy(() =>
    import(`../routes/${component.toString()}`),
  );
  return (
    <Suspense
      fallback={
        <div className='loaderContainer'>
          <Spinner />
        </div>
      }>
      <AsyncComponent />
    </Suspense>
  );
};
