import { render, screen } from '@testing-library/react';
import { IconNames } from '@root/components';
import { Popper } from '../Popper';
import { StreetName } from './test-data';

describe('Popper visual', () => {
  it('renders a popper', async () => {
    render(<Popper icons={IconNames} street={StreetName} />);

    screen.getByText(StreetName);
    screen.getAllByRole('img');
  });
});
