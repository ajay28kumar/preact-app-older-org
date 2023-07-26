import requestService from '../services/requestService';
import BeEndpoints from '../../services/end-points/be-endpoints';
import { removeBlankKeys } from '../../components/material-ui/helper';

const getBICData = (query) => {
  const request = {
    method: 'get',
    url: `${BeEndpoints.CAMPAIGN}${BeEndpoints.GET_BIC}`,
    params: removeBlankKeys(query),
  };
  return requestService(query, request, (d) => d.data);
};

const getBrands = (query) => {
  const request = {
    method: 'get',
    url: `${BeEndpoints.BRANDS_LIST}`,
    params: removeBlankKeys(query),
  };
  return requestService(query, request, (d) => d.data);
};

const getCategories = (query) => {
  const request = {
    method: 'get',
    url: `${BeEndpoints.CATEGORY_LIST}`,
    params: removeBlankKeys(query),
  };
  return requestService(query, request, (d) => d.data);
};

const getMerchants = (data, query) => {
  const request = {
    method: 'post',
    url: BeEndpoints.MERCHANTS_LIST,
    params: removeBlankKeys(query),
    data,
  };
  return requestService(query, request, (d) => d.data);
};

const getOffersController = (query) => {
  const request = {
    method: 'get',
    url: `${BeEndpoints.CAMPAIGN}${BeEndpoints.GET_OFFERS}`,
    params: removeBlankKeys(query),
  };
  return requestService(query, request, (d) => d.data);
};

const getHowToBuyController = (query) => {
  const request = {
    method: 'get',
    url: `${BeEndpoints.CAMPAIGN}HOW_TO_BUY`,
    params: removeBlankKeys(query),
  };
  return requestService(query, request, (d) => d.data);
};

export {
  getBICData,
  getBrands,
  getCategories,
  getMerchants,
  getOffersController,
  getHowToBuyController,
};
