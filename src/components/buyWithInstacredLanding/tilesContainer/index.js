// @flow
/** @jsx h */
import { h, VNode } from 'preact';
import style from './style.css';

type Props = {
  additionalButton?: boolean,
  title: string,
  additionalButtonAction: Function,
  children: VNode,
};

const TilesContainer = (props: Props) => {
  return (
    <div style={{ margin: 8 }}>
      {props.title && (
        <div className={style.tileHeaderContainer}>
          <h2 className='text60 font14 bold-text margin0'>{props.title}</h2>
          {props.additionalButtonAction && props.additionalButton ? (
            <div
              className={`${style.seeMore} text-color font14 bold-text`}
              onClick={props.additionalButtonAction}>
              See More{' '}
              <span className='material-icons font12 bold-text'>
                arrow_forward_ios
              </span>
            </div>
          ) : (
            <div />
          )}
        </div>
      )}
      <div>{props.children}</div>
    </div>
  );
};

export default TilesContainer;
