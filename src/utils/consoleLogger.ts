// Global Byte Console Logger Singleton
let globalLog: ((msg: string, type?: string) => void) = () => {};

export function setGlobalByteConsoleLogger(fn: typeof globalLog) {
  globalLog = fn;
}

export function byteConsoleLog(msg: string, type: string = "muted") {
  if (typeof globalLog === "function") globalLog(msg, type);
}
