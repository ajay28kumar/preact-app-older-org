/** @jsx h */
import { h } from 'preact';
import { lazy, Suspense } from 'preact/compat';

const LazyModal = lazy(() =>
  import(/* webpackChunkName: "lazy-modal-chunk" */ './modal'),
);

const Modal = () => {
  return (
    <Suspense fallback={null}>
      <LazyModal />
    </Suspense>
  );
};

export default Modal;
