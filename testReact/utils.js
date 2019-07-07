export const waitFor = milliseconds =>
  new Promise(resolve => {
    setTimeout(() => resolve(), milliseconds);
  });
