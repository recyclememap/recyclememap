import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreContext, RootStore } from '@root/store';
import { app } from './app.css';

interface IApp {
  store: RootStore;
}

const HomePage = lazy(() => import('@views/HomePage/HomePage'));

function App({ store }: IApp) {
  return (
    <StoreContext.Provider value={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <div className={app}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </Suspense>
    </StoreContext.Provider>
  );
}

export default App;
