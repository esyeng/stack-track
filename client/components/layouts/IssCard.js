import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 80,
    maxBlockSize: 160,
    fontSize: 10,
    flexDirection: "column",
  },
  bullet: {
    // display: "inline-block",
    // margin: "0 2px",
    // transform: "scale(0.8)",
  },
  title: {
    // fontSize: 12,
    // width: 1200,
  },
  pos: {
    // marginBottom: 12,
  },
  gridBox: {
    overflow: "scroll",
  },
  gridContain: {
    width: "500px",
    height: "270px",
    scrollBehavior: "smooth",
    overflow: "scroll",
    backgroundColor: "white",
  },
  gridItem: {
    width: "25%",
    backgroundColor: "white",
  },
  desc: {
    width: "50%",
    backgroundColor: "white",
  },
  action: {
    flexDirection: "column",
  },
});

export default function (props) {
  const classes = useStyles();
  const { ticketNumber, description, category, status } = props;
  return (
    <Card className={classes.root}>
      <CardContent className={classes.gridBox}>
        <Grid container className={classes.gridContain}>
          <Grid item className={classes.gridItem}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {ticketNumber}
            </Typography>
          </Grid>
          <Grid item className={classes.desc}>
            <Typography className={classes.title}>{description}</Typography>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Typography className={classes.pos} color="textSecondary">
              {category}
            </Typography>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Typography variant="body2" component="p">
              {status}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.action}>
        <Button size="small">Open</Button>
      </CardActions>
    </Card>
  );
}
