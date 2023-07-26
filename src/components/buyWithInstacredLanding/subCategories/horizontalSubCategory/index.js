// @flow
/** @jsx h */
import { h } from 'preact';
import CategorySlider from '../../categorySlider';
import type { CategoryType } from '../../../../modelType/bicType';

type Props = {
  campaignId: string,
  header: string,
  pageKey: string,
  subcategories: Array<CategoryType>,
};

const HorizontalSubCategory = (props: Props) => {
  const { subcategories, campaignId, header, pageKey } = props;
  return (
    <CategorySlider
      data={subcategories}
      campaignId={campaignId}
      header={header}
      pageKey={pageKey}
    />
  );
};

export default HorizontalSubCategory;
