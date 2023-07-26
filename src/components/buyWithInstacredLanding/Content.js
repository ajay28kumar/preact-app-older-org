// @flow
/** @jsx h */
import { h } from 'preact';
import Banners from './banners';
import OffersTile from './offersTile';
import Categories from './categories';
import Merchants from './merchants';
import Brands from './brands';
import ShowDefaultBIC from './showDefaultBIC';
import BranchLocator from '../branchLocator';
import type { BicContentType } from '../../modelType/bicType';
import SubCategory from './subCategories';
import HowToBuyPanel from './howToBuyPanel';
import EligibilityPanel from './eligibilityPanel';

type Props = {
  contentType: BicContentType,
  pageKey: string,
  bicAction: Function,
  hideEligiblePanel: Function,
};

export const Content = ({
  contentType,
  pageKey,
  bicAction,
  hideEligiblePanel,
}: Props) => {
  switch (contentType) {
    case 'BANNERS':
      return <Banners pageKey={pageKey} />;
    case 'CATEGORIES':
      return (
        <Categories pageKey={pageKey} header='Category' bicAction={bicAction} />
      );
    case 'MERCHANTS':
      return (
        <Merchants pageKey={pageKey} header='Merchants' bicAction={bicAction} />
      );
    case 'BRANDS':
      return <Brands pageKey={pageKey} header='Brands' bicAction={bicAction} />;
    case 'SUB_CATEGORIES':
      return (
        <SubCategory
          pageKey={pageKey}
          header='Sub Category'
          bicAction={bicAction}
        />
      );
    case 'HOW_TO_BUY':
      return <HowToBuyPanel pageKey={pageKey} />;
    case 'BRANCH_LOCATOR':
      return (
        <BranchLocator
          pageKey={pageKey}
          iconUrl='https://iccdn.in/img/location-icon.png'
        />
      );
    case 'OFFER_TILES':
      return <OffersTile pageKey={pageKey} />;
    case 'SHOW_DEFAULT_BIC':
      return <ShowDefaultBIC pageKey={pageKey} />;
    case 'SHOW_USER_ELIGIBLE':
      return (
        <EligibilityPanel
          pageKey={pageKey}
          bicAction={bicAction}
          hideEligiblePanel={hideEligiblePanel}
        />
      );
    default:
      return null;
  }
};
