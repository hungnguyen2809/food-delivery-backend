export const logger = {
  log: (...msg: any) => {
    console.log(`INFO: `, ...msg);
  },
  error: (...msg: any) => {
    console.log(`ERROR: `, ...msg);
  },
  warn: (...msg: any) => {
    console.log(`WARN: `, ...msg);
  },
};
