// @flow
/** @jsx h */
import { h, Component } from 'preact';
import * as textField from '@material/textfield';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';
import { removeBlankKeys } from './helper';
import { tracker, UserActionType } from '../../tracking';

type Props = {
  /**
   * isError default value false
   * @property {boolean}
   */
  isError?: boolean,
  /**
   * autoFocus default value false
   * @property {boolean}
   */
  autoFocus: boolean,
  /**
   * @property {boolean} material property of textBox outline default value true
   */
  outlined: boolean,
  /**
   *@property {boolean} css property of input box disabled default value false
   */
  disabled: boolean,
  /**
   * @property {string}
   */
  pageKey?: string,
  /**
   * @property {string} inputType value is input type (eg. number|text|tel|password) default value is text
   */
  inputType: string,
  /**
   *@property {string} autoComplete value can be 'on'|'off' (default value is off)
   */
  autoComplete: string,
  /**
   *@property {string} className is react-property for css class
   */
  className?: string,
  /**
   * @property {string} name text for the input form control
   */
  inputName?: string,
  /**
   * @property {string} placeholder text for the input form control
   */
  inputPlaceholder?: string,
  /**
   * @property {string} label text for the input form control
   */
  inputLabel?: string,
  /**
   * @property {string} id text for the input form control
   */
  inputID?: string,
  /**
   * @property {string|number} value of the input form control
   */
  inputValue?: string | number,
  /**
   * @property {number} max-length of the input form control
   */
  maxLength?: number,
  /**
   * @property {number} min-length of the input form control
   */
  minLength?: number,
  /**
   * @property {string} tracking elements of input form control
   */
  elementName?: string,
  /**
   * @property {string} icon property
   * @link https://material.io/resources/icons/
   */
  leadingIcon?: string,
  /**
   * @property {Function}
   * @callback onChange method of input form control
   */
  onChange: Function,
};

class MuiInput extends Component<Props> {
  componentDidMount() {
    const { autoFocus, className } = this.props || {};
    if (className && textField && textField.MDCTextField) {
      const targetQuery = className.split(' ')[0];
      if (!targetQuery) {
        return false;
      }
      if (autoFocus) {
        const inputContainer = textField.MDCTextField.attachTo(
          document.querySelector(`.${targetQuery}`),
        );
        inputContainer.input_.focus();
        inputContainer.foundation_.activateFocus();
      } else {
      }
    }
  }

  render() {
    const {
      isError,
      outlined,
      autoFocus,
      disabled,
      autoComplete,
      inputType,
      inputName,
      inputPlaceholder,
      inputLabel,
      inputID,
      inputValue,
      maxLength,
      minLength,
      pageKey,
      elementName,
      className,
      leadingIcon,
      onChange,
      ...rest
    } = this.props;

    const propsValue = {
      outlined,
      disabled,
      autocomplete: autoComplete,
      autofocus: autoFocus,
      type: inputType,
      label: inputLabel,
      placeholder: inputPlaceholder,
      name: inputName,
      id: inputID,
      value: inputValue,
      maxlength: maxLength,
      minlength: minLength,
      elementName,
      pageKey,
      className: `${className} ${isError ? 'mdc-text-field--invalid' : ''}`,
      leadingIcon,
      ...rest,
    };
    return (
      <TextField
        {...removeBlankKeys(propsValue)}
        onInput={(e) => {
          const value = e.target.value;
          const { metadata } = rest || {};
          onChange(e);
          if (minLength) {
            if (minLength === value.length) {
              inputTracking({ pageKey, elementName, metadata });
            }
          }
        }}
      />
    );
  }
}

type TrackingType = {
  elementName: string,
  pageKey: string,
  metadata?: Object,
};

export const inputTracking = ({
  elementName,
  pageKey,
  metadata,
}: TrackingType) => {
  tracker.trackUserInteraction(
    UserActionType.INPUT_ENTERED,
    elementName,
    pageKey,
    metadata,
  );
};

MuiInput.defaultProps = {
  autoFocus: false,
  disabled: false,
  outlined: true,
  autoComplete: 'off',
  inputType: 'text',
};

export default MuiInput;
