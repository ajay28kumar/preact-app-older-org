export const buyWithInstacredLandingRoute = {
  path: '/buy',
  component: 'buy-with-instacred-landing',
  componentName: 'Buy With InstaCred',
  theme: 'instaCred',
  template: 'home',
};

export const buyWithInstacredLandingSearch = {
  path: '/search',
  component: 'bicSearch',
  componentName: 'Buy With InstaCred Search',
  theme: 'instaCred',
  template: 'home',
};

//I don't think this path is getting used at all
export const buyWithInstacredMerchantLandingPageRoute = {
  path: '/buy/:merchantHandle',
  component: 'buy-with-instacred-landing',
  componentName: 'Buy With InstaCred',
  theme: 'instaCred',
  template: 'home',
};

export const buyWithInstacredLandingPageSymlinkRoute = {
  path: '/home/buy-with-instacred',
  component: 'buy-with-instacred-landing',
  componentName: 'Buy With InstaCred',
  theme: 'instaCred',
  template: 'home',
};

export const offersRoute = {
  path: '/offers',
  component: 'offers',
  componentName: 'Offers',
  theme: 'instaCred',
  template: 'home',
};

export const howToBuyRoute = {
  path: '/how-to-buy/:handle',
  internalRoute: '/how-to-buy/',
  component: 'how-to-buy',
  componentName: 'How To Buy',
  theme: 'instaCred',
  template: 'home',
};

export const voucherPageRoute = {
  path: '/voucher/:merchantName',
  component: 'voucher',
  componentName: 'Voucher',
  theme: 'instaCred',
  template: 'home',
};

export const faqRoute = {
  path: '/faq',
  component: 'faq',
  componentName: 'FAQ',
  theme: 'instaCred',
  template: 'home',
};

export const ntbFaqRoute = {
  path: '/new-user-faq',
  component: 'ntb-faq',
  componentName: 'NtbFAQ',
  theme: 'instaCred',
  template: 'common',
};

export const loginRoute = {
  path: '/login',
  component: 'login',
  componentName: 'Enter Mobile',
  theme: 'instaCred',
  template: 'login',
};

export const transactionHistoryRoute = {
  path: '/transaction-history',
  component: 'transactionHistory',
  componentName: 'Transaction History',
  theme: 'instaCred',
  template: 'home',
  authenticated: true,
};

export const affiliateMerchantRoute = {
  path: '/affiliate/amazon',
  component: 'merchant-affiliate',
  componentName: 'Merchant Affiliate',
  theme: 'instaCred',
  template: 'home',
};

//NTB Activation Landing Page
export const newUserActivationLandingPageRoute = {
  path: '/new-user-activation',
  component: 'ntb-activation',
  componentName: 'New User Activation Landing Page',
  theme: 'instaCred',
  template: 'common',
};
export const newUserActivationSuccessPageRoute = {
  path: '/new-user-activation-success',
  component: 'ntb-registration-success',
  componentName: 'New User Activation Success Page',
  theme: 'instaCred',
  template: 'common',
};

export const newUserActivationPreapprovedSuccessPageRoute = {
  path: '/preapproved-user-activation-success',
  component: 'ntb-preapproved-success',
  componentName: 'Preapproved User Activation Success Page',
  theme: 'instaCred',
  template: 'common',
};

export const instacredHomeRoutes = [
  buyWithInstacredLandingRoute,
  buyWithInstacredLandingSearch,
  buyWithInstacredMerchantLandingPageRoute,
  buyWithInstacredLandingPageSymlinkRoute,
  offersRoute,
  howToBuyRoute,
  voucherPageRoute,
  faqRoute,
  ntbFaqRoute,
  loginRoute,
  transactionHistoryRoute,
  affiliateMerchantRoute,
  newUserActivationLandingPageRoute,
  newUserActivationSuccessPageRoute,
  newUserActivationPreapprovedSuccessPageRoute,
];
