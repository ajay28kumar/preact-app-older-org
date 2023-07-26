import { getLocalstorage, removeLocalStorage, setLocalStorage } from './index';

export const LenderTheme = Object.freeze({
  LENDER_LOGO: 'lenderLogo',
  IS_LENDER_THEME_SET: 'isLenderThemeSet',
  THEME: 'theme',
  INSTACRED_THEME: 'instaCred',
  LOGO: 'logo',
  LENDER_ID: 'lenderId',
});

export function storeLenderTheme(lenderTheme, logo) {
  setLocalStorage(LenderTheme.THEME, lenderTheme);
  setLocalStorage(LenderTheme.LOGO, JSON.stringify(logo));
}

export const storeLenderId = (lenderId = '') => {
  setLocalStorage(LenderTheme.LENDER_ID, lenderId);
};

export const getUtmCampaign = () => {
  return getLocalstorage('utmCampaign');
};

export const getStorageLenderId = () => {
  const lenderId = getLocalstorage(LenderTheme.LENDER_ID) || '';
  return lenderId !== 'instaCred' ? lenderId : '';
};

export function removeThemeData() {
  removeLocalStorage(LenderTheme.THEME);
  removeLocalStorage(LenderTheme.LENDER_LOGO);
}

export function getLenderTheme() {
  return getLocalstorage(LenderTheme.THEME);
}
export const setLenderTheme = (theme) => {
  setLocalStorage(LenderTheme.THEME, theme);
};

export function getLenderLogo() {
  return JSON.parse(getLocalstorage(LenderTheme.LOGO));
}

export const lenderTheme = {
  '1': {
    lenderId: '1',
    theme: 'instaLend',
    subDomainName: 'instalend',
    brandingLogo: 'https://iccdn.in/img/InstaLend.png',
    lenderLogo: 'https://iccdn.in/img/InstaLend.png',
    icon: 'https://iccdn.in/img/instalend-icon-v1.png',
  },
  '102': {
    lenderId: '102',
    theme: 'federalBank',
    bankCode: '10780',
    subDomainName: 'federalbank',
    brandingLogo: 'https://iccdn.in/lenders/federal-branding-logo-v1.png',
    lenderLogo: 'https://iccdn.in/img/federal-logo-v3.svg',
    icon: 'https://iccdn.in/img/federal-icon-v3.svg',
  },
  '201': {
    lenderId: '201',
    bankCode: '10770',
    theme: 'idfcFirstBank',
    subDomainName: 'idfcfirstbank',
    brandingLogo: 'https://iccdn.in/lenders/idfc-branding-logo-v1.png',
    lenderLogo: 'https://iccdn.in/lenders/IDFC-First-Bank-Logo-150.jpg',
    icon: 'https://iccdn.in/img/idfc-first-icon-v1.png',
  },
  '202': {
    lenderId: '202',
    bankCode: '10770',
    theme: 'idfcFirstBank',
    subDomainName: 'idfcfirstbank',
    brandingLogo: 'https://iccdn.in/lenders/idfc-branding-logo-v1.png',
    lenderLogo: 'https://iccdn.in/lenders/IDFC-First-Bank-Logo-150.jpg',
    icon: 'https://iccdn.in/img/idfc-first-icon-v1.png',
  },
  '301': {
    lenderId: '301',
    theme: 'fullerton',
    subDomainName: 'fullerton',
    brandingLogo: '',
    lenderLogo: '',
    icon: '',
  },
  '401': {
    lenderId: '401',
    bankCode: '10800',
    theme: 'kotak',
    subDomainName: 'kotak',
    brandingLogo: 'https://iccdn.in/lenders/kotak-branding-logo-v1.png',
    lenderLogo: 'https://iccdn.in/lenders/kotak_logo_ml_40.png',
    icon: 'https://iccdn.in/img/kotak-icon-v1.png',
  },
  '501': {
    lenderId: '501',
    bankCode: '10790',
    theme: 'hdfc',
    subDomainName: 'hdfc',
    brandingLogo: 'https://iccdn.in/lenders/hdfc-branding-logo-v1.png',
    lenderLogo: 'https://iccdn.in/lenders/hdfc-branding-logo-v3.svg',
    // icon: 'https://iccdn.in/img/hdfc-logo-icon-v2.png',
  },
  '502': {
    lenderId: '502',
    bankCode: '11460',
    theme: 'hdfc',
    subDomainName: 'hdfc',
    brandingLogo: 'https://iccdn.in/img/flexipay-branding-logo-v4.png',
    lenderLogo: 'https://iccdn.in/lenders/flexipay-40px-logo.png',
  },
  '601': {
    lenderId: '601',
    bankCode: '10810',
    theme: 'homeCredit',
    subDomainName: 'homecredit',
    brandingLogo: 'https://iccdn.in/lenders/home-ccredit-branding-logo-v1.png',
    lenderLogo: 'https://iccdn.in/lenders/home-credit-reverse.png',
    icon: 'https://iccdn.in/lenders/home-credit-icon-v1.svg',
  },
  '701': {
    lenderId: '701',
    bankCode: '14360',
    theme: 'icici',
    subDomainName: 'icici',
    brandingLogo: 'https://iccdn.in/lenders/icici-branding-v1.png',
    lenderLogo: 'https://iccdn.in/lenders/ICICI-emi-logo-reverse-v5.svg',
    icon: 'https://iccdn.in/lenders/icici-icon-logo-v4.svg',
  },
  '801': {
    lenderId: '801',
    theme: 'mahindraFinance',
    bankCode: '14560',
    subDomainName: 'mahindrafinance',
    brandingLogo: 'https://iccdn.in/lenders/mahindra_finance_logo.png',
    lenderLogo: 'https://iccdn.in/lenders/mahindra_finance_logo.png',
    icon: 'https://iccdn.in/lenders/mahindra-finance-square-v1.png',
  },
  instaCred: {
    lenderId: 'instaCred',
    theme: 'instaCred',
    subDomainName: 'instacred',
    lenderLogo: '',
  },
};
