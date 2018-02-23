import React from "react";
// import data or const
import Barn from "./Barn";

import Trail from "./Trail";

import Pasture from "./Pasture";

import unicornData from "../unicornData";
import firebase from "firebase";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barnData: [],
      trailData: [],
      pastureData: [],
      unicornDataFromDB: "",
      userUID: ""
    };
  }
  componentDidMount() {
    let adminData;
    firebase
      .database()
      .ref(this.props.userUID)
      .once("value")
      .then(function(snapshot) {
        adminData = snapshot.val();
        console.log("got this adminData", adminData);
      })
      .then(() => {
        this.setState({ unicornDataFromDB: adminData.unicornData }, function() {
          console.log("success, got data from db", this.state);
        });
      })
      .then(() => {
        this.setState({
          barnData: this.state.unicornDataFromDB.filter(ele => {
            return ele.location === "Barn";
          })
        });
        this.setState({
          trailData: this.state.unicornDataFromDB.filter(ele => {
            return ele.location === "Trail";
          })
        });
        this.setState({
          pastureData: this.state.unicornDataFromDB.filter(ele => {
            return ele.location === "Pasture";
          })
        });
      })
      .catch(err => console.log(err));

    //take data, filter by location and return to specific list.

    // console.log("Results", this.state.barnData);
  }

  componentDidUpdate() {
    console.log("updated", this.state);
  }

  updateHome = incomingUID => {
    this.setState({ userUID: incomingUID });
  };

  render() {
    return (
      <div>
        <h1>Hello from Dashboard.</h1>
        <Barn barnData={this.state.barnData} />
        <Trail trailData={this.state.trailData} />
        <Pasture pastureData={this.state.pastureData} />
      </div>
    );
  }
}
