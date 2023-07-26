// @flow
/** @jsx h */
import { h } from 'preact';
import style from '../style.css';
import MuiInput from '../../material-ui/muiInput';
import { apiStatus } from '../../../actionTypes';
import type { ApiState } from '../../../modelType';

type Props = {
  pageKey: string,
  aivfValue: string,
  errorMessage?: string,
  confirmAivfApiState: ApiState,
  updateAivf: Function,
  metadata: Object,
};

const VerifyDebitCardAIVF = ({
  pageKey,
  confirmAivfApiState,
  aivfValue,
  errorMessage,
  updateAivf,
  metadata,
}: Props) => {
  return (
    <div className={style.inputBox}>
      <MuiInput
        isError={confirmAivfApiState === apiStatus.ERROR && errorMessage}
        pageKey={pageKey}
        elementName='aivf_input_aivf'
        metadata={metadata}
        inputID='accountNo'
        inputPlaceholder='Enter Last 4 digits'
        className={`aivfInputBox ${style.inputWidth} ${
          aivfValue.length ? style.letterSpacing : ''
        }`}
        inputType='tel'
        maxLength={4}
        minLength={4}
        value={aivfValue}
        onChange={(e) => {
          const text = e.target.value;
          const aivfText = text ? text.replace(/[^0-9]/g, '') : '';
          return updateAivf(aivfText);
        }}
      />
      {confirmAivfApiState === apiStatus.ERROR && errorMessage && (
        <div className='inputError' id='aivfVerification'>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default VerifyDebitCardAIVF;
