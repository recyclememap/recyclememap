import { render, screen } from '@testing-library/react';
import { IconNames } from '@components/Icon';
import { Placemark } from '../Placemark';
import { StreetName } from './test-data';

describe('Placemark visual', () => {
  it('renders a placemark', async () => {
    render(<Placemark icons={IconNames} street={StreetName} />);

    screen.getByTestId(Placemark.name);
  });
});
