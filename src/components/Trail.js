import React from "react";
import firebase from "firebase";
import { withStyles } from "material-ui/styles";

import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Collapse from "material-ui/transitions/Collapse";

import Icon from "material-ui/Icon";

import InboxIcon from "material-ui-icons/MoveToInbox";
import DraftsIcon from "material-ui-icons/Drafts";
import SendIcon from "material-ui-icons/Send";
import ExpandLess from "material-ui-icons/ExpandLess";
import ExpandMore from "material-ui-icons/ExpandMore";
import StarBorder from "material-ui-icons/StarBorder";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});
export default class Trail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trailData: []
    };
  }
  componentDidMount() {
    //take data, filter by location and return to specific list.
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ trailData: nextProps.trailData });
  }

  changeLocation = (unicornName, location) => {
    // console.log("TRIGGERED CHANGE LOCATION", unicornName, location);
    let unicornData;
    firebase
      .database()
      .ref(this.props.userUID + "/unicornData")
      .once("value")
      .then(function(snapshot) {
        unicornData = snapshot.val();
        // console.log("got this unicornData", unicornData);
      })
      .then(() => {
        unicornData.map(ele => {
          {
            ele.name === unicornName.name
              ? (ele.location = location)
              : undefined;
          }
        });
      })
      .then(() => {
        firebase
          .database()
          .ref(this.props.userUID)
          .set({ unicornData });
      });
  };

  render() {
    return (
      <div className="border">
        <h1>________TRAIL________</h1>
        {this.state.trailData.length > 0 ? (
          this.state.trailData.map((ele, index) => {
            return (
              <div key={index}>
                <h2>Name:</h2>
                <h4 className="descriptions">{ele.name}</h4>
                <h2>Color:</h2>
                <h4 className="descriptions">{ele.color}</h4>
                <List>
                  <ListItem
                    button
                    onClick={() => this.setState({ open: !this.state.open })}
                  >
                    {/* <ListItemIcon>Move Location</ListItemIcon> */}
                    <ListItemText inset primary="Move Location" />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem
                        onClick={() => this.changeLocation(ele, "Barn")}
                        button
                      >
                        <ListItemText inset primary="Barn" />
                      </ListItem>
                      <ListItem
                        onClick={() => this.changeLocation(ele, "Pasture")}
                        button
                      >
                        <ListItemText inset primary="Pasture" />
                      </ListItem>
                    </List>
                  </Collapse>
                </List>
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
