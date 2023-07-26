//source https://stackoverflow.com/a/38340730 point=> 5
export const removeBlankKeys = (obj) => {
  return Object.keys(obj)
    .filter((k) => obj[k] != null) // Remove undef. and null.
    .reduce(
      (newObj, k) =>
        typeof obj[k] === 'object'
          ? { ...newObj, [k]: removeBlankKeys(obj[k]) } // Recursive methods.
          : { ...newObj, [k]: obj[k] }, // Copy value.
      {},
    );
};
