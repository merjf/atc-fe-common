import { makeStyles } from "@mui/styles";
import { Container } from "@mui/material";
import Header from './components/Header'
import CarDetection from './pages/CarDetection'
import MusicRecommandation from './pages/MusicRecommandation'
import AppRecommandation from './pages/AppRecommandation'
import { theme } from './utils/Utils';
import MonteCarloEstimation from "./pages/MonteCarloEstimation";
import { useSelector } from "react-redux";
import { currentState } from "./models/types";

const useStyles = makeStyles({
  main: {
    marginTop: 100,
    marginBottom: 100,
    paddingLeft: "240px !important",
    "& > nav": {
      marginBottom: 50
    }
  },
});

interface SubsetTab{
  id: number,
  label: string
}

function App() {
  const classes = useStyles(theme);

  const getCurrentPage = () => {
    const x = 0;
    switch(x){
      case 0:
        return <CarDetection />;
      // case 1:
      //   return <MusicRecommandation />;
      // case 2:
      //   return <AppRecommandation />;
      // case 3:
      //   return <MonteCarloEstimation />;
    }
  }
  
  return (
    <div className="App">
      <Header />
      <Container maxWidth={"xl"} className={classes.main}>
        {getCurrentPage()}
      </Container>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
