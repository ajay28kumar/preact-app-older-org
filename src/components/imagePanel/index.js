import style from './style.css';

const ImagePanel = (props) => {
  return (
    <div class={style.imagePanelContainer} id={props.id}>
      <h1 class={`${style.imagePanelHeader} bold-text font16 margin0`}>
        {props.title}
      </h1>
      <div class={style.imagePanelSection}>
        <img src={props.desktopImgUrl} alt={props.imgAltText} />
      </div>
    </div>
  );
};
export default ImagePanel;
