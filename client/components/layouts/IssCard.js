import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchSingleProjectById } from "../../store";

const useStyles = makeStyles({
  root: {
    minWidth: 80,
    maxBlockSize: 160,
    fontSize: 10,
    flexDirection: "column",
  },
  gridBox: {
    overflow: "scroll",
  },
  gridContain: {
    width: 600,
    height: "270px",
    overflow: "scroll",
    scrollBehavior: "smooth",
  },
  gridItem: {
    width: "25%",
  },

  action: {
    flexDirection: "column",
  },
});

export function IssCard(props) {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const {
    issueId,
    ticketNumber,
    summary,
    description,
    category,
    status,
    projectId,
    projects,
  } = props;

  useEffect(() => {
    const { fetchSingleProjectById, singleproject } = props;
    const check = async () => {
      await fetchSingleProjectById(projectId);
      setTitle(singleproject.title);
    };
    check();
  }, []);

  return (
    <Card className={classes.root}>
      <CardContent className={classes.gridBox}>
        <Grid container className={classes.gridContain}>
          <Grid item className={classes.gridItem}>
            <Typography variant="h6" color="secondary">
              {title}
            </Typography>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Issue No. {ticketNumber}
            </Typography>
          </Grid>
          <Grid item className={classes.desc}>
            <Typography className={classes.title}>{summary}</Typography>
          </Grid>
          <Grid item className={classes.desc}>
            <Typography className={classes.title}>
              Description: {description}
            </Typography>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Typography className={classes.pos} color="textSecondary">
              Type: {category}
            </Typography>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Typography variant="body2" component="p">
              Status: {status}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.action}>
        <Link to={`/issues/${issueId}`}>
          <Button issueid={issueId} size="small" variant="outlined">
            <Typography issueid={issueId}>Open</Typography>
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

const mapState = state => ({
  user: JSON.parse(localStorage.user),
  singleproject: state.singleproject,
});

const mapDispatch = dispatch => ({
  fetchSingleProjectById: id => dispatch(fetchSingleProjectById(id)),
});

export default connect(mapState, mapDispatch)(IssCard);
