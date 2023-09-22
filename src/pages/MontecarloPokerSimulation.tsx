import { makeStyles } from "@mui/styles";
import { Box, Button, CircularProgress, Container, Divider, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import Title from "../components/Title";
import BasicCard from "../components/MontecarloPokerSimulation/BasicCard";
import { useEffect, useState } from "react";
import { EvaluationHand, GameCards, HandHistory, MontecarloPokerSimulationSettings } from "../models/types";
import { fetchDrawCards, fetchMontecarloEvaluation, fetchMontecarloLast5Hands, fetchShuffleDeck } from "../services/APIService";
import Alert from "../components/Alert";
import classnames from "classnames";
import PokerTable from "../components/MontecarloPokerSimulation/PokerTable";
import PlayingCard from "../components/MontecarloPokerSimulation/PlayingCard";


const useStyles = makeStyles({
  main: {
    display: "flex !important",
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
  },
  box: {
    display: "flex",
    width: "70%",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  divider: {
    borderWidth: "3px !important",
    width: "63%",
    borderRadius: "50px !important",
  },
  boxButton:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    minHeight: 150,
    minWidth: 150,
  },
  logo: {
    maxWidth: 150,
  },
  backCards: {
    maxWidth: 150,
  },
  boxSettingsInfo: {
    display: "flex",
    flexDirection: "column"
  },
  containerTable:{
    display: "flex !important",
    flexDirection: "column",
    alignItems: "center",
    gap: 50,
    marginBottom: 50,
  },
  table: {
    width: "max-content !important",
    margin: "auto",
  },
  rowCards: {
    display: "flex !important",
    flexDirection: "row",
  },
  resultText:{
    fontWeight: "bold",
    "&.red":{
      color: "red"
    },
    "&.grey":{
      color: "grey"
    },
    "&.green":{
      color: "green"
    }
  },
  spinner: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 1001,

  }
});

const MontecarloPokerSimulation = () => {
  const classes = useStyles();

  const [settings, setSettings] = useState<MontecarloPokerSimulationSettings>({nPlayers: 1, nSamples: 10000, flop: true, turn: true, river: true});
  const [gameCards, setGameCards] = useState<GameCards | undefined>();
  const [lastHands, setLastHands] = useState<HandHistory[]>([]);
  const [evaluation, setEvaluation] = useState<EvaluationHand | undefined>(undefined);
  const [responseLoading, setResponseLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const handleClick = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const setMontecarloPokerSimulationSettings = (settings: MontecarloPokerSimulationSettings) => {
    setSettings(settings);
  }

  const getDrawCards = () => {
    setResponseLoading(true);
    setTimeout(() => {
      fetchDrawCards(settings.nPlayers, settings.flop, settings.turn, settings.river)
        .then((res) => {
          setGameCards(res.body);
          setResponseLoading(false);
        })
    }, 2500)
  }

  const shuffleDeck = () => {
    fetchShuffleDeck()
      .then((res) => {
        setOpenAlert(true);
        setGameCards(undefined);
        setEvaluation(undefined);
        setLastHands([]);
      })
  }

  const evaluateHand = () => {
    if(gameCards){
      setResponseLoading(true);
      fetchMontecarloEvaluation(gameCards, settings.nSamples)
        .then((res) => {
          setEvaluation(res.body)
          setResponseLoading(false);
        })
    }
  }

  const getLast5Hands = () => {
    setResponseLoading(true);
    fetchMontecarloLast5Hands()
      .then((res) => {
        setLastHands(res.body);
        setResponseLoading(false);
      })
  }

  return (
    <Container className={classes.main} maxWidth={"xl"}>
      <Title title={"Montecarlo - Poker Simulation"} icon={<img alt="Poker Logo" src={require("../assets/images/pokerLogo.jpg")} className={classes.logo}/>} />
      <BasicCard setSettings={setMontecarloPokerSimulationSettings}/>
      <Box className={classes.box}>
        <Box className={classes.boxSettingsInfo}>
          <Typography sx={{ fontSize: 18, margin: 0 }} color="text.secondary" gutterBottom>
            N° Samples: <b>{settings.nSamples}</b>
          </Typography>
          <Typography sx={{ fontSize: 18, margin: 0 }} color="text.secondary" gutterBottom>
            N° Players: <b>{settings.nPlayers}</b>
          </Typography>
          <Typography sx={{ fontSize: 18, margin: 0 }} color="text.secondary" gutterBottom>
            Table: <b>{!settings.flop && !settings.turn && !settings.river ? "Table Random"
              : settings.river ? "Flop, Turn, River" : settings.turn ? "Flop, Turn" : "Flop"}</b>
          </Typography>
        </Box>
        <Box className={classes.boxButton}>
          <Button onClick={() => getDrawCards()} variant="contained" component="label">
            Draw Cards
          </Button>
          <Button disabled={gameCards === undefined || gameCards === null} onClick={() => evaluateHand()} variant="contained" component="label">
            Evaluate Hand
          </Button>
          <Button onClick={() => shuffleDeck()} variant="outlined" component="label">
            Shuffle Deck
          </Button>
          <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
              Deck shuffled correctly!
            </Alert>
          </Snackbar>
        </Box>
        <Box className={classes.boxButton}>
          {evaluation && 
            <Box>
              <Typography sx={{ fontSize: 21, margin: 0 }} color="text.secondary" gutterBottom>
                Result:
              </Typography>
              <Typography sx={{ fontSize: 18, margin: 0 }} color="text.secondary" gutterBottom>
                <span className={classnames(classes.resultText, "green")}>Win: <b>{evaluation.win}%</b></span><br/>
                <span className={classnames(classes.resultText, "grey")}>Spare: <b>{evaluation.spare}%</b></span><br/>
                <span className={classnames(classes.resultText, "red")}>Lose: <b>{evaluation.lose}%</b></span>
              </Typography>
            </Box>
          }
        </Box>
      </Box>
      {responseLoading && 
        <CircularProgress className={classes.spinner}/>
      }
      <Container className={classes.containerTable}>
        <PokerTable gameCards={gameCards} />
      </Container>
      <Divider className={classes.divider}/>
      <Container className={classes.containerTable}>
        <Button onClick={() => getLast5Hands()} variant="contained" component="label" style={{width: "fit-content"}}>
          Show All Hands
        </Button>
        {lastHands.length > 0 && 
          <TableContainer component={Paper} className={classes.table}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID Hand</TableCell>
                  <TableCell align="right">Win</TableCell>
                  <TableCell align="right">Spare</TableCell>
                  <TableCell align="right">Score</TableCell>
                  <TableCell align="right">N° Samples</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lastHands.map((row, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" className={classes.rowCards}>{row.id}</TableCell>
                    <TableCell className={classnames(classes.resultText, "green")} align="right">{row.win}</TableCell>
                    <TableCell className={classnames(classes.resultText, "gray")} align="right">{row.spare}</TableCell>
                    <TableCell className={classnames(classes.resultText, "red")} align="right">{row.lose}</TableCell>
                    <TableCell component="th" scope="row" className={classes.rowCards}>{row.samples}</TableCell>
                    {/* <TableCell component="th" scope="row" className={classes.rowCards}>
                      {row..map((card, index) => (
                        <PlayingCard suit={card.suit} ranking={card.ranking} key={index}/>
                      ))}
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
      </Container>
    </Container>
  )
}

export default MontecarloPokerSimulation;