import { screen } from '@testing-library/react';
import { createStore, renderWithLeaflet } from '@utils/tests/helpers';
import { Placemark } from '../Placemark';
import { Marker, PlacemarkId } from './test-data';

describe('Placemark visual', () => {
  it('renders a placemark', async () => {
    renderWithLeaflet(createStore(), <Placemark marker={Marker} />);

    screen.getByTestId(PlacemarkId);
  });
});
