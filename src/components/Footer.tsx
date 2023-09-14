import { makeStyles } from "@mui/styles";
import { AppBar, Box, Toolbar, Typography,  } from "@mui/material";

const useStyles = makeStyles({
    footer: {
        width: "100%",
        display: "flex",
        position: "fixed",
        bottom: 0,
        alignItems: "center",
        justifyContent: "flex-end",
        height: "50px",
        borderTop: "1px solid #d5d5d5",
        backgroundColor: "white",
    },
    signature: {
        paddingRight: "5px",
        "& > h3": {
            fontWeight: 500
        }
    },
})

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Box className={classes.signature}>
                <h3>Academic Tools Collector</h3>
            </Box>
        </footer>
    )
}

export default Footer;