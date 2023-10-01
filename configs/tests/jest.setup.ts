import { TextEncoder } from 'util';
import nock from 'nock';
import '@testing-library/jest-dom';

global.TextEncoder = TextEncoder;

global.beforeEach(() => {
  const apiMock = nock('http://127.0.0.1:3100/api');

  apiMock.defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  });

  (global as any).apiMock = apiMock;
});

global.afterEach(() => {
  nock.cleanAll();
  jest.clearAllMocks();
});
