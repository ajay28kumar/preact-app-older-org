import BeEndpoints from '../../services/end-points/be-endpoints';
import requestService from '../services/requestService';

const experimentName = {
  TRANSACTION_AIVF_POP_UP_VARIANT: 'transaction_benefits_popup_test_namespace',
  WIDGET_NL_VARIANT: 'widget_nl_state_namespace',
};

const fetchExperimentData = (data, query, overrideHeaders = {}) => {
  const request = {
    method: 'post',
    url: BeEndpoints.GET_AB_TEST_VARIANT,
    data,
  };
  return requestService(
    query,
    request,
    (d) => d.data,
    null,
    null,
    overrideHeaders,
  );
};

export { fetchExperimentData, experimentName };
