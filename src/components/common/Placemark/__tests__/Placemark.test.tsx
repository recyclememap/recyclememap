import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconNames } from '@root/components';
import { Placemark } from '../Placemark';
import { StreetName } from './test-data';

describe('Placemark logic', () => {
  it('shows Popper when hovering the mouse over the Placemark', async () => {
    render(<Placemark icons={IconNames} street={StreetName} />);

    await userEvent.hover(screen.getByTestId(Placemark.name));

    await screen.findByRole('tooltip');
  });

  it('does not show Popper by default', async () => {
    render(<Placemark icons={IconNames} street={StreetName} />);

    expect(screen.queryByText(StreetName)).toBeNull();
  });
});
