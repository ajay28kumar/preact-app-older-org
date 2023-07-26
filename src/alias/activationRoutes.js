export const lenderNewUserRoute = {
  path: '/lender/newuser/redirect',
  component: 'new-user',
  componentName: 'New User Activation',
  theme: 'lender',
  template: 'activation',
};

export const activationStepsRoute = {
  path: '/activation/steps',
  component: 'steps-to-register',
  componentName: 'Steps to Register',
  theme: 'lender',
  template: 'activation',
};

export const verifyMobileRoute = {
  path: '/activation/verify-mobile',
  component: 'activation-verify-mobile',
  componentName: 'Verify Mobile',
  theme: 'lender',
  template: 'activation',
};

export const activationVerifySecondFactorRoute = {
  path: '/activation/verify-second-factor',
  component: 'activation-verify-second-factor',
  componentName: 'Verify Second Factor',
  theme: 'lender',
  template: 'activation',
};

export const registrationSuccessRoute = {
  path: '/activation/registration-success',
  component: 'registration-success',
  componentName: 'Registration Success',
  theme: 'lender',
  template: 'activation',
};

export const registrationFailureRoute = {
  path: '/activation/registration-failure',
  component: 'registration-failure',
  componentName: 'Registration Failure',
  theme: 'lender',
  template: 'activation',
};

export const activationRoutes = [
  lenderNewUserRoute,
  activationStepsRoute,
  verifyMobileRoute,
  activationVerifySecondFactorRoute,
  registrationSuccessRoute,
  registrationFailureRoute,
];
