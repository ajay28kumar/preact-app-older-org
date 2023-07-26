const SpinLoader = ({ size }) => {
  const { height: loaderSize, borderSize } = sizeToNumber[size];
  const styles = {
    width: loaderSize,
    height: loaderSize,
    borderWidth: borderSize,
  };
  return (
    <div class='lds-ring'>
      <div style={styles} />
      <div style={styles} />
      <div style={styles} />
      <div style={styles} />
    </div>
  );
};

SpinLoader.defaultProps = {
  size: 'medium',
};

const sizeToNumber = {
  large: {
    height: 100,
    borderSize: 8,
  },
  medium: {
    height: 50,
    borderSize: 6,
  },
  small: {
    height: 30,
    borderSize: 4,
  },
  xsmall: {
    height: 24,
    borderSize: 2,
  },
};

export default SpinLoader;
