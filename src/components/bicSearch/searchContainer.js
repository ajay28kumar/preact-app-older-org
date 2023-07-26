/** @jsx h */
import { h } from 'preact';
import SearchedCategory from './searchedCategory';
import SearchedBrands from './searchedBrands';

const SearchContainer = ({
  selected,
  pageKey,
  categoryIds,
  brandIds,
  updateBrands,
  updateCategory,
  searchBrandText,
}) => {
  switch (selected) {
    case 'category':
      return (
        <SearchedCategory
          pageKey={pageKey}
          categoryIds={categoryIds}
          updateCategory={updateCategory}
        />
      );
    case 'brand':
      return (
        <SearchedBrands
          searchBrandText={searchBrandText}
          pageKey={pageKey}
          brandIds={brandIds}
          updateBrands={updateBrands}
        />
      );
    default:
      return null;
  }
};

export default SearchContainer;
