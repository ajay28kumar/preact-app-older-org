import BeEndpoints from '../../services/end-points/be-endpoints';
import requestService from '../services/requestService';
import { removeBlankKeys } from '../../components/material-ui/helper';

const getUserSUD = (query) => {
  const { mobile, merchantId, amt, bankCode } = query || {};
  const request = {
    method: 'get',
    url: `${BeEndpoints.GET_SUD}/${mobile}`,
    params: removeBlankKeys({
      merchantId,
      amt,
      bankCode,
    }),
  };
  return requestService(
    query,
    request,
    (d) => d.data,
    null,
    responseDecorator,
    null,
    BeEndpoints.GET_SUD,
  );
};

//this particular decorator added to unify sud response similar to all v2 api
export const responseDecorator = (resp) => {
  return {
    ...resp,
    data: {
      ...resp.data,
      success: true,
    },
  };
};

export default {
  getUserSUD,
};

export const trackingTxn = (data, query) => {
  const request = {
    method: 'post',
    url: BeEndpoints.TRACKING_TRANSACTION,
    data,
  };
  return requestService(query, request, (d) => d.data);
};
