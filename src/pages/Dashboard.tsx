import { makeStyles } from "@mui/styles";
import { Container} from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';
import Title from '../components/Title'

const useStyles = makeStyles({
  main: {
    display: "flex !important",
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
  },
});

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Container className={classes.main} maxWidth={"xl"}>
      <Title title={"Dashboard - Income/Outcome"} icon={<PaidIcon sx={{fontSize: 42}} htmlColor="green"/>} />
    </Container>
  )
}

export default Dashboard;