import { render, screen } from '@testing-library/react';
import { IconNames } from '@components/Icon';
import { Popper } from '../Popper';
import { StreetName, AnchorEl } from './test-data';

describe('Popper visual', () => {
  it('renders a popper', async () => {
    render(
      <Popper
        open={true}
        icons={IconNames}
        street={StreetName}
        anchorEl={AnchorEl}
      />
    );

    screen.getByRole('tooltip');
    screen.getByText(StreetName);
    screen.getAllByRole('img');
  });
});
