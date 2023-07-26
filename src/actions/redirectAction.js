import { route } from 'preact-router';
import { paymentFailureRoute, paymentInitRoute } from '../alias/paymentRoutes';

export const redirectToPaymentFailure = () =>
  route(`${paymentFailureRoute.path}${window.location.search}`, true);

export const redirectToPaymentInit = () =>
  route(`${paymentInitRoute.path}${window.location.search}`, true);
