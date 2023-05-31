import { createTheme } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});


// const TASK_STORE_KEY = 'tasks';

// const Tasks = () => {
//     const [tasks, setTasks] = useGlobalState<string[]>(TASK_STORE_KEY, []);
    
//     ...
// }

// export function reducer(state: currentState, action: any) {
//   switch(action.type){
//     case 'currentPage':
//       return {
//         ...state,
//         currentPage: action.currentPage
//       }
//   }
//   throw Error('Unknown action: ' + action.type);
// }