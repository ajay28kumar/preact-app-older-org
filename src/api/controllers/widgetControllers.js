import BeEndpoints from '../../services/end-points/be-endpoints';
import requestService from '../services/requestService';
import { removeBlankKeys } from '../../components/material-ui/helper';

export const fetchEMIInfo = (data, query) => {
  const request = {
    method: 'post',
    url: `${BeEndpoints.GET_EMI_INFO}`,
    data,
  };
  return requestService(query, request, (d) => d);
};

export const fetchHowToBuy = (query) => {
  const request = {
    method: 'get',
    url: BeEndpoints.GET_HOW_TO_BUY_WIDGET,
  };
  return requestService(query, request, (d) => d.data);
};

export const fetchUserEligibleEMI = (
  { mobile, amount },
  query,
  overrideHeaders,
) => {
  const request = {
    method: 'post',
    url: BeEndpoints.POST_CHECK_USER_ELIGIBLE_EMI,
    data: removeBlankKeys({
      mobile,
      amount,
    }),
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
