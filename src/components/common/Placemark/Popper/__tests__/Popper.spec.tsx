import { render, screen } from '@testing-library/react';
import { IconNames } from '@root/components';
import { Popper } from '../Popper';
import { AddressName } from './test-data';

describe('Popper visual', () => {
  it('renders a popper', async () => {
    render(<Popper icons={IconNames} address={AddressName} />);

    screen.getByText(AddressName);
    screen.getAllByRole('img');
  });
});
