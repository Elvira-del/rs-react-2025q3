import { Component, type JSX } from 'react';

class Loader extends Component {
  render(): JSX.Element {
    return (
      <div className="flex w-full flex-col items-center justify-center py-10">
        <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-indigo-400 border-t-transparent shadow-md"></div>
        <span className="text-base font-medium tracking-wide text-indigo-500">
          Loading...
        </span>
      </div>
    );
  }
}

export default Loader;
