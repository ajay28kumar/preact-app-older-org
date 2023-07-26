//@flow
/** @jsx h */
import { h } from 'preact';
import OfferCard from './offerCard';
import OfferCarousel from './offerCarousel';

type Props = {
  contentType: 'BANNERS' | 'OFFER_TILES',
  pageKey: string,
};

export const Content = ({ contentType, pageKey }: Props) => {
  switch (contentType) {
    case 'BANNERS':
      return <OfferCarousel pageKey={pageKey} />;
    case 'OFFER_TILES':
      return <OfferCard pageKey={pageKey} />;
    default:
      return null;
  }
};
