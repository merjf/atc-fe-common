import { makeStyles } from "@mui/styles";
import { Container } from "@mui/material";
import Header from './components/Header'
import ObjectDetection from './pages/ObjectDetection'
import MovieReport from './pages/MovieReport'
import AppRecommandation from './pages/AppRecommandation'
import { theme } from './utils/Utils';
import MontecarloPokerSimulation from "./pages/MontecarloPokerSimulation";
import Dashboard from "./pages/Dashboard"
import Footer from "./components/Footer";
import { CurrentPage } from './utils/context';
import { useState } from "react";

const useStyles = makeStyles({
  main: {
    fontFamily: "Arial",
    marginTop: 0,
    marginBottom: 100,
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

  const [currentPage, setCurrentPage] = useState(4);

  const handleClick = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const getCurrentPage = (page:number) => {
    switch(page){
      case 0:
        return <ObjectDetection />;
      case 1:
        return <MovieReport />;
      case 2:
        return <AppRecommandation />;
      case 3:
        return <Dashboard />;
      case 4:
        return <MontecarloPokerSimulation />;
    }
  }
  
  return (
    <div className="App">
      <Header onChangePage={handleClick}/>
      <Container maxWidth={"xl"} className={classes.main}>
        {getCurrentPage(currentPage)}
      </Container>
      <Footer />
    </div>
  );
}

export default App;
