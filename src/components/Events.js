import React, { useState, Component } from 'react';

/**
 * Functional component
 * @returns {JSX.Element}
 */
const AppEventFunction = () => {
  /**
   * State variable to store the app name
   */
  const [appName, setAppName] = useState('');

  /**
   * Event handler to update the app name state
   * @param {ChangeEvent<HTMLInputElement>} event
   */
  const changeText = (event) => {
    setAppName(event.target.value);
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-6 col-sm-8">
          <h2 className="mb-3">Simple Event Demo</h2>
          <div className="mb-3">
            <label htmlFor="appName" className="form-label">Enter App name:</label>
            <input
              type="text"
              id="appName"
              className="form-control"
              onChange={changeText}
            />
          </div>
          <h3>You entered: <span className="text-primary">{appName}</span></h3>
        </div>
      </div>
    </div>
  );
};

/**
 * Class-based component
 */
class AppEventClass extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      appName: '',
    };
  }

  /**
   * Event handler to update the app name state
   * @param {ChangeEvent<HTMLInputElement>} event
   */
  changeText = (event) => {
    this.setState({ appName: event.target.value });
  };

  /**
   * Render method
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6 col-sm-8">
            <h2 className="mb-3">Simple Event Demo</h2>
            <div className="mb-3">
              <label htmlFor="appName" className="form-label">Enter App name:</label>
              <input
                type="text"
                id="appName"
                className="form-control"
                onChange={this.changeText}
              />
            </div>
            <h3>You entered: <span className="text-primary">{this.state.appName}</span></h3>
          </div>
        </div>
      </div>
    );
  }
}

// Export both components
export { AppEventClass, AppEventFunction };
