import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Loader, Snackbar } from '@root/components';
import { StoreContext, RootStore } from '@root/store';
import { theme } from './theme';

interface IApp {
  store: RootStore;
}

const HomePage = lazy(() => import('@views/HomePage/HomePage'));
const NotFoundPage = lazy(() => import('@views/NotFoundPage/NotFoundPage'));

function App({ store }: IApp) {
  return (
    <StoreContext.Provider value={store}>
      <MUIThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Snackbar />
          <Suspense fallback={<Loader />}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </Suspense>
        </ThemeProvider>
      </MUIThemeProvider>
    </StoreContext.Provider>
  );
}

export default App;
