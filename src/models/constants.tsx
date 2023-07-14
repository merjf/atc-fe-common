import FunctionsIcon from '@mui/icons-material/Functions';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { Field } from './types';
import ObjectDetection from '../pages/ObjectDetection';
import MovieReport from '../pages/MovieReport';
import AppRecommandation from '../pages/AppRecommandation';
import Dashboard from '../pages/Dashboard';
import MonteCarloEstimation from '../pages/MonteCarloEstimation';

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
      name: "Dashboard",
      index: 3,
      view: <Dashboard />,
      active: true
    }]
  },{
    topic: "Maths",
    icon: <FunctionsIcon fontSize="large" htmlColor="red" />,
    pages: [{
      name: "Monte Carlo Estimation",
      index: 4,
      view: <MonteCarloEstimation />,
      active: true
    }]
}]
