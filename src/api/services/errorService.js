import { httpResponse } from '../helpers';

export default (reject) => (error) => {
  const { status, data } = error.response || {};
  const { error: errorResponse } = data || {};
  if (status === 403) {
    return reject(
      httpResponse(status, {
        cta: 'Go back',
        errorType: 'User_Blocked_By_FM',
        title: 'Account Blocked',
        message:
          'Your access has been blocked due to multiple invalid attempts. You can reach out to contact@flexmoney.in for any questions',
        code: status,
      }),
    );
  }
  const errorData = {
    errorData: errorResponse,
    code: status,
  };
  if (!error.message) {
    console.error('unhandledApiErrorResponse', new Error(error));
  }
  reject(httpResponse(status || 500, errorData));
};
