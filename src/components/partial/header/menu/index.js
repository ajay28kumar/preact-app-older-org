import { h } from 'preact';
import { lazy, Suspense } from 'preact/compat';

const LazyMenu = lazy(() =>
  import(/* webpackChunkName: "sidebar-menu" */ './menu'),
);

const Menu = (props) => {
  return (
    <Suspense fallback={null}>
      <LazyMenu {...props} />
    </Suspense>
  );
};

export default Menu;
