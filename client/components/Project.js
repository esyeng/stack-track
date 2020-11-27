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
    overflow: "hidden",
  },
  paper: {
    flexDirection: "row",
    alignItems: "center",
    width: 30,
    spacing: 1,
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
  heading: {
    fontFamily: "Arial Black, Gadget, sans-serif",
    color: "#e3dadd",
    fontSize: 48,
  },
});

function Project(props) {
  const classes = useStyles();
  const { projects, user } = props;
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const { fetchProjects } = props;
    fetchProjects(`${user.teamId}`).then(() => {
      setloading(false);
    });
  }, []);
  console.log(props);
  return (
    <div>
      <Header />
      <Menu />
      <div style={{ textAlign: "center", fontSize: 36, paddingLeft: 50 }}>
        <Typography className={classes.heading}>
          {/* {`${projects[0].name}'s projects`} */}
        </Typography>
        <Grid container justify="center" spacing={1}>
          <Grid container item xs={7}>
            <Grid
              container
              spacing={5}
              direction="column"
              justify="flex-end"
              alignItems="center"
            >
              {projects.projects.length
                ? projects.projects.map((project, idx) => {
                    if (idx === 0) {
                      return null;
                    } else
                      return (
                        <Grid
                          key={project.id}
                          container
                          item
                          alignContent="center"
                          justify="center"
                          display="flex"
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
                : null}
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
