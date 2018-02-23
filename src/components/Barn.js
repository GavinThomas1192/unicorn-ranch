import React from "react";
// import data or const
export default class Barn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barnData: []
    };
  }
  // componentDidMount() {
  //   console.log("props from barn", this.props);
  // }

  componentDidUpdate() {
    console.log("update from barn", this.state);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ barnData: nextProps.barnData });
  }

  changeLocation = unicornName => {
    let unicornData;
    firebase
      .database()
      .ref(this.props.userUID + "/unicornData")
      .once("value")
      .then(function(snapshot) {
        unicornData = snapshot.val();
        console.log("got this unicornData", unicornData);
      })
      .then(() => {
        unicornData.map(ele => {
          {
            ele.name === unicornName ? (ele.name = unicornName) : undefined;
          }
        });
      })
      .then(() => {
        firebase
          .database()
          .ref(this.props.userUID + "/unicornData")
          .set({ unicornData });
      });
  };

  render() {
    return (
      <div>
        <h1>BARN</h1>
        {this.state.barnData.length > 0 ? (
          this.state.barnData.map((ele, index) => {
            return (
              <div onClick={ele => this.changeLocation(ele.name)} key={index}>
                <h2>Name:</h2>
                <h4>{ele.name}</h4>
                <h2>Color:</h2>
                <h4>{ele.color}</h4>
              </div>
            );
          })
        ) : (
          <h2>No data yet.</h2>
        )}
      </div>
    );
  }
}
