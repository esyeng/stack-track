import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Header, Menu, Card } from "./layouts";
import { Grid, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/Styles";
import { fetchIssues } from "../store";

const classes = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  paper: {
    height: 120,
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
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
      },
      paper: {
        flexDirection: "row",
        alignItems: "center",
      },
      control: {},
      content: {
        flexDirection: "row",
      },
      textField: {
        marginLeft: 200,
        marginRight: 10,
        marginTop: 15,
      },
    };
    const { issues } = this.props;
    console.log(this.props);
    return (
      <div>
        <Header />
        <Menu />
        <form style={classes.textField} noValidate autoComplete="off">
          <TextField
            id="outlined-full-width"
            label="Search"
            style={{ margin: 8 }}
            placeholder="Ticket Number, Desc, etc."
            helperText="Find tickets by filter"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </form>
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
                ? issues.map((item, idx) => {
                    if (idx === 0) {
                      return null;
                    } else
                      return (
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
                      );
                  })
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
