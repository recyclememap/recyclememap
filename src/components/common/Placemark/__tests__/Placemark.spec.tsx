import { screen } from '@testing-library/react';
import { IconNames } from '@root/components';
import { createStore, renderWithLeaflet } from '@utils/tests/helpers';
import { Placemark } from '../Placemark';
import { MOCK_POSITION, AddressName, PlacemarkId } from './test-data';

describe('Placemark visual', () => {
  it('renders a placemark', async () => {
    renderWithLeaflet(
      createStore(),
      <Placemark
        position={MOCK_POSITION}
        icons={IconNames}
        address={AddressName}
      />
    );

    screen.getByTestId(PlacemarkId);
  });
});
