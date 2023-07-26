import BeEndpoints from '../../services/end-points/be-endpoints';
import requestService from '../services/requestService';

export const initiateLoginController = (data, query) => {
  const request = {
    method: 'post',
    url: BeEndpoints.INITIATE_LOGIN,
    data,
  };
  return requestService(query, request, (d) => d.data);
};

export const completeLoginController = (data, query) => {
  const request = {
    method: 'post',
    url: BeEndpoints.COMPLETE_LOGIN,
    data,
  };
  return requestService(query, request, (d) => d.data);
};

export const checkUserEligibilityController = (data, query) => {
  const request = {
    method: 'post',
    url: BeEndpoints.DETECT_USER,
    data,
  };
  return requestService(query, request, (d) => d.data);
};
