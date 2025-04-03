/**
 * Author: Inreet Kaur
 * Last Modified: March 7th
 * Purpose: Component for displaying lists, etc...
 */

// https://mui.com/material-ui/material-icons/
// https://mui.com/material-ui/

import { Typography, Grid } from "@mui/material";

const DataRow = ({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) => (
  <>
    <Grid item xs={6}>
      <Typography variant="body2">{label}</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body2">{value || "N/A"}</Typography>
    </Grid>
  </>
);

export default DataRow;
