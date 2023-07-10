import { render, screen } from '@testing-library/react';
import { Map } from './Map';
import { MapElements } from './test-data';

describe('Map visual', () => {
  it('renders correct elements', async () => {
    render(<Map />);

    screen.getByTitle(MapElements.ZoomOut);
    screen.getByTitle(MapElements.ZoomIn);
  });
});
