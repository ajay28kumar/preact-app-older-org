// @flow
/** @jsx h */
import { h } from 'preact';
import { connect } from 'react-redux';
import HorizontalSubCategory from './horizontalSubCategory';
import VerticalSubCategory from './verticalSubCategory';
import type {
  CategoryType,
  CustomAttributesType,
  MerchantMetaDataType,
} from '../../../modelType/bicType';

type Props = {
  pageKey: string,
  header: string,
  customAttributes: CustomAttributesType,
  subcategories: Array<CategoryType>,
  merchantMetadata: MerchantMetaDataType,
};

const SubCategory = ({
  pageKey,
  header,
  customAttributes,
  subcategories,
  merchantMetadata,
}: Props) => {
  const { tileStyle } = customAttributes || {};
  const { handle } = merchantMetadata || {};
  if (tileStyle === 'VERTICAL') {
    return (
      <VerticalSubCategory
        subcategories={subcategories}
        handle={handle}
        header={header}
        pageKey={pageKey}
      />
    );
  }
  return (
    <HorizontalSubCategory
      subcategories={subcategories}
      header={header}
      pageKey={pageKey}
    />
  );
};
const mapStateToProps = ({ buyWithInstacred }) => {
  const { home } = buyWithInstacred;
  const { searchText, customAttributes, subcategories, merchantMetadata } =
    home || {};
  return {
    customAttributes,
    subcategories: subcategories.filter((item) =>
      item.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()),
    ),
    merchantMetadata,
  };
};

export default connect(mapStateToProps)(SubCategory);
