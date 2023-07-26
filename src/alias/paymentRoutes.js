export const paymentInitRoute = {
  path: '/payment/init',
  component: 'payment-init',
  componentName: 'Payment Init',
  theme: 'instaCred',
  template: 'payment',
};

export const paymentEnterMobileRoute = {
  path: '/payment/enter-mobile',
  component: 'payment-enter-mobile',
  componentName: 'Enter Mobile',
  theme: 'instaCred',
  template: 'payment',
};

export const paymentLenderListRoute = {
  path: '/payment/lender-list',
  component: 'payment-lender-list',
  componentName: 'Payment Lender List',
  theme: 'instaCred',
  template: 'payment',
};

export const paymentEmiSelectionRoute = {
  path: '/payment/emi-selection',
  component: 'payment-emi-selection',
  componentName: 'Payment EMI Selection',
  theme: 'instaCred',
  template: 'payment',
};

export const payLaterPlanSelectionRoute = {
  path: '/payment/paylater-plan-selection',
  component: 'paylater-plan-selection',
  componentName: 'PayLater Plan Selection',
  theme: 'instaCred',
  template: 'payment',
};

export const paymentConfirmRoute = {
  path: '/payment/confirm',
  component: 'payment-confirm',
  componentName: 'Payment Confirm',
  theme: 'instaCred',
  template: 'payment',
};

export const paymentSuccessRoute = {
  path: '/payment/success',
  component: 'payment-success',
  componentName: 'Payment Success',
  theme: 'instaCred',
  template: 'payment',
};

export const paymentFailureRoute = {
  path: '/payment/failure',
  component: 'payment-failure',
  componentName: 'Payment Failure',
  theme: 'instaCred',
  template: 'payment',
};

export const voucherTncRoute = {
  path: '/voucher-tnc/:lenderName',
  component: 'voucher-tnc',
  componentName: 'Voucher Terms and Conditions',
  theme: 'instaCred',
  template: 'payment',
};

export const eMandateRedirect = {
  path: '/e-mandate-redirect/:requestId',
  component: 'e-mandate-redirect',
  componentName: 'E-Mandate Redirect',
  theme: 'instaCred',
  template: 'payment',
};

export const eMandateResult = {
  path: '/e-mandate-result',
  component: 'e-mandate-result',
  componentName: 'E-Mandate Result',
  theme: 'instaCred',
  template: 'payment',
};

export const paymentRoutes = [
  paymentInitRoute,
  paymentEnterMobileRoute,
  paymentLenderListRoute,
  paymentEmiSelectionRoute,
  payLaterPlanSelectionRoute,
  paymentConfirmRoute,
  paymentSuccessRoute,
  paymentFailureRoute,
  voucherTncRoute,
  eMandateRedirect,
  eMandateResult,
];
