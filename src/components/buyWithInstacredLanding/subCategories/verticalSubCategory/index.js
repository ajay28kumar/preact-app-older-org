import ImageTilesList from '../../../imageTilesList';
import {
  buyWithInstacredLandingSearch,
  howToBuyRoute,
} from '../../../../alias/homeRoutes';

import type { CategoryType } from '../../../../modelType/bicType';

type Props = {
  handle: string,
  pageKey: string,
  subcategories: CategoryType,
};

const VerticalSubCategory = (props: Props) => {
  const { subcategories, handle, pageKey } = props;
  return (
    <ImageTilesList
      title='TOP CATEGORIES'
      additionalButton='See More'
      content={subcategories}
      pageKey={pageKey}
      additionalButtonAction={
        handle
          ? `${howToBuyRoute.internalRoute}${handle}${window.location.search}`
          : `${buyWithInstacredLandingSearch}${window.location.search}`
      }
      header='Sub Category'
    />
  );
};

export default VerticalSubCategory;
