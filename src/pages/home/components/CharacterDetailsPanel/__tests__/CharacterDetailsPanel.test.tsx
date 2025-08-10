import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CharacterDetailsPanel } from '../CharacterDetailsPanel';

const { mockedUseLoaderData, mockedUseNavigate } = vi.hoisted(() => ({
  mockedUseLoaderData: vi.fn(),
  mockedUseNavigate: vi.fn(),
}));

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useLoaderData: mockedUseLoaderData,
    useNavigate: mockedUseNavigate,
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Character's details tests", () => {
  test('renders nothing if character is null', () => {
    mockedUseLoaderData.mockReturnValue(null);

    const { container } = render(<CharacterDetailsPanel />);

    expect(container.firstChild).toBeNull();
  });

  test('renders all character details', () => {
    mockedUseLoaderData.mockReturnValue({
      image: 'rick.png',
      name: 'Rick Sanchez',
      species: 'Human',
      gender: 'Male',
      status: 'Alive',
      location: { name: 'Earth' },
    });
    mockedUseNavigate.mockReturnValue(vi.fn());

    const { getByText, getByAltText } = render(<CharacterDetailsPanel />);

    expect(getByText('Rick Sanchez')).toBeInTheDocument();
    expect(getByAltText('Rick Sanchez')).toHaveAttribute('src', 'rick.png');
    expect(getByText('Human')).toBeInTheDocument();
    expect(getByText('Male')).toBeInTheDocument();
    expect(getByText('Alive')).toBeInTheDocument();
    expect(getByText('Earth')).toBeInTheDocument();
    expect(getByText('Species:')).toBeInTheDocument();
    expect(getByText('Gender:')).toBeInTheDocument();
    expect(getByText('Status:')).toBeInTheDocument();
    expect(getByText('Last known location:')).toBeInTheDocument();
  });

  test('navigates when close button is clicked', async () => {
    const user = userEvent.setup();
    mockedUseLoaderData.mockReturnValue({
      image: 'morty.png',
      name: 'Morty Smith',
      species: 'Human',
      gender: 'Male',
      status: 'Alive',
      location: { name: 'Earth' },
    });
    const navigate = vi.fn();
    mockedUseNavigate.mockReturnValue(navigate);

    const { getByRole } = render(<CharacterDetailsPanel />);

    const closeBtn = getByRole('button', { name: /close panel/i });
    await user.click(closeBtn);

    expect(navigate).toHaveBeenCalledWith('/');
  });

  test('navigates when overlay is clicked', async () => {
    const user = userEvent.setup();
    mockedUseLoaderData.mockReturnValue({
      image: 'morty.png',
      name: 'Morty Smith',
      species: 'Human',
      gender: 'Male',
      status: 'Alive',
      location: { name: 'Earth' },
    });
    const navigate = vi.fn();
    mockedUseNavigate.mockReturnValue(navigate);

    const { getByRole, getByLabelText, getByText } = render(
      <CharacterDetailsPanel />
    );

    const overlay =
      getByRole('dialog', { hidden: true }) ||
      getByLabelText(/modal/i) ||
      getByText('Morty Smith').closest('div[aria-modal]');
    await user.click(overlay);

    expect(navigate).toHaveBeenCalledWith('/');
  });

  test('does not navigate when clicking inside the panel', async () => {
    const user = userEvent.setup();
    mockedUseLoaderData.mockReturnValue({
      image: 'morty.png',
      name: 'Morty Smith',
      species: 'Human',
      gender: 'Male',
      status: 'Alive',
      location: { name: 'Earth' },
    });
    const navigate = vi.fn();
    mockedUseNavigate.mockReturnValue(navigate);

    const { getByRole, getByText } = render(<CharacterDetailsPanel />);

    const aside =
      getByRole('complementary') || getByText('Morty Smith').closest('aside');
    if (aside) {
      await user.click(aside);
    }

    expect(navigate).not.toHaveBeenCalled();
  });
});
