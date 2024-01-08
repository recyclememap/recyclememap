import { screen } from '@testing-library/react';
import { createStore, renderWithStore } from '@utils/tests/helpers';
import NotFoundPage from '../NotFoundPage';
import { TextElements } from './test-data';

describe('NotFoundPage visual', () => {
  it('renders correct elements', async () => {
    renderWithStore(createStore(), <NotFoundPage />);

    screen.getByText(TextElements.Status);
    screen.getByText(TextElements.Message);
    screen.getByText(TextElements.GoHomeButton);
  });
});
