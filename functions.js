const shorten = (arr, num) => {
  if (arr.length > num) {
    return arr.slice(0, num - 1) + ", ...";
  } else {
    return arr.join();
  }
};

export { shorten };
