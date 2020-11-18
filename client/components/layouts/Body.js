import React from "react";
import { Grid, Paper, Typography, Box } from "@material-ui/core";

const style = {
  Paper: { padding: 10, marginTop: 10, marginBottom: 10 },
};

export default props => {
  return (
    <Grid container>
      <Grid item sm>
        <Paper style={style.Paper}>
          <Box textAlign="right">
            <Typography variant="h6">Statistics</Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item sm>
        <Paper style={style.Paper}>
          <Box textAlign="right">
            <Typography variant="h6">Diagnostics</Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
