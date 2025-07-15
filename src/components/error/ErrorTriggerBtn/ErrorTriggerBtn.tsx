import { Component, type JSX } from 'react';

type ErrorTriggerBtnProps = {
  onTrigger: () => void;
};

class ErrorTriggerBtn extends Component<ErrorTriggerBtnProps> {
  render(): JSX.Element {
    return (
      <button
        className="rounded-xl border border-red-200 bg-white/90 px-4 py-2 font-medium text-red-500 shadow-sm transition hover:border-red-300 hover:bg-red-50 focus:ring-2 focus:ring-red-200 focus:outline-none active:bg-red-100"
        type="button"
        onClick={this.props.onTrigger}
      >
        Simulate Error
      </button>
    );
  }
}

export default ErrorTriggerBtn;
