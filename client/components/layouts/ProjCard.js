import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IssCard from "./IssCard";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    // minWidth: 80,
    // maxBlockSize: 160,
    display: "flex",
    fontSize: 10,
  },
  container: {
    maxBlockSize: 50,
  },
  title: {
    // fontSize: 12,
    // width: 1200,
  },
  pos: {
    // marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    justifyContent: "right",
    flexWrap: "wrap-reverse",
    flexBasis: 12,
    flexGrow: 1,
  },
  gridBox: {
    overflow: "scroll",
    width: "100%",
    height: "300px",
    backgroundColor: "white",
  },
  button: {
    borderWidth: "4px",
    borderColor: "black",
    width: "125px",
  },
});

export default function (props) {
  const classes = useStyles();
  const {
    id,
    title,
    description,
    category,
    dateCreated,
    status,
    issues,
  } = props;

  const [show, setShowing] = useState(false);
  const [issue, setIssues] = useState(false);
  const handleShow = () => {
    if (!show) {
      setShowing(true);
    } else if (show) {
      setShowing(false);
    }
  };

  const showIssues = () => {
    if (!issue) {
      setIssues(true);
    } else if (issue) {
      setIssues(false);
    }
  };

  if (show) {
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {`${id}:${title}`}
          </Typography>
          <Typography className={classes.title}>{description}</Typography>
          <Typography className={classes.pos} color="textSecondary">
            {category}
          </Typography>
          <Typography variant="body2" component="p">
            {status}
          </Typography>
          <Typography variant="body2" component="p">
            {dateCreated}
          </Typography>
          {issue ? (
            <Grid container className={classes.gridBox}>
              {issues.map((issue, idx) => {
                return (
                  <IssCard
                    key={idx}
                    issueId={issue.id}
                    ticketNumber={issue.ticketNumber}
                    description={issue.description}
                    category={issue.category}
                    status={issue.status}
                    className={classes.card}
                  ></IssCard>
                );
              })}
            </Grid>
          ) : null}
        </CardContent>
        <CardActions>
          <Button className={classes.button} onClick={handleShow} size="small">
            Collapse
          </Button>
          <Button className={classes.button} onClick={showIssues} size="small">
            {issue ? `Hide` : `View Issues`}
          </Button>
        </CardActions>
      </Card>
    );
  } else {
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {`${id}:${title}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleShow} size="small">
            Expand
          </Button>
        </CardActions>
      </Card>
    );
  }
}
