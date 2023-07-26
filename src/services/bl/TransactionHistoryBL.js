import BeEndpoints from '../end-points/be-endpoints';
import NetworkLibrary from '../api/NetworkLibrary';
import { map } from 'rxjs/internal/operators/map';

export function getDataForTransactionHistory() {
  let queryParamsMap = {};
  let url = BeEndpoints.BASE_BE_URL + BeEndpoints.TXN_HISTORY;

  return NetworkLibrary.post(url, queryParamsMap).pipe(
    map((response) => {
      if (response.success === false) {
        throw response.data;
      }
      return response.data;
    }),
  );
}
export function getVoucherDetail(txnId) {
  let queryParamsMap = {};
  let url =
    BeEndpoints.BASE_BE_URL + BeEndpoints.VOUCHER_DETAIL + '?txnId=' + txnId;

  return NetworkLibrary.get(url, queryParamsMap).pipe(
    map((response) => {
      if (response.success === false) {
        throw response.data;
      }
      return response.data;
    }),
  );
}
