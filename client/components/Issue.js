import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Header, Menu, Card } from "./layouts";
import {
  Grid,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/Styles";
import { fetchIssues } from "../store";

// const style = {
//   //   Paper: { padding: 10, marginTop: 10, marginBottom: 10 },
//   //   Typography: {
//   //     // width: 100,
//   //     marginRight: 100,
//   //     paddingLeft: 60,
//   //     textAlign: "center",
//   //   },
//   //   root: {
//   //     width: 80,
//   //     color: "green",
//   //   },
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     height: 140,
//     width: 100,
//   },
//   control: {
//     padding: theme.spacing(2),
//   },
// };

const classes = {
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {},
};

class Issue extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    console.log(this.props);
    const { fetchIssues } = this.props;
    fetchIssues();
  }

  render() {
    const classes = {
      root: {
        flexGrow: 1,
        width: 400,
        margin: 20,
      },
      paper: {
        flexDirection: "row",
        // flexBasis: 8,
        alignItems: "center",
      },
      control: {},
    };
    const { issues } = this.props;
    console.log(this.props);
    return (
      <div>
        <Header />
        <Menu />
        <Grid container justify="center" spacing={1}>
          <Grid container item xs={7}>
            <Grid
              container
              spacing={5}
              direction="column"
              justify="flex-end"
              alignItems="center"
            >
              {issues.length
                ? issues.map((item, idx) => (
                    <Grid
                      key={idx}
                      container
                      item
                      alignContent="center"
                      justify="center"
                      display="flex"
                    >
                      <Paper style={classes.paper}>
                        <Card
                          ticketNumber={item.ticketNumber}
                          description={item.description}
                          category={item.category}
                          status={item.status}
                        ></Card>
                      </Paper>
                    </Grid>
                  ))
                : null}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: JSON.parse(localStorage.user),
    issues: state.issues,
  };
};

const mapDispatch = dispatch => {
  return { fetchIssues: () => dispatch(fetchIssues()) };
};

export default connect(mapState, mapDispatch)(Issue);
