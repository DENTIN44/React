import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18+
import App from './App'; // Adjust path if App.js is elsewhere
import './index.css';
// import {/*FriendsManager*/ ListTwo} from './components/MyList';
import reportWebVitals from './reportWebVitals';
// import FormikForm from './components/FormikForm';
// import { BasicRefExample, InputFocusWithRef, RefWithForwardedComponent, CallbackRefExample, CustomTextInput,   UseRefExample} from './components/Refs';  // Correct for named exports
// import { AppEventFunction, AppEventClass } from './components/Events';
import "bootstrap/dist/css/bootstrap.min.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       { <App />}
    {/* <FormikForm />
    <AppEventClass />
    <AppEventFunction />    
    <FriendsManager />
    <ListTwo />
    <BasicRefExample />
    <InputFocusWithRef />
    <RefWithForwardedComponent />
    <CallbackRefExample />
    <CustomTextInput />
    <UseRefExample />  */}
  </React.StrictMode>
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// src/index.js
// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   NavLink,
//   Navigate
// } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import About from './components/About';
// import Contacts from './components/Contacts';
// import NotFound from './components/NotFound';

// const Home = () => <h2>Welcome to Home Page</h2>;

// const App = () => (
//   <Router>
//     <div>
//       <h1>React Router Example</h1>
//       <ul>
//         <li>
//           <NavLink
//             to="/"
//             end
//             style={({ isActive }) => ({ color: isActive ? 'pink' : 'black' })}
//           >
//             Home
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/about"
//             style={({ isActive }) => ({ color: isActive ? 'blue' : 'black' })}
//           >
//             About
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/contact"
//             style={({ isActive }) => ({ color: isActive ? 'cyan' : 'black' })}
//           >
//             Contact
//           </NavLink>
//         </li>
//       </ul>

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact/*" element={<Contacts />} />
//         <Route path="/home" element={<Navigate to="/" replace />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </div>
//   </Router>
// );

// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<App />);