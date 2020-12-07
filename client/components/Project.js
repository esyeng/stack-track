import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchProjects } from "../store";
import { Header, Menu, ProjCard, Footer } from "./layouts";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "scroll",
    zIndex: 1,
  },
  paper: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    spacing: 1,
    opacity: "80%",
  },
  box: {
    justifyContent: "center",
  },
  textField: {
    marginLeft: 160,
    marginRight: 20,
    marginTop: 15,
    marginBottom: 25,
  },
  heading: {
    fontFamily: "Arial Black, Gadget, sans-serif",
    color: "#e3dadd",
    fontSize: 36,
    paddingLeft: 40,
    flex: 2,
  },
});

function Project(props) {
  const classes = useStyles();
  const { projects, user } = props;
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const { fetchProjects } = props;
    const awaitProjects = async () => {
      await fetchProjects(`${user.teamId}`).then(() => {
        setloading(false);
      });
    };
    awaitProjects();
  }, []);

  return (
    <div className="content">
      <Header />
      <div className="box">
        <Menu></Menu>
        <Typography className={classes.heading}>
          {`${projects.name}'s projects`}
        </Typography>
        <Grid
          container
          justify="center"
          spacing={8}
          style={{ marginTop: 80, justifyContent: "center" }}
        >
          <Grid container item xs={7}>
            <Grid
              container
              spacing={5}
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              {loading ? (
                <Typography>...Loading</Typography>
              ) : projects.length ? (
                projects.map(project => {
                  return (
                    <Grid
                      key={project.id}
                      container
                      item
                      alignContent="center"
                      justify="center"
                    >
                      <Paper className={classes.Paper}>
                        <ProjCard
                          id={project.id}
                          title={project.title}
                          description={project.description}
                          category={project.category}
                          dateCreated={project.dateCreated}
                          status={project.status}
                          issues={project.issues}
                        ></ProjCard>
                      </Paper>
                    </Grid>
                  );
                })
              ) : null}
            </Grid>
          </Grid>
        </Grid>
        <Footer />
      </div>
    </div>
  );
}

const mapState = state => ({
  user: JSON.parse(localStorage.user),
  projects: state.projects,
});

const mapDispatch = dispatch => ({
  fetchProjects: () =>
    dispatch(fetchProjects(`${JSON.parse(localStorage.user).teamId}`)),
});

export default connect(mapState, mapDispatch)(Project);
