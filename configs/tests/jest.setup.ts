import nock from 'nock';
import '@testing-library/jest-dom';

global.beforeEach(() => {
  const apiMock = nock('http://127.0.0.1:3100');

  (global as any).apiMock = apiMock;
});

global.afterEach(() => {
  nock.cleanAll();
  jest.clearAllMocks();
});
