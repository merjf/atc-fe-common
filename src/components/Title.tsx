import { makeStyles } from "@mui/styles";
import { Box, Divider} from "@mui/material";
import { ReactNode } from "react";

const useStyles = makeStyles({
    box: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
        height: 200,
    },
    titleBox: {
        display: "flex",
        alignItems: "center",
        gap: 15,
        height: "100%"
    },
    divider: {
        borderWidth: "3px !important",
        width: "100%",
        borderRadius: "50px !important",
    },
    icon:{
        fontSize: 42
    }
});

interface TitleProps{
    title: string
    icon: ReactNode
}

const Title = (props: TitleProps) => {
    const classes = useStyles();

    return (
        <Box className={classes.box}>
            <Box className={classes.titleBox}>
                {props.icon}
                <h1>{props.title}</h1>
            </Box>
            <Divider className={classes.divider}/>
        </Box>
    )
}

export default Title;