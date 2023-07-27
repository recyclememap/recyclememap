import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreContext, RootStore } from '@store/index';
import { app } from './app.css';
import { theme } from './theme';

interface IApp {
  store: RootStore;
}

const HomePage = lazy(() => import('@views/HomePage/HomePage'));

function App({ store }: IApp) {
  return (
    <StoreContext.Provider value={store}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<div>Loading...</div>}>
          <div className={app}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
              </Routes>
            </BrowserRouter>
          </div>
        </Suspense>
      </MUIThemeProvider>
    </StoreContext.Provider>
  );
}

export default App;
