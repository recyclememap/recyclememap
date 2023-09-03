import { render, screen } from '@testing-library/react';
import { LoadingContainer } from '../LoadingContainer';
import { ChildElement, CHILD_ELEMENT_TEST_ID } from './test-data';

describe('LoadingContainer logic', () => {
  it('shows loader if isLoading="true"', async () => {
    render(
      <LoadingContainer isLoading={true}>{ChildElement}</LoadingContainer>
    );

    screen.getByRole('progressbar');
    expect(screen.queryByTestId(CHILD_ELEMENT_TEST_ID)).toBeNull();
  });

  it('shows child element if isLoading="false"', async () => {
    render(
      <LoadingContainer isLoading={false}>{ChildElement}</LoadingContainer>
    );

    screen.getByTestId(CHILD_ELEMENT_TEST_ID);
    expect(screen.queryByRole('progressbar')).toBeNull();
  });
});
