'use strict';

const e = React.createElement;

class startButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { started: false };
  }

  render() {
    if (this.state.started) {
      return 'Game is starting';
    }

    return e(
      'button',
      { onClick: () => this.setState({ started: true }) },
      'Waiting for game launch....'
    );
  }
}

const domContainer = document.querySelector('#start_button_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(startButton));