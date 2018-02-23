import React from "react";
// import data or const
import Barn from "./Barn";

import Trail from "./Trail";

import Pasture from "./Pasture";

import unicornData from "../unicornData";
import firebase from "firebase";
let changedData = "";
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barnData: [],
      trailData: [],
      pastureData: [],
      unicornDataFromDB: "",
      userUID: "",
      loading: false
    };
  }
  componentDidMount() {
    let adminData;
    // let changedData = "";
    //Listen for database read write changes to update view FOR ONLY THE ONE
    firebase
      .database()
      .ref(this.props.userUID + "/unicornData")
      .on("child_changed", snapshot => {
        changedData = snapshot.val();
        {
          changedData.name !== null ? this.updateData() : undefined;
        }

        // console.log(
        //   "The updated unicorn is " + changedData.name,
        //   changedData.location,
        //   changedData.color
        // );
      });

    // get initial data

    firebase
      .database()
      .ref(this.props.userUID)
      .once("value")
      .then(function(snapshot) {
        adminData = snapshot.val();
        // console.log("got this adminData", adminData);
      })
      .then(() => {
        this.setState({ unicornDataFromDB: adminData.unicornData }, function() {
          // console.log("success, got data from db", this.state);
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
  }

  componentDidUpdate() {
    // console.log("updated", this.state);
  }

  updateHome = incomingUID => {
    this.setState({ userUID: incomingUID });
  };

  updateData = () => {
    // Here we are removing and adding. A direct lookup option would be better, firebase makes this hard
    if (changedData.location === "Barn") {
      this.setState({ barnData: [...this.state.barnData, changedData] }, () => {
        this.setState({
          pastureData: this.state.pastureData.filter(ele => {
            return ele.name !== changedData.name;
          })
        });
        this.setState({
          trailData: this.state.trailData.filter(ele => {
            return ele.name !== changedData.name;
          })
        });
      });
    }

    if (changedData.location === "Pasture") {
      this.setState(
        { pastureData: [...this.state.pastureData, changedData] },
        () => {
          this.setState({
            barnData: this.state.barnData.filter(ele => {
              return ele.name !== changedData.name;
            })
          });
          this.setState({
            trailData: this.state.trailData.filter(ele => {
              return ele.name !== changedData.name;
            })
          });
        }
      );
    }

    if (changedData.location === "Trail") {
      this.setState(
        { trailData: [...this.state.trailData, changedData] },
        () => {
          this.setState({
            barnData: this.state.barnData.filter(ele => {
              return ele.name !== changedData.name;
            })
          });
          this.setState({
            pastureData: this.state.pastureData.filter(ele => {
              return ele.name !== changedData.name;
            })
          });
        }
      );
    }
  };

  render() {
    return (
      <div>
        <h1>Hello from Dashboard.</h1>
        <Barn barnData={this.state.barnData} userUID={this.props.userUID} />
        <Trail trailData={this.state.trailData} userUID={this.props.userUID} />
        <Pasture
          pastureData={this.state.pastureData}
          userUID={this.props.userUID}
        />
      </div>
    );
  }
}
