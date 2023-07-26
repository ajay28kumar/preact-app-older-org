// @flow
/** @jsx h */
import { h } from 'preact';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';
import style from '../style.css';
import { tracker, UserActionType } from '../../../tracking';

type Props = {
  isError: boolean,
  maxLength: number,
  elementId: string,
  aivfValue: string,
  className?: string,
  updateAivf: Function,
  onKeyPress: Function,
};

const NumericTextBox = (props: Props) => {
  const {
    isError,
    elementId,
    aivfValue,
    maxLength,
    onKeyPress,
    updateAivf,
    className = '',
  } = props || {};
  return (
    <TextField
      autoComplete='off'
      id={elementId}
      type='tel'
      maxLength={maxLength}
      class={`${style.panCardInputBox} ${className} ${
        isError ? 'mdc-text-field--invalid' : ''
      }`}
      onFocus={(e) => e.target.select()}
      value={aivfValue}
      onKeyUp={onKeyPress}
      onInput={updateAivf}
    />
  );
};

export default NumericTextBox;
