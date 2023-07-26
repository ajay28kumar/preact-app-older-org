import style from '../../style.css';

const WidgetContainer = (props) => {
  return <div className={style.widgetContainer}>{props.children}</div>;
};

export default WidgetContainer;
