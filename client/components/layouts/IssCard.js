import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    // minWidth: 80,
    // maxBlockSize: 160,
    fontSize: 10,
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
});

export default function (props) {
  const classes = useStyles();
  const { ticketNumber, description, category, status } = props;
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {ticketNumber}
        </Typography>
        <Typography className={classes.title}>{description}</Typography>
        <Typography className={classes.pos} color="textSecondary">
          {category}
        </Typography>
        <Typography variant="body2" component="p">
          {status}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Open</Button>
      </CardActions>
    </Card>
  );
}
