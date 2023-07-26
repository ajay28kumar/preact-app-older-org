import BeEndpoints from '../../services/end-points/be-endpoints';
import requestService from '../services/requestService';

const getEMandateRedirectParams = (pathParams, verificationMethod) => {
  const queryParams = verificationMethod
    ? `?verificationMethod=${verificationMethod}`
    : '';
  const request = {
    method: 'get',
    url: `${BeEndpoints.E_MANDATE_REDIRECT_REQUEST}${pathParams}${queryParams}`,
  };
  return requestService(pathParams, request, (d) => d.data);
};

export default {
  getEMandateRedirectParams: getEMandateRedirectParams,
};
