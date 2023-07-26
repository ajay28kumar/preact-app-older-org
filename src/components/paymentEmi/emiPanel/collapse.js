import { Transition, animated } from 'react-spring/renderprops';

const baseStyles = {
  overflow: 'hidden',
  height: 0,
};
const openStyles = {
  height: 'auto',
  opacity: 1,
};
const collapsedStyles = {
  height: 0,
  opacity: 0,
};
const animationConfig = {
  duration: 300,
};
const Collapse = ({ collapsed, children, ...props }) => {
  return (
    <Transition
      items={collapsed}
      native
      config={animationConfig}
      from={baseStyles}
      enter={openStyles}
      leave={collapsedStyles}
      // onFrame={console.log}
      {...props}>
      {(collapsed) =>
        !collapsed
          ? (style) => <animated.div style={style} children={children} />
          : null
      }
    </Transition>
  );
};

export default Collapse;
