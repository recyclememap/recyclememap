import { render, screen } from '@testing-library/react';
import { Icon } from '../Icon';
import { IconNames } from './test-data';

describe('Icon visual', () => {
  it.each(IconNames)('renders %s icon', async (iconName) => {
    render(<Icon name={iconName} />);

    screen.getByRole('img');
  });
});
