import { makeStyles } from "@mui/styles";
import { Box, Container, Divider} from "@mui/material";
import AssessmentIcon from '@mui/icons-material/Assessment';

const useStyles = makeStyles({
  main: {
    display: "flex !important",
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
  },
  titleBox: {
    display: "flex",
    alignItems: "center",
    gap: 20
  },
  divider: {
    borderWidth: "3px !important",
    width: "50%",
    borderRadius: "50px !important",
  },
});

const MovieReport = () => {
  const classes = useStyles();

  return (
    <Container className={classes.main} maxWidth={"xl"}>
      <Box className={classes.titleBox}>
        <AssessmentIcon sx={{fontSize: 42}} htmlColor="orange"/>
        <h1>Movie Report</h1>
      </Box>
      <Divider className={classes.divider}/>
    </Container>
  )
}

export default MovieReport;