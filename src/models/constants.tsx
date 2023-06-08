import FunctionsIcon from '@mui/icons-material/Functions';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { Page } from './types';

export const pages : Page[] = [{
    topic: "AI & ML",
    icon: <PsychologyIcon fontSize={"large"} htmlColor="lightblue"/>,
    pages: [{
      name: "Object Detection Service",
      index: 0
    }],
  },{
    topic: "Reports",
    icon: <AssessmentIcon fontSize="large" htmlColor="orange"/>,
    pages: [{
      name: "Music Recommendation",
      index: 1
    },{
      name: "Play Store App Recommendation",
      index: 2
    }]
  },{
    topic: "Maths",
    icon: <FunctionsIcon fontSize="large" htmlColor="red" />,
    pages: [{
      name: "Monte Carlo Estimation",
      index: 3
    }]
}]
