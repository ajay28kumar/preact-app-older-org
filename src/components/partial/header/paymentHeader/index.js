/** @jsx h */
import { h } from 'preact';
import { lazy, Suspense } from 'preact/compat';

const LazyPaymentHeader = lazy(() =>
  import(/* webpackChunkName: "transaction-header" */ './header'),
);

const PaymentHeader = () => {
  return (
    <Suspense fallback={null}>
      <LazyPaymentHeader />
    </Suspense>
  );
};
export default PaymentHeader;
