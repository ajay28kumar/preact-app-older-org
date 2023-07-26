import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/LayoutGrid/style.css';

export const Layout = ({ children, className, innerGridClass }) => (
  <LayoutGrid id='flexLayoutGrid' className={className}>
    <LayoutGrid.Inner className={innerGridClass}>{children}</LayoutGrid.Inner>
  </LayoutGrid>
);

export const LayoutColumn = ({ children, ...props }) => (
  <LayoutGrid.Cell {...props}>{children}</LayoutGrid.Cell>
);
