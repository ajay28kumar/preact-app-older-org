import requestService from '../services/requestService';
import BeEndpoints from '../../services/end-points/be-endpoints';
import { removeBlankKeys } from '../../components/material-ui/helper';

const getTransactionInfoController = (data, query) => {
  const request = {
    method: 'post',
    url: BeEndpoints.TRANSACTION_DETAILS,
    data: removeBlankKeys(data),
  };
  return requestService(query, request, (d) => d.data);
};

const initiateSecondFactor = (query) => {
  const { txnUuid, lenderId } = query;
  const request = {
    method: 'get',
    url: `${BeEndpoints.INITIATE_SECOND_FACTOR}${lenderId}`,
    params: {
      txnUuid: txnUuid,
    },
  };
  return requestService(query, request, (d) => d.data);
};

const verifySecondFactor = (data, query) => {
  const { txnUuid, lenderId } = query || {};
  const request = {
    method: 'post',
    url: `${BeEndpoints.VERIFY_SECOND_FACTOR}${lenderId}`,
    params: {
      txnUuid: txnUuid,
    },
    data,
  };
  return requestService(query, request, (d) => d.data);
};

const initiateTransaction = (data, query) => {
  const request = {
    method: 'post',
    url: BeEndpoints.INITIATE_TRANSACTION,
    data,
  };
  return requestService(query, request, (d) => d.data);
};

const confirmTransaction = (data, query) => {
  const request = {
    method: 'post',
    url: BeEndpoints.CONFIRM_TRANSACTION,
    data,
  };
  return requestService(query, request, (d) => d.data);
};

const resendTransactionOtp = (data, query) => {
  const request = {
    method: 'post',
    url: BeEndpoints.RESEND_TRANSACTION_OTP,
    data,
  };
  return requestService(query, request, (d) => d.data);
};

const postCancelTransaction = (data, query) => {
  const request = {
    method: 'post',
    url: BeEndpoints.CANCEL_TRANSACTION,
    data,
  };
  return requestService(query, request, (d) => d.data);
};

export default {
  getTransactionInfoController,
  initiateSecondFactor,
  verifySecondFactor,
  initiateTransaction,
  confirmTransaction,
  resendTransactionOtp,
  postCancelTransaction,
};
