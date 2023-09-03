import { render, screen } from '@testing-library/react';
import { Loader } from '../Loader';

describe('Loader visual', () => {
  it('renders loader', () => {
    render(<Loader />);

    screen.getByRole('progressbar');
  });
});
