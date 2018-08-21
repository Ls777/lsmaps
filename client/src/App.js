import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  state = {
    data: null
  }

  componentDidMount() {
    console.log("wtff1")
    this.callBackendAPI()
      .then(res => this.setState({data: res.express}))
      .catch(err => console.log(err))
  }

  callBackendAPI = async () => {
    console.log("wtf")
    try {
      const response = await axios('/express_backend');
      console.log(response)
      return response.data;
    } catch (e) {
      console.error(e);

      /*if (response.status !== 200) {
        throw Error(body.message)
      }*/
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.data}
        </p>
      </div>
    );
  }
}

export default App;
