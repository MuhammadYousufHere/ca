export const sleep = (time: number = 1500) =>
  new Promise((res) => setTimeout(res, time))
