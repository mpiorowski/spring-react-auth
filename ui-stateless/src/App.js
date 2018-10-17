import React, { Component } from 'react';
import './App.css';
import FormComponent from './FormComponents/FormComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">

          <FormComponent></FormComponent>

        </header>
      </div>
    );
  }
}

export default App;
