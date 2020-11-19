import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IssCard from "./IssCard";

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
  // const issueArray = [props.projects[projects][id].issues];
  console.log(props);
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
          <div className={classes.container}>
            {issue
              ? issues.map((issue, idx) => {
                  return (
                    <IssCard
                      key={idx}
                      ticketNumber={issue.ticketNumber}
                      description={issue.description}
                      category={issue.category}
                      status={issue.status}
                      className={classes.card}
                    ></IssCard>
                  );
                })
              : null}
          </div>
        </CardContent>
        <CardActions>
          <Button onClick={handleShow} size="small">
            Collapse
          </Button>
          <Button onClick={showIssues} size="small">
            View Issues
          </Button>
          {issue ? (
            <Button onClick={showIssues} size="small">
              Hide
            </Button>
          ) : null}
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
