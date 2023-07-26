import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';

const Panel = (props) => {
  const { className } = props || {};
  return <Card className={className}>{props.children}</Card>;
};

export default Panel;
