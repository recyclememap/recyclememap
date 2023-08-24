import { render, screen } from '@testing-library/react';
import { IconNames, flatIconsKeys } from '@components/Icon';
import { Marker } from '../Marker';

describe('Marker visual', () => {
  const testIcons: flatIconsKeys[] = [];

  it.each(IconNames)('renders a marker for %# icons', async () => {
    testIcons.push(IconNames.pop() as flatIconsKeys);

    render(<Marker icons={testIcons as flatIconsKeys[]} />);

    screen.getByTestId(Marker.name);
  });
});
