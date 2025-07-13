import { Component, type JSX } from 'react';

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

type ResultsListProps = {
  data: {
    results?: Character[];
  };
};

class ResultsList extends Component<ResultsListProps> {
  render(): JSX.Element {
    return (
      <ul className="mx-auto mt-6 flex w-full max-w-md flex-col gap-4">
        {this.props.data.results?.map((item) => (
          <li
            key={item.id}
            className="flex flex-col items-center gap-4 rounded-2xl border border-indigo-100 bg-white/90 p-4 shadow-sm transition hover:shadow-md md:flex-row md:items-center"
          >
            <div className="flex flex-1 flex-col items-center gap-1 md:items-start">
              <h2 className="text-lg font-semibold text-gray-900">
                {item.name}
              </h2>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-indigo-500">Status:</span>{' '}
                {item.status}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-indigo-500">Species:</span>{' '}
                {item.species}
              </p>
            </div>

            <img
              src={item.image}
              alt={item.name}
              className="h-24 w-24 rounded-xl border border-gray-200 object-cover"
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default ResultsList;
