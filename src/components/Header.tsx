import { makeStyles } from "@mui/styles";
import { AppBar, Box, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography,  } from "@mui/material";
import { useReducer, useState } from 'react';
// import { reducer } from '../utils/Utils';
import { useDispatch } from "react-redux";
import { theme } from '../utils/Utils';

const useStyles = makeStyles({
    navBar: {
        maxHeight: 70,
        alignItems: "flex-end",
        paddingRight: 20,
        backgroundColor: "white !important",
        color: "black !important",
        fontSize: "2rem",
        fontFamily: "Arial, Helvetica, sans-serif",
        boxShadow: "none !important"
    },
    menuBar: {
        [theme?.breakpoints.down('sm')]: {
          display: "none"
        },
        [theme?.breakpoints.down('sm')]: {
          display: "none"
        },
        '& .MuiDrawer-paper': {
          paddingTop: 65,
          boxSizing: 'border-box',
          width: 240,
        }
      },
      topicItem: {
        "& > span":{
          fontSize: "1.3rem",
          fontWeight: "bold"
        }
      }
});

const pages = [{
    topic: "AI & ML",
    pages: [{
      name: "Object Detection",
      index: 0
    }],
  },{
    topic: "Reports",
    pages: [{
      name: "Music Recommendation",
      index: 1
    },{
      name: "Play Store App Recommendation",
      index: 2
    }]
  },{
    topic: "Maths",
    pages: [{
      name: "Monte Carlo Estimation",
      index: 3
    }]
  }
]

const Header = () => {
    const classes = useStyles();

    const [mobileOpen, setMobileOpen] = useState(false);
    
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    const handleChangingPage = (pageIndex: number) => {
        
    }

    return (
        <AppBar position="fixed" className={classes.navBar}>
            <Toolbar>
                Academic Tools Collector
            </Toolbar>
            <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} className={classes.menuBar} ModalProps={{ keepMounted: true, }} >
                <Box>
                <List>
                    {pages.map((topic, index) => (
                    <Box key={topic.topic}>
                        <ListItem >
                            <ListItemText className={classes.topicItem} primary={topic.topic} />
                        </ListItem>
                        {topic.pages.map((page, index) => (
                        <ListItem key={page.index}>
                            <ListItemButton onClick={() => handleChangingPage(page.index)}>
                                <ListItemText primary={page.name} />
                            </ListItemButton> 
                        </ListItem>
                        ))}
                    </Box>
                    ))}
                </List>
                </Box>
            </Drawer>
            <Drawer variant="permanent" className={classes.menuBar} open>
                <Box>
                <List>
                    {pages.map((topic, index) => (
                    <Box key={topic.topic}>
                        <ListItem>
                            <ListItemText className={classes.topicItem} primary={topic.topic} />
                        </ListItem>
                        {topic.pages.map((page, index) => (
                        <ListItem key={page.index}>
                            <ListItemButton onClick={() => handleChangingPage(page.index)}>
                                <ListItemText primary={page.name} />
                            </ListItemButton> 
                        </ListItem>
                        ))}
                    </Box>
                    ))}
                </List>
                </Box>
            </Drawer>
        </AppBar>
    )
}

export default Header;