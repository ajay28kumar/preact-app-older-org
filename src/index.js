import './style';
import App from './components/app';

import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Roboto'],
  },
});

if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    enumerable: false,
    value(obj) {
      const newArr = this.filter((el) => el === obj); // eslint-disable-line eqeqeq
      return newArr.length > 0;
    },
  });
}

if (!String.prototype.toCamelCase) {
  String.prototype.toCamelCase = function includesPolyfill() {
    return this ? this.charAt(0).toUpperCase() + this.slice(1) : '';
  };
}

//Source:- https://stackoverflow.com/a/14853974
// Warn if overriding existing method
if (Array.prototype.equals)
  console.warn(
    "Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.",
  );
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function(array) {
  // if the other array is a falsy value, return
  if (!array) return false;

  // compare lengths - can save a lot of time
  if (this.length !== array.length) return false;

  for (var i = 0, l = this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i])) return false;
    } else if (this[i] !== array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
};
// Hide method from for-in loops
Object.defineProperty(Array.prototype, 'equals', { enumerable: false });

if (!String.prototype.includes) {
  String.prototype.includes = function includesPolyfill() {
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}

export default App;
