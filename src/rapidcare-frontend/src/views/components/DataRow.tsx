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
