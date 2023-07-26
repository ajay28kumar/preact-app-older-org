export type BicContentType =
  | 'BANNERS'
  | 'CATEGORIES'
  | 'MERCHANTS'
  | 'BRANDS'
  | 'OFFER_TILES'
  | 'SUB_CATEGORIES'
  | 'HOW_TO_BUY'
  | 'BRANCH_LOCATOR'
  | 'SHOW_DEFAULT_BIC';

export type BannerType = {
  actionUrl: string,
  mobileImgUrl: string,
  desktopImgUrl: string,
  type: 'IMAGE' | 'VIDEO',
};

export type CategoryType = {
  id: string,
  name: string,
  desktopImgUrl: string,
  tileDescription: string,
};

export type MerchantType = {
  bicStatus?: string,
  name: string,
  handle: string,
  mobileImgUrl: string,
  description?: string,
};

export type BrandType = {
  id: string,
  name: string,
  desktopImgUrl: string,
};

export type CustomAttributesType = {
  tileStyle?: 'VERTICAL',
};

export type MerchantMetaDataType = {
  handle: string,
};

export type BranchLocatorType = {
  title: string,
  buttonText: string,
  actionUrl: string,
  secondaryButtonText: string,
  secondaryActionUrl: string,
};

export type OfferType = {
  id: string,
  desktopImgUrl: string,
  handle: string,
};
