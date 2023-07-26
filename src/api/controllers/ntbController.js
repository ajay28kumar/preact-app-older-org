import BeEndpoints from '../../services/end-points/be-endpoints';
import requestService from '../services/requestService';

export const sendOTPController = (data, query) => {
  const request = {
    method: 'post',
    url: BeEndpoints.SEND_OTP_NTB,
    data,
  };
  return requestService(query, request, (d) => d.data);
};

export const verifyOTPController = (data, query) => {
  const request = {
    method: 'post',
    url: BeEndpoints.VERIFY_OTP_NTB,
    data,
  };
  return requestService(query, request, (d) => d.data);
};

export const lenderListController = (data, query) => {
  const request = {
    method: 'post',
    url: BeEndpoints.ELIGIBILITY_LIST,
    data,
  };
  return requestService(query, request, (d) => d.data);
};

export const sendSMSLinkController = (data, query) => {
  const request = {
    method: 'post',
    url: BeEndpoints.WIDGET_SEND_APP_SMS,
    data,
  };
  return requestService(query, request, (d) => d.data);
};
