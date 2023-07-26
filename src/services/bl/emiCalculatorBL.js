import BeEndpoints from '../end-points/be-endpoints';
import NetworkLibrary from '../api/NetworkLibrary';
import { map } from 'rxjs/internal/operators/map';
import { getStorageLenderId } from '../../utils/lenderTheme';
import { setSessionStorage } from '../../utils';

export function getEmiCalculatedData(amount, merchantId, mobile, txnUUID) {
  let lenderId = getStorageLenderId();
  let url = BeEndpoints.BASE_BE_URL + BeEndpoints.TRANSACTION_EMI_CALCULATOR;
  let requestBody = { amount, merchantId, lenderId, mobile, txnUUID };

  return NetworkLibrary.post(url, requestBody).pipe(
    map((response) => {
      if (response.success === false) {
        throw response;
      }
      setSessionStorage('loanAmount', response.data.loanAmount);
      return response;
    }),
  );
}
