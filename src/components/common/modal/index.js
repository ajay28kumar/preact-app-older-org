import Dialog from 'preact-material-components/Dialog';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Button/style.css';

const Modal = ({
  dialogRef,
  seeMoreContent,
  header = false,
  body = true,
  footer = false,
}) => {
  return (
    <Dialog ref={dialogRef}>
      {header && <Dialog.Header>{seeMoreContent.name} </Dialog.Header>}
      {body && (
        <Dialog.Body>
          <div>{seeMoreContent.description}</div>
        </Dialog.Body>
      )}
      {footer && (
        <Dialog.Footer>
          <Dialog.FooterButton accept>OK</Dialog.FooterButton>
        </Dialog.Footer>
      )}
    </Dialog>
  );
};

export default Modal;
