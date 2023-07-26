import { h } from 'preact';
import { lazy, Suspense } from 'preact/compat';

const HdfcLoanTncLazyComponent = lazy(() =>
  import(/* webpackChunkName: "hdfc-loan-tnc" */ './hdfcLoanTnCLazyComponent'),
);

const HdfcLoanTnc = (props) => {
  return (
    <Suspense fallback={null}>
      <HdfcLoanTncLazyComponent {...props} />
    </Suspense>
  );
};

export default HdfcLoanTnc;
