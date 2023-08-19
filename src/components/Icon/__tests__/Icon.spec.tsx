import { render, screen } from '@testing-library/react';
import { IconNames } from '../FlatIcons';
import { Icon } from '../Icon';

describe('Icon visual', () => {
  it.each(IconNames)('renders %s icon', async (iconName) => {
    render(<Icon name={iconName} />);

    screen.getByRole('img');
  });
});
