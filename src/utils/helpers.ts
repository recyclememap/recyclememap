import { AxiosResponse } from 'axios';

// Dummy function to catch errors
export const noop = (): void => {};

export const extractResponse = async (request: Promise<AxiosResponse>) => {
  return await request.then((res) => res.data);
};

export const debounce = (fn: (...args: any[]) => any, ms = 300) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
};
