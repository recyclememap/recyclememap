import { render, screen } from '@testing-library/react';
import { MobileMarker } from '../MobileMarker';
import { MOBILE_MARKER_TEST_ID } from './test-data';

describe('MobileMarker visual', () => {
  it('renders correct elements', async () => {
    render(<MobileMarker />);

    screen.getByTestId(MOBILE_MARKER_TEST_ID);
  });
});
