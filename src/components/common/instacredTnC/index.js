/** @jsx h */
//@flow
import { h } from 'preact';
import Checkbox from 'preact-material-components/Checkbox';
import Formfield from 'preact-material-components/FormField';
import style from './style.css';
import { termsAndCondition } from '../../../alias/commonRoutes';
import 'preact-material-components/Checkbox/style.css';

type Props = {
  isTermsAccepted: boolean,
  pageKey: string,
  metadata?: Object,
  trackUserAction?: Function,
  onClickTermsAccepted: Function,
};

const InstacredTnC = ({
  isTermsAccepted,
  pageKey,
  metadata = {},
  trackUserAction,
  onClickTermsAccepted,
}: Props) => {
  return (
    <Formfield className={style.termsContainer}>
      <Checkbox
        id='verify-mobile-number-terms-and-condition-checkbox'
        checked={isTermsAccepted}
        onClick={() => onClickTermsAccepted(!isTermsAccepted)}
      />
      <label
        className='font12'
        id='verify-mobile-number-terms-and-condition-label'>
        <span className='text60'>I agree to</span>
        <span
          className={'text-color bold-text cursorPointer'}
          onClick={() => {
            trackUserAction && trackUserAction('view_t&c', pageKey, metadata);
            window.open(termsAndCondition.path);
          }}>
          {' '}
          InstaCred’s Terms & Conditions
        </span>
      </label>
    </Formfield>
  );
};

export default InstacredTnC;
