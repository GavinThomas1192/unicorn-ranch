import React from "react";
import firebase from "firebase";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";

import Icon from "material-ui/Icon";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      loading: false,
      userUID: ""
    };
  }

  onLoginPress = () => {
    this.setState({ error: "", loading: true });

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(response => {
        this.setState({ userUID: response.uid }, function() {
          this.props.updateHome(this.state.userUID);
        });
        // console.log("LOGGED IN", response);
      })
      .catch(err => console.log(err));
  };

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form id="form" noValidate autoComplete="on">
          <TextField
            id="email"
            label="Email"
            placeholder="helloworld@test.com"
            onChange={this.handleInputChange("email")}
            margin="normal"
            error={this.state.errors}
            value={this.state.email}
          />
          <br />
          <TextField
            id="password"
            label="password"
            type="password"
            placeholder="What's up?"
            onChange={this.handleInputChange("password")}
            margin="normal"
            error={this.state.errors}
            value={this.state.password}
          />
          <br />

          <Button onClick={this.onLoginPress} raised color="primary">
            <Icon>send</Icon>
          </Button>
        </form>
      </div>
    );
  }
}
