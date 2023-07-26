//@flow
/** @jsx h */
import { h } from 'preact';
import MuiInput from '../material-ui/muiInput';

type Props = {
  isError: boolean,
  autoFocus?: boolean,
  pageKey: string,
  elementName: string,
  label: string,
  pinValue: string,
  updatePin: Function,
  inputName: string,
  inputId: string,
  type: 'text' | 'password' | 'tel' | 'number',
  className: string,
};

const PinInputBox = ({
  isError = false,
  autoFocus = false,
  pageKey,
  elementName,
  label,
  pinValue,
  updatePin,
  inputName,
  inputId,
  type = 'text',
  className = 'setup-pin',
}: Props) => {
  return (
    <MuiInput
      outlined
      isError={isError}
      autoFocus={autoFocus}
      pageKey={pageKey}
      elementName={elementName}
      inputName={inputName}
      inputPlaceholder={label}
      inputType={type}
      inputID={inputId}
      inputValue={pinValue}
      className={className}
      maxLength={6}
      minLength={6}
      onChange={updatePin}
    />
  );
};

export default PinInputBox;
