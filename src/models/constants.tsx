import FunctionsIcon from '@mui/icons-material/Functions';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { Field, GameCards, Ranking, Suit } from './types';
import ObjectDetection from '../pages/ObjectDetection';
import MovieReport from '../pages/MovieReport';
import AppRecommandation from '../pages/AppRecommandation';
import Dashboard from '../pages/Dashboard';
import MontecarloPokerSimulation from '../pages/MontecarloPokerSimulation';

export const pages : Field[] = [{
    topic: "AI & ML",
    icon: <PsychologyIcon fontSize={"large"} htmlColor="#36aacf"/>,
    pages: [{
      name: "Object Detection Service",
      index: 0,
      view: <ObjectDetection />,
      active: true,
    }],
  },{
    topic: "Statistics",
    icon: <AssessmentIcon fontSize="large" htmlColor="orange"/>,
    pages: [{
      name: "Movie Report",
      index: 1,
      view: <MovieReport />,
      active: false
    },{
      name: "Play Store App Recommendation",
      index: 2,
      view: <AppRecommandation />,
      active: false
    },{
      name: "Dashboard - Income/Outcome",
      index: 3,
      view: <Dashboard />,
      active: true
    }]
  },{
    topic: "Maths",
    icon: <FunctionsIcon fontSize="large" htmlColor="red" />,
    pages: [{
      name: "Montecarlo - Poker Simulation",
      index: 4,
      view: <MontecarloPokerSimulation />,
      active: true
    }]
}]

export const nSamples = [
  {
    value: 1000,
    label: '1.000',
  },
  {
    value: 5000,
    label: '5.000',
  },
  {
    value: 10000,
    label: '10.000',
  },
  {
    value: 20000,
    label: '20.000',
  },
  {
    value: 50000,
    label: '50.000',
  },
];

export const nPlayers = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 6,
    label: '6',
  },
  {
    value: 7,
    label: '7',
  },
  {
    value: 8,
    label: '8',
  },
];



export const AllSuits : Suit[] = [{
  value: 1,
  label: "H"
},{
  value: 2,
  label: "D"
},{
  value: 3,
  label: "C"
},{
  value: 4,
  label: "S"
}]

export const AllRankings : Ranking[] = [{
  value: 13,
  label: "A"
},{
  value: 12,
  label: "K"
},{
  value: 11,
  label: "Q"
},{
  value: 10,
  label: "J"
},{
  value: 9,
  label: "10"
},{
  value: 8,
  label: "9"
},{
  value: 7,
  label: "8"
},{
  value: 6,
  label: "7"
},{
  value: 5,
  label: "6"
},{
  value: 4,
  label: "5"
},{
  value: 3,
  label: "4"
},{
  value: 2,
  label: "3"
},{
  value: 1,
  label: "2"
}]

export const gameCardsRequest: GameCards = {
  tableCards: {
    cards: [
        {
            suit: {
                value: 1,
                label: "H"
            },
            ranking: {
                value: 2,
                label: "3"
            }
        },
        {
            suit: {
                value: 1,
                label: "S"
            },
            ranking: {
                value: 2,
                label: "3"
            }
        },
        {
            suit: {
                value: 1,
                label: "H"
            },
            ranking: {
                value: 2,
                label: "3"
            }
        },
        {
          suit: {
                    value: 1,
                    label: "C"
                },
                ranking: {
                    value: 3,
                    label: "4"
                }
    
        },
        {
          suit: {
              value: 1,
              label: "H"
          },
          ranking: {
              value: 3,
              label: "4"
          }

  }
    ],
  },
  mainPlayerCards: {
    cards: [
        {
            suit: {
                value: 2,
                label: "S"
            },
            ranking: {
                value: 3,
                label: "4"
            }
        },
        {
            suit: {
                value: 1,
                label: "C"
            },
            ranking: {
                value: 13,
                label: "A"
            }
        }
    ]
  },
  otherPlayerCards: [
    {
      cards: [
        {
            suit: {
                value: 3,
                label: "D"
            },
            ranking: {
                value: 13,
                label: "A"
            }
        },
        {
          suit: {
              value: 3,
              label: "D"
          },
          ranking: {
              value: 12,
              label: "K"
          }
        }
      ]
    }
  ],
}