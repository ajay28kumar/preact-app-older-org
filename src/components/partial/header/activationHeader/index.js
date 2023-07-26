import { lazy, Suspense } from 'preact/compat';

const LazyActivationHeader = lazy(() =>
  import(/* webpackChunkName: "activation-header" */ './header'),
);

const ActivationHeader = () => {
  return (
    <Suspense fallback={null}>
      <LazyActivationHeader />
    </Suspense>
  );
};
export default ActivationHeader;
