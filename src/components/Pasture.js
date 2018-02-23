import React from "react";
// import data or const
export default class Pasture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pastureData: []
    };
  }

  componentDidMount() {
    //take data, filter by location and return to specific list.
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ pastureData: nextProps.pastureData });
  }
  render() {
    return (
      <div>
        <h1>PASTURE</h1>
        {this.state.pastureData.length > 0 ? (
          this.state.pastureData.map(ele => {
            return (
              <div>
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
