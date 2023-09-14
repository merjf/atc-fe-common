import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Ranking, Suit } from "../../models/types";
import FmdBadIcon from '@mui/icons-material/FmdBad';
import ApiIcon from '@mui/icons-material/Api';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useState } from "react";

const useStyles = makeStyles({
    box: {
        width: 50,
        height: 70,
        border: "1px solid black",
        backgroundColor: "white"
    },
    cardInfo: {
        display: "flex",
        margin: "auto",
        width: "max-content",
        alignItems: "center",
        gap: 1,
    },
    backCards: {
        width: 50,
        height: 70,
    },
});

interface PlayingCardProps {
    suit?: Suit;
    ranking?: Ranking;
    skinCard?: boolean
}

const PlayingCard = (props: PlayingCardProps) => {
    const classes = useStyles();
    const suit = props.suit;
    const ranking = props.ranking;
    const skinCard = props.skinCard;

    const [changeCardDialog, setChangeCardDialog] = useState(false);

    const showCard = () => {
        if(skinCard){
            return <img alt="Playing Cards Back" src={require("../../assets/images/playingCardsBack.png")} className={classes.backCards} />
        }
        else if(suit && ranking){
            let color = "";
            let suitNode = undefined;
            switch(suit?.label){
                case "H":
                    color = "red";
                    suitNode = <FavoriteIcon htmlColor={color}/>
                    break;
                case "D":
                    color = "red";
                    suitNode = <ApiIcon htmlColor={color}/>
                    break;
                case "C":
                    color = "black";
                    suitNode = <AcUnitIcon htmlColor={color}/>
                    break;
                case "S":
                    color = "black";
                    suitNode = <FmdBadIcon htmlColor={color}/>
                    break;
                default: 
                    suitNode = undefined;
            }
            if(suitNode){
                let rankingNode = <span style={{color: color, fontWeight: "bold"}}>{ranking?.label}</span>
                return <>{rankingNode}{suitNode}</>
            }
        }
    }

    const openChangeCardDialog = () => {
        setChangeCardDialog(true);
    }

    return (
        <Box role="playing-card" className={classes.box}>
            <Box className={classes.cardInfo} onClick={openChangeCardDialog}>
                {showCard()}
            </Box>
        </Box>
    );
}

export default PlayingCard;