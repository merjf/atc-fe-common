import { makeStyles } from "@mui/styles";
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import classnames from "classnames";
import { pages } from '../models/constants'
import { Page, SubPage } from "../models/types";

const useStyles = makeStyles({
  navBar: {
    maxHeight: 70,
    backgroundColor: "white !important",
    color: "black !important",
    fontSize: "2rem",
    fontFamily: "Arial, Helvetica, sans-serif",
    boxShadow: "none !important"
  },
  menuButton:{
    zIndex: 1201,
  },
  menuBar: {
    '& .MuiDrawer-paper': {
      paddingTop: 80,
      boxSizing: 'border-box',
      width: 260,
    }
  },
  topicItem: {
    "& > span":{
      fontSize: "1.3rem",
      fontWeight: "bold"
    }
  },
  topicIcon: {
    minWidth: "unset !important",
    marginRight: 10,
  }
});

interface HeaderProps{
  onChangePage: Function
}

const Header = (props: HeaderProps) => {
  const classes = useStyles();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleDrawerDesktopToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClick = (pageIndex:number) => {
    setMenuOpen(!menuOpen);
    props.onChangePage(pageIndex);
  }

  return (
    <header className={classes.navBar}>
      <IconButton aria-label="open-close-drawer" onClick={handleDrawerDesktopToggle} className={classnames(classes.menuButton)}>
        <Tooltip title={menuOpen ? "Close Menu" : "Show Menu"}>
          <Box>
            <MenuIcon fontSize="large"/>
          </Box>
        </Tooltip>
      </IconButton>
      <Drawer variant="temporary" open={menuOpen} className={classes.menuBar} onClose={handleDrawerDesktopToggle} ModalProps={{ keepMounted: true, }}>
        <Box>
          <List>
            {pages.map((topic:Page, index:number) => (
              <Box key={topic.topic}>
                <ListItem>
                  <ListItemIcon className={classes.topicIcon}>
                    {topic.icon}
                  </ListItemIcon>
                  <ListItemText className={classes.topicItem} primary={topic.topic} />
                </ListItem>
                {topic.pages.map((page:SubPage, index:number) => (
                  <ListItem key={page.index}>
                    <ListItemButton onClick={() => handleClick(page.index)}>
                      <ListItemText primary={page.name} />
                    </ListItemButton> 
                  </ListItem>
                ))}
              </Box>
            ))}
          </List>
        </Box>
      </Drawer>
    </header>
  )
}

export default Header;