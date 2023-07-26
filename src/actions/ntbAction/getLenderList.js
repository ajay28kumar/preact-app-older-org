import { lenderListController } from '../../api/controllers/ntbController';

export default (
  payload: Object,
  onSuccessAction?: Function,
  onFailAction?: Function,
) => (dispatch: Function) => {
  const { mobile } = payload;
  const data = {
    mobile: mobile,
  };
  lenderListController(data)
    .then(({ data: responseData }) => {
      if (onSuccessAction) dispatch(onSuccessAction(responseData));
    })
    .catch((error) => {
      if (onFailAction) dispatch(onFailAction(error));
    });
};
