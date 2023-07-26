import { h } from 'preact';
import { lazy, Suspense } from 'preact/compat';

const LazyHomeHeader = lazy(() =>
  import(/* webpackChunkName: "home-header" */ './headerContainer'),
);

const HomeHeader = (props) => {
  return (
    <Suspense fallback={null}>
      <LazyHomeHeader {...props} />
    </Suspense>
  );
};

export default HomeHeader;
