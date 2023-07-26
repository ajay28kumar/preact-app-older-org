// @flow
/** @jsx h */
import { h } from 'preact';
import { connect } from 'react-redux';
import CategorySlider from '../categorySlider';

import type { CategoryType } from '../../../modelType/bicType';

type Props = {
  campaignId: string,
  pageKey: string,
  header: string,
  lenderId?: string,
  categories: Array<CategoryType>,
  bicAction: Function,
};

const Categories = ({
  categories,
  campaignId,
  pageKey,
  header,
  lenderId,
  bicAction,
}: Props) => {
  return (
    <CategorySlider
      lenderId={lenderId}
      data={categories}
      campaignId={campaignId}
      header={header}
      pageKey={pageKey}
      bicAction={bicAction}
    />
  );
};

const mapStateToProps = ({ buyWithInstacred, config }) => {
  const { home } = buyWithInstacred;
  const { campaignId, categories } = home;
  const { lenderDetails } = config;
  const { lenderId } = lenderDetails || {};
  const MAX_RESULT = 10;
  return {
    campaignId,
    lenderId,
    categories:
      categories.length > MAX_RESULT
        ? categories.slice(0, MAX_RESULT)
        : categories,
  };
};
export default connect(mapStateToProps)(Categories);
