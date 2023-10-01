import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconNames } from '@root/components';
import { createStore, renderWithLeaflet } from '@utils/tests/helpers';
import { Placemark } from '../Placemark';
import { StreetName, PlacemarkId, MOCK_POSITION } from './test-data';

describe('Placemark logic', () => {
  it('shows Popper on the Placemark click', async () => {
    renderWithLeaflet(
      createStore(),
      <Placemark
        position={MOCK_POSITION}
        icons={IconNames}
        street={StreetName}
      />
    );

    await userEvent.click(screen.getByTestId(PlacemarkId));

    await screen.findByText(StreetName);
  });
});
