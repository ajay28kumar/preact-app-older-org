import Dialog from 'preact-material-components/Dialog';
import TermsAndCondition from './termsAndCondition';
import 'preact-material-components/Dialog/style.css';

type Props = {
  /**
   * @property {number} to return lender specific termsAndConditions
   */
  lenderId: number,
  /**
   * @function close callback function for lenderTnC model
   */
  onCloseCallback: Function,
};

const TermsAndConditionsContent = ({ lenderId, onCloseCallback }: Props) => {
  return (
    <div>
      <Dialog.Header>
        Terms and Conditions
        <span className='dialogClose' onClick={onCloseCallback}>
          &times;
        </span>
      </Dialog.Header>
      <Dialog.Body scrollable={true}>
        <TermsAndCondition lenderId={lenderId} />
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.FooterButton onClick={onCloseCallback}>OK</Dialog.FooterButton>
      </Dialog.Footer>
    </div>
  );
};

export default TermsAndConditionsContent;
