import React, { Component } from "react";
import firebase from "firebase";
import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import Icon from "material-ui/Icon";
import unicornData from "./unicornData";
let history = createBrowserHistory();
var config = {
  apiKey: "AIzaSyAux8IdevXbbBYC2UqZSZKbVbaCQiAZB0I",
  authDomain: "unicorn-ranch.firebaseapp.com",
  databaseURL: "https://unicorn-ranch.firebaseio.com",
  projectId: "unicorn-ranch",
  storageBucket: "",
  messagingSenderId: "907604437320"
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userUID: "",
      unicornDataFromDB: ""
    };
  }

  componentDidMount() {
    firebase.initializeApp(config);
  }

  componentWillReceiveProps(nextProps) {
    // console.log("before data fetch", this.state);
  }

  // TO BROOK: USED THIS ONCE TO SEED DATABASE
  // componentDidUpdate() {
  //   firebase
  //     .database()
  //     .ref(this.state.userUID)
  //     .set({ unicornData });
  // }

  updateHome = incomingUID => {
    this.setState({ userUID: incomingUID });
  };

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route
            path="/"
            component={() =>
              this.state.userUID !== "" ? (
                <Dashboard userUID={this.state.userUID} />
              ) : (
                <Login updateHome={this.updateHome} />
              )
            }
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
