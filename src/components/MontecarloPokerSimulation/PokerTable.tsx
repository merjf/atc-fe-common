import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { GameCards } from "../../models/types";
import PlayingCard from "./PlayingCard";
import classnames from "classnames";

const useStyles = makeStyles({
    boxTable: {
        width: 720,
        margin: "auto",
        minHeight: 400,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
        position: "relative"
    },
    cards: {
        display: "flex",
        gap: 2,
        position: "absolute"
    },
    mainPlayerCards: {
        backgroundColor: "orange",
        padding: 5,
        borderRadius: 5
    },
    tableCards: {
        display: "flex",
        gap: 5,
        position: "absolute",
        top: "40%",
        left: "30%"
    }
});

interface PokerTableProps {
    gameCards: GameCards
}

const locations = [{

}]

const PokerTable = (props: PokerTableProps) => {
    const classes = useStyles();
    const mainPlayerCards = props.gameCards.mainPlayerCards;
    const otherPlayerCards = props.gameCards.otherPlayerCards;
    const fillCardsTable = () => {
        let tableCards = props.gameCards.tableCards;
        Array.from(Array(5-props.gameCards.tableCards.cards.length)).map(i => {
            tableCards.cards.push({})
        });   
        return tableCards;
    }
    const tableCards = fillCardsTable();

    const assignOtherPlayerCardsPosition = (areMainPlayerCards:boolean, otherPlayerNumber:number) => {
        if(areMainPlayerCards){
            return {
                bottom: 0,
                left: "42%"
            }
        }
        switch(otherPlayerNumber){
            case 1: // dx center bottom
                return {
                    bottom: 30,
                    left: "62%"
                }
            case 2: // sx center bottom
                return {
                    bottom: 30,
                    left: "20%"
                }
            case 3: // sx center top
                return {
                    top: 30,
                    left: "30%"
                }
            case 4: // dx center top
                return {
                    top: 30,
                    left: "55%"
                }
            case 5: // sx bottom
                return {
                    bottom: "28%",
                    left: 0
                }
            case 6: // dx bottom
                return {
                    bottom: "28%",
                    right: 0
                }
            case 7: // dx top
                return {
                    top: "22%",
                    right: 20
                }
            case 8: // sx top
                return {
                    top: "22%",
                    left: 20
                }
        }
    }

    return(
        <Box className={classes.boxTable} sx={{backgroundImage: `url(${require("../../assets/images/poker-table.jpeg")})`}}>
            <Box className={classnames(classes.cards, classes.mainPlayerCards)} style={assignOtherPlayerCardsPosition(true, 0)}>
                <PlayingCard suit={mainPlayerCards.cards[0].suit} ranking={mainPlayerCards.cards[0].ranking} />
                <PlayingCard suit={mainPlayerCards.cards[1].suit} ranking={mainPlayerCards.cards[1].ranking} />
            </Box>
            {otherPlayerCards.map((otherPlayer, index) => (
                <Box className={classes.cards} style={assignOtherPlayerCardsPosition(false, index+1)} key={index}>
                    <PlayingCard suit={otherPlayer.cards[0].suit} ranking={otherPlayer.cards[0].ranking} />
                    <PlayingCard suit={otherPlayer.cards[1].suit} ranking={otherPlayer.cards[1].ranking} />
                </Box>
            ))}
            <Box className={classes.tableCards}>
                {tableCards.cards.map((card, index) => (
                    <PlayingCard
                        key={index}
                        skinCard={!card.ranking ? true : false}
                        suit={card.suit ? card.suit : undefined}
                        ranking={card.ranking ? card.ranking : undefined}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default PokerTable;