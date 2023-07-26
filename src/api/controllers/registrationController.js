import requestService from '../services/requestService';
import BeEndpoints from '../../services/end-points/be-endpoints';

const getCampaignDetails = (query) => {
  const { campaignId, uiGroup } = query;
  const request = {
    method: 'get',
    url: `${BeEndpoints.CAMPAIGN}${uiGroup}`,
    params: {
      campaignId,
    },
  };
  return requestService(query, request, (d) => d.data);
};

const postRegistrationInit = (data, query) => {
  const request = {
    method: 'post',
    url: `${BeEndpoints.INITIATE_REGISTRATION}`,
    data,
  };
  return requestService(query, request, (d) => d);
};

const postVerifyMobile = (data, query) => {
  const request = {
    method: 'post',
    url: BeEndpoints.CONFIRM_REGISTRATION,
    data,
  };
  return requestService(query, request, (d) => d.data);
};

const postVerifyMobileSendOTP = (data, query) => {
  const request = {
    method: 'post',
    url: BeEndpoints.SEND_OTP_RESET_PIN,
    data,
  };
  return requestService(query, request, (d) => d.data);
};

const postInitiateCreditLine = (data, query) => {
  const { lenderId } = query;
  const request = {
    method: 'post',
    url: `${BeEndpoints.INIT_CREDIT_LINE}/${lenderId}`,
    data,
  };
  return requestService(query, request, (d) => d.data);
};
const postVerifyCreditLine = (data, query) => {
  const { lenderId } = query;
  const request = {
    method: 'post',
    url: `${BeEndpoints.VERIFY_CREDIT_LINE}/${lenderId}`,
    data,
  };
  return requestService(query, request, (d) => d);
};

export default {
  getCampaignDetails,
  postRegistrationInit,
  postVerifyMobile,
  postVerifyMobileSendOTP,
  postInitiateCreditLine,
  postVerifyCreditLine,
};
