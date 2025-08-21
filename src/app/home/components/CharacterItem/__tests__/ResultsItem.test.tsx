import { createRoutesStub } from 'react-router';
import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { ResultsItem } from '../ResultsItem';

describe("Result's item tests", () => {
  test('handles missing props gracefully', () => {
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: () => <ResultsItem character={undefined} />,
      },
    ]);

    const { queryByTestId } = render(<Stub />);

    const resultsItem = queryByTestId('character-item');
    expect(resultsItem).not.toBeInTheDocument();
  });
});
