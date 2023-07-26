import { h } from 'preact';
import { lazy, Suspense } from 'preact/compat';

const LazyTermsAndConditionContent = lazy(() =>
  import(/* webpackChunkName: "lender-terms-and-condition" */ './termsAndConditionsContent'),
);

const TermsAndConditionsContent = (props) => {
  return (
    <Suspense fallback={null}>
      <LazyTermsAndConditionContent {...props} />
    </Suspense>
  );
};

export default TermsAndConditionsContent;
