import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {/*FriendsManager*/ ListTwo} from './components/MyList';
import reportWebVitals from './reportWebVitals';
import FormikForm from './components/FormikForm';
import { BasicRefExample, InputFocusWithRef, RefWithForwardedComponent, CallbackRefExample, CustomTextInput,   UseRefExample} from './components/Refs';  // Correct for named exports
import { AppEventFunction, AppEventClass } from './components/Events';
import "bootstrap/dist/css/bootstrap.min.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <FormikForm />
    <AppEventClass />
    <AppEventFunction />    
    {/* <FriendsManager /> */}
    <ListTwo />
    <BasicRefExample />
    <InputFocusWithRef />
    <RefWithForwardedComponent />
    <CallbackRefExample />
    <CustomTextInput />
    <UseRefExample />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
