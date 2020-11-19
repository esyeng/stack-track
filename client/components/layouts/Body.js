import React from "react";
import { Grid, Paper, Typography, Box } from "@material-ui/core";

const style = {
  Paper: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    display: "flex",
    justifyContent: "flex-end",
    marginLeft: 100,
  },
  Typography: {
    width: 200,
    // marginRight: 100,
    // paddingLeft: 80,
    textAlign: "center",
    justifyContent: "space-evenly",
  },
};

export default props => {
  return (
    <Grid container>
      <Grid item sm={5}>
        <Paper style={style.Paper}>
          <Box textAlign="center">
            <Typography variant="h6">Statistics</Typography>
            <Typography paragraph style={style.Typography}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
              Risus at ultrices mi tempus imperdiet.
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item sm={4}>
        <Paper style={style.Paper}>
          <Box textAlign="center">
            <Typography variant="h6">Diagnostics</Typography>
            <Typography paragraph style={style.Typography}>
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
