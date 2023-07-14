import { makeStyles } from "@mui/styles";
import { Box, Button, Container, Divider} from "@mui/material";
import FunctionsIcon from '@mui/icons-material/Functions';
import Title from "../components/Title";

const useStyles = makeStyles({
  main: {
    display: "flex !important",
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
  },
});

const MonteCarloEstimation = () => {
  const classes = useStyles();

  return (
    <Container className={classes.main} maxWidth={"xl"}>
      <Title title={"Monte Carlo Simulation"} icon={<FunctionsIcon sx={{fontSize: 42}} htmlColor="red"/>} />
      <Button>Draw cards</Button>
    </Container>
  )
}

export default MonteCarloEstimation;