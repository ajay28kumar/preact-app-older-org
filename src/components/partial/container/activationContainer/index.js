/** @jsx h */
import { h, Fragment } from 'preact';
import ActivationHeader from '../../header/activationHeader';
import style from '../../style.css';

const ActivationContainer = (props) => {
  return (
    <Fragment>
      <ActivationHeader />
      <div className={style.activationBody}>{props.children}</div>
    </Fragment>
  );
};

export default ActivationContainer;
