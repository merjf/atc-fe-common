import { makeStyles } from "@mui/styles";
import { AppBar, Toolbar, Typography,  } from "@mui/material";

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
});

const Header = () => {
    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.navBar}>
            <Toolbar>
                Academic Tools Collector
            </Toolbar>
        </AppBar>
    )
}

export default Header;