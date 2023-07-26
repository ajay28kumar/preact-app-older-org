export const underMaintenanceRoute = {
  path: '/under-maintenance',
  component: 'under-maintenance',
  componentName: 'Under Maintenance',
  theme: 'instaCred',
  template: 'common',
};

export const pageNotFoundRoute = {
  path: '/404',
  component: 'page-not-found',
  componentName: 'Page Not Found',
  theme: 'instaCred',
  template: 'common',
};

const widgetCommunicationRoute = {
  path: '/widget-communication-screen',
  component: 'widget-communication-screen',
  componentName: 'Communication Widget',
  theme: 'instaCred',
  template: 'widget',
};

export const widgetCheckEligibleRoute = {
  path: '/widget-check-eligibility',
  component: 'widget-check-eligibility',
  componentName: 'Check Eligible',
  theme: 'instaCred',
  template: 'widget',
};

export const widgetBenefitRoute = {
  path: '/widget-benefit-screen',
  component: 'widget-benefit-screen',
  componentName: 'Widget Benefit Screen',
  theme: 'instaCred',
  template: 'widget',
};

export const privacyPolicy = {
  path: '/privacy-policy',
  component: 'privacy-policy',
  componentName: 'Privacy Policy',
  theme: 'instaCred',
  template: 'neutral',
};

export const aboutUsRoute = {
  path: '/about-us',
  component: 'about-us',
  componentName: 'About Us',
  theme: 'instaCred',
  template: 'neutral',
};

export const termsAndCondition = {
  path: '/terms-and-condition',
  component: 'terms-and-condition',
  componentName: 'General Terms And Condition',
  theme: 'instaCred',
  template: 'neutral',
};

export const commonRoutes = [
  underMaintenanceRoute,
  pageNotFoundRoute,
  widgetCommunicationRoute,
  widgetCheckEligibleRoute,
  widgetBenefitRoute,
  privacyPolicy,
  termsAndCondition,
  aboutUsRoute,
];
