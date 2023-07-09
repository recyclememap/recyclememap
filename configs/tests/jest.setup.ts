import nock from 'nock';

global.beforeEach(() => {
  const apiMock = nock('http://127.0.0.1:3100');

  (global as any).apiMock = apiMock;
});

global.afterEach(() => {
  nock.cleanAll();
  jest.clearAllMocks();
});
