import React from "react";
import { Grid, Paper, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  Paper: {
    padding: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  gridLayout: {
    paddingLeft: 150,
    justifyContent: "center",
  },
  Typography: {
    width: 200,
    // marginRight: 100,
    // paddingLeft: 80,
    textAlign: "center",
    justifyContent: "space-evenly",
  },
});

export default props => {
  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.gridLayout}>
      <Grid item sm={5}>
        <Paper className={classes.Paper}>
          <Box textAlign="center">
            <Typography variant="h6">Statistics</Typography>
            <Typography paragraph className={classes.Typography}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
              Risus at ultrices mi tempus imperdiet.
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item sm={4}>
        <Paper className={classes.Paper}>
          <Box textAlign="center">
            <Typography variant="h6">Diagnostics</Typography>
            <Typography paragraph className={classes.Typography}>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
              ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
              elementum integer enim neque volutpat ac tincidunt.
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
