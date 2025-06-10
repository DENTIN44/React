// Import necessary React components
// import StatusUpdate from './components/StatusUpdate'; // Component for status update
// import First from './components/First';
// import Second from './components/Second';           
// import Third from './components/Third';            
// import Fourth from './components/Fourth';         
// import HelloReact from './components/HelloReact';   
// import NewApp from './NewApp.jsx';                 
import './App.css';                                // Import CSS for styling
import './css/style.css';                                // Import CSS for styling
// import { DemoForm, DemoFormTwo, DemoFormThree, DemoFormFour, DemoFormFive, DemoFormSix } from './components/ControlledComponent';



// /**
//  * Main App component (Class-based)
//  * 
//  * This class-based component manages the visibility of a calculator and renders various
//  * other components. It contains a button to toggle the visibility of the calculator
//  * and displays several other components like `StatusUpdate`, `First`, `Second`, `Third`, 
//  * `Fourth`, `NewApp`, and `HelloReact`.
//  */
// class App extends Component {
//   // Initial state setup for managing visibility of the calculator
//   constructor(props) {
//     super(props);
//     this.state = {
//       showCalculator: true, // State to toggle the visibility of the calculator
//     };
//   }

//   /**
//    * Method to toggle the visibility of the calculator
//    * This method updates the `showCalculator` state to the opposite of its current value.
//    */
//   toggleCalculator = () => {
//     this.setState((prevState) => ({
//       showCalculator: !prevState.showCalculator,
//     }));
//   };

//   /**
//  * Main App component (Class-based)
//  * 
//  * This class-based component manages the visibility of a calculator and renders various
//  * other components. It contains a button to toggle the visibility of the calculator
//  * and displays several other components like `StatusUpdate`, `First`, `Second`, `Third`, 
//  * `Fourth`, `NewApp`, and `HelloReact`.
//  */
// // class App extends Component {
// //   // Initial state setup for managing visibility of the calculator
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       showCalculator: true, // State to toggle the visibility of the calculator
// //     };
// //   }

//   /**
//    * Method to toggle the visibility of the calculator
//    * This method updates the `showCalculator` state to the opposite of its current value.
//    */
//   // toggleCalculator = () => {
//   //   this.setState((prevState) => ({
//   //     showCalculator: !prevState.showCalculator,
//   //   }));
//   // };

//   render() {
//     return (
//       <div className="App">
//         {/* App Header */}
//         <header className="App-header">
//           <h1>React App</h1>

//           {/* Toggle button to show/hide the calculator */}
//           <button 
//             onClick={this.toggleCalculator} 
//             style={{ marginBottom: '20px', padding: '10px' }}
//           >
//             {this.state.showCalculator ? 'Hide' : 'Show'} {/* Button text changes based on the state */}
//           </button>

//           {/* Display Status Update Component */}
//           <StatusUpdate />

//           {/* Render the other components */}
//           <First />
//           <br/><br/><br/><br/>
//           <Second />
//           <br/><br/><br/><br/>
//           <Third />
//           <br/><br/><br/><br/>
//           <Fourth />
//           <br/><br/><br/><br/>
//           <NewApp />
//           <br/><br/><br/><br/>
//           <HelloReact />
//           <br/><br/><br/><br/>
//           <DemoForm />
//           <br/><br/><br/><br/>
//           <DemoFormTwo />
//           <br/><br/><br/><br/>
//           <DemoFormThree />
//           <br/><br/><br/><br/>
//           <DemoFormFour />
//           <br/><br/><br/><br/>
//           <DemoFormFive />
//           <br/><br/><br/><br/>
//           <DemoFormFive />
//           <br/><br/><br/><br/>
//           <DemoFormFive />
//           <br/><br/><br/><br/>
//           <DemoFormSix />
//         </header>
//       </div>
//     );
//   }
// }
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const duration = 500;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: ['Blockchain', 'ReactJS', 'TypeScript', 'JavaTpoint'] };
    this.nodeRefs = this.state.items.map(() => React.createRef());
  }

  handleAdd = () => {
    const newItem = prompt('Enter Item Name');
    if (newItem) {
      this.setState(state => {
        this.nodeRefs.push(React.createRef());
        return { items: [...state.items, newItem] };
      });
    }
  };

  handleRemove = i => {
    this.setState(state => {
      this.nodeRefs.splice(i, 1);
      const newItems = state.items.slice();
      newItems.splice(i, 1);
      return { items: newItems };
    });
  };

  render() {
    return (
      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">Animated Item List</h1>
          <button className="btn btn-primary" onClick={this.handleAdd}>
            + Add New Item
          </button>
        </div>

        <TransitionGroup className="list-group">
          {this.state.items.map((item, i) => (
            <CSSTransition
              key={`${item}-${i}`}  // Better unique key
              timeout={duration}
              nodeRef={this.nodeRefs[i]}
              classNames="example"
            >
              {(state) => (
                <div
                  ref={this.nodeRefs[i]}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={{
                    transitionDelay: state === 'entering' ? `${i * 100}ms` : '0ms',
                  }}
                >
                  {item}
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => this.handleRemove(i)}
                    aria-label={`Remove ${item}`}
                  >
                    &times;
                  </button>
                </div>
              )}
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  }
}

export default App;



