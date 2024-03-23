import { RenderResult, render } from '@testing-library/react';
import { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Snackbar } from '@root/components';
import { StoreContext, IRootStore, RootStore } from '@root/store';

export const createStore = (): IRootStore => {
  return new RootStore();
};

export const renderWithStore = (
  store: IRootStore,
  component: ReactElement,
  showSnackbar = true
): RenderResult => {
  const componentToRender = (
    <>
      {showSnackbar && <Snackbar />}
      {component}
    </>
  );
  return render(
    <StoreContext.Provider value={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={componentToRender} />
        </Routes>
      </BrowserRouter>
    </StoreContext.Provider>
  );
};

export const fireResize = (width: number) => {
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
};

export const MockBreakpoints = {
  desktop: 1200,
  mobile: 600
};
