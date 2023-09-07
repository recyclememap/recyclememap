import { render, screen } from '@testing-library/react';
import { LoadingModal } from '../LoadingModal';
import { ChildElement, CHILD_ELEMENT_TEST_ID } from './test-data';

describe('LoadingModal logic', () => {
  it('shows a loader if isLoading="true"', async () => {
    render(<LoadingModal isLoading={true}>{ChildElement}</LoadingModal>);

    screen.getByRole('progressbar');
    expect(screen.queryByTestId(CHILD_ELEMENT_TEST_ID)).toBeNull();
  });

  it('shows child element if isLoading="false"', async () => {
    render(<LoadingModal isLoading={false}>{ChildElement}</LoadingModal>);

    screen.getByTestId(CHILD_ELEMENT_TEST_ID);
    expect(screen.queryByRole('progressbar')).toBeNull();
  });
});
