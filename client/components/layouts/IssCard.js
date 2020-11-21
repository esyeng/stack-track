import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { setSingleIssueCard, selectSingleIssueCard } from "../../store";
const html2json = require("html2json").html2json;

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

export function IssCard(props) {
  const classes = useStyles();
  const { issueId, ticketNumber, description, category, status } = props;

  const handleSelect = e => {
    // Pull raw attributes from which Issue Card is selected
    // Using HTML parsing module, extract supplied
    // attribute "issueId" as JSON property

    const parsedNode = html2json(e.target.outerHTML);
    const selected = parsedNode.child[0].attr.issueid;
    selectSingleIssueCard();
    setSingleIssueCard(selected);
    console.log(selected);
  };

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
        <Button issueid={issueId} onClick={handleSelect} size="small">
          <Typography issueid={issueId}>Open</Typography>
        </Button>
      </CardActions>
    </Card>
  );
}

const mapState = state => ({
  singleSelected: state.singleSelected,
  singleIssueId: state.singleIssueId,
});

const mapDispatch = dispatch => ({
  setSingleIssueCard: id => dispatch(setSingleIssueCard(id)),
  selectSingleIssueCard: () => dispatch(selectSingleIssueCard()),
});

export default connect(mapState, mapDispatch)(IssCard);
