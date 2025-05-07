import React, { Component, useRef  } from 'react';

/**
 * BasicRefExample
 * Demonstrates how to use React.createRef to access and manipulate a DOM element directly.
 * Enhanced to allow users to change the background color dynamically through an input field.
 */
class BasicRefExample extends Component {
  constructor(props) {
    super(props);

    // Ref to directly access the <div> element
    this.divRef = React.createRef();

    // Local component state to track the chosen color
    this.state = {
      color: 'black' // Default color applied on mount
    };
  }

  /**
   * componentDidMount
   * Called once the component is mounted. Applies the initial background color using the ref.
   */
  componentDidMount() {
    this.updateDivColor();
    console.log('Accessed DOM node:', this.divRef.current);
  }

  /**
   * updateDivColor
   * Uses the ref to apply the current color from the state to the <div>'s background.
   */
  updateDivColor = () => {
    if (this.divRef.current) {
      this.divRef.current.style.backgroundColor = this.state.color;
    }
  };

  /**
   * handleColorChange
   * Called when the user selects a new color. Updates the state and applies the new color via ref.
   * @param {Event} e - The change event from the input element
   */
  handleColorChange = (e) => {
    const newColor = e.target.value;
    this.setState({ color: newColor }, this.updateDivColor);
  };

  render() {
    // Styling for the clickable colored div
    const divStyle = {
      display: 'inline-block',
      padding: '10px 20px',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      textAlign: 'center',
      fontSize: '16px',
      userSelect: 'none'
    };

    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        {/* Ref-controlled div with dynamic background color */}
        <div ref={this.divRef} style={divStyle}>
          Background color: {this.state.color}
        </div>

        {/* Color input to choose a new background color */}
        <div style={{ marginTop: '1rem' }}>
          <label>
            Choose a background color:{' '}
            <input
              type="color"
              value={this.state.color}
              onChange={this.handleColorChange}
              style={{ cursor: 'pointer' }}
            />
          </label>
        </div>
      </div>
    );
  }
}

/**
 * InputFocusWithRef
 * Demonstrates focusing an input element by using a ref and a button.
 */
class InputFocusWithRef extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  focusInput = () => {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
        <input type="text" ref={this.inputRef} />
        <input type="button" value="Focus input" onClick={this.focusInput} />
      </div>
    );
  }
}

/**
 * ForwardedInput
 * A functional input component that forwards its ref to the internal input element.
 */
const ForwardedInput = React.forwardRef((props, ref) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', margin: '2rem' }}>
    <input type="text" ref={ref} />
    <input type="button" value="Focus input" onClick={() => ref.current?.focus()} />
  </div>
));

/**
 * RefWithForwardedComponent
 * Uses a forwarded ref to control an input from a parent class component.
 */
class RefWithForwardedComponent extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  focusInput() {
    this.inputRef.current.focus();
  }

  render() {
    return <ForwardedInput ref={this.inputRef} />;
  }
}

/**
 * CallbackRefExample
 * Demonstrates how to use a callback ref instead of React.createRef.
 */
class CallbackRefExample extends Component {
  constructor(props) {
    super(props);
    this.inputElement = null;
  }

  setInputRef = (element) => {
    this.inputElement = element;
  }

  focusInput = () => {
    if (this.inputElement) {
      this.inputElement.focus();
    }
  }

  componentDidMount() {
    this.focusInput();
  }

  render() {
    return (
      <div style={{ margin: '2rem' }}>
        <h2 style={{ textAlign: 'center' }}>Callback Refs Demo</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
          <input type="text" ref={this.setInputRef} />
          <input type="button" value="Focus input" onClick={this.focusInput} />
        </div>
      </div>
    );
  }
}

/**
 * TextInput
 * A functional component with forwarded ref, used inside a form.
 */
const TextInput = React.forwardRef((props, ref) => (
  <input type="text" placeholder="Hello World" ref={ref} />
));

/**
 * CustomTextInput
 * Demonstrates submitting an input value accessed via ref.
 * This is an example of an uncontrolled component using React.createRef.
 */
class CustomTextInput extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.inputRef.current) {
      console.log('Submitted value:', this.inputRef.current.value);
      alert(`You submitted: ${this.inputRef.current.value}`);
    }
  };

  render() {
    return (
      <div style={{ margin: '2rem', textAlign: 'center' }}>
        <form onSubmit={this.handleSubmit}>
          <TextInput ref={this.inputRef} />
          <button type="submit" style={{ marginLeft: '1rem' }}>Submit</button>
        </form>
      </div>
    );
  }
}

/**
 * UseRefExample
 * Demonstrates how to use the `useRef` hook in a functional component.
 * Focuses the input field when the button is clicked.
 */
function UseRefExample() {
  // Create a ref to the input DOM element
  const inputRef = useRef(null);

  /**
   * onButtonClick
   * Focuses the input field when the button is clicked.
   */
  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Common style used in other examples for visual consistency
  const sharedStyle = {
    padding: '10px 20px',
    fontSize: '16px',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', margin: '2rem' }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Click the button to focus me"
        style={sharedStyle}
      />
      <button onClick={onButtonClick} style={sharedStyle}>
        Focus Input
      </button>
    </div>
  );
}

// Export all components with clear names
export {
  BasicRefExample,
  InputFocusWithRef,
  RefWithForwardedComponent,
  CallbackRefExample,
  CustomTextInput,
  UseRefExample
};
