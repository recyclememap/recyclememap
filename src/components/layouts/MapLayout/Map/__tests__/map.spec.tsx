import { screen } from '@testing-library/react';
import { createStore, renderWithLeaflet } from '@utils/tests/helpers';
import { Map } from '../Map';
import { MapElements } from './test-data';

describe('Map visual', () => {
  it('renders correct elements', async () => {
    renderWithLeaflet(createStore(), <Map />);

    screen.getByTitle(MapElements.ZoomOut);
    screen.getByTitle(MapElements.ZoomIn);
  });
});
