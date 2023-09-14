import { makeStyles } from "@mui/styles";
import Card from '@mui/material/Card';
import { useState } from "react";
import { Box, Button, CardActionArea, CardActions, CardContent, CardMedia, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import classnames from "classnames";
import SettingsIcon from '@mui/icons-material/Settings';
import { MontecarloPokerSimulationSettings } from "../../models/types";
import { nPlayers, nSamples } from "../../models/constants";

const useStyles = makeStyles({
    cardBox:{
        position: "absolute",
        zIndex: 1000,
        top: 30,
        right: 30,
    },
    card: {
        cursor: "pointer",
        minWidth: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #f5f5f5",
        boxShadow: "-4px 4px 4px -4px grey !important",
        "&:hover":{
            backgroundColor: "#f3f3f3",
        },
        "& > .MuiCardActions-root":{
            minWidth: 200,
        },
        "& > .MuiCardContent-root": {
            display: "flex",
            gap: 10,
            alignItems: "center",
            justifyItems: "center",
            padding: "20px 0px !important"
        }
    },
    cardContent: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
    },
    cardActions:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 15
    },
    cardDetails:{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "85%",
        gap: 10
    },
    cardOpen:{
        cursor: "auto",
        minWidth: 250,
        boxShadow: "-2px 2px 2px -2px grey !important",
        "&:hover":{
            backgroundColor: "white",
            "& > div > p, & > div > div":{
                color: "text.primary !important"
            }
        }
    },
    item: {
        padding: "10px 15px !important"
    }
})

interface CardProps{
    setSettings: Function
}

const BasicCard = (props: CardProps) => {
    const classes = useStyles();

    const [cardOpen, setCardOpen] = useState(false);
    const [settings, setSettings] = useState<MontecarloPokerSimulationSettings>({nPlayers: 1, nSamples: 10000, flop: true, turn: true, river: true});

    const handleClose = (e:any) => {
        props.setSettings(settings);
        setCardOpen(false);
    }

    const handleChangeSamples = (event: SelectChangeEvent) => {
        let nSamples = parseInt(event.target.value);
        setSettings({nSamples: nSamples, nPlayers: settings.nPlayers, flop: settings.flop, turn: settings.turn, river: settings.river})
    };

    const handleChangePlayers = (event: SelectChangeEvent) => {
        let nPlayers = parseInt(event.target.value);
        setSettings({nSamples: settings.nSamples, nPlayers: nPlayers, flop: settings.flop, turn: settings.turn, river: settings.river})
    };

    const handleChangeTable = (event: React.ChangeEvent<HTMLInputElement>) => {
        let check = event.target.checked;
        setSettings({nSamples: settings.nSamples, nPlayers: settings.nPlayers, flop: check, turn: check, river: check})
    };

    const handleChangeFlop = (event: React.ChangeEvent<HTMLInputElement>) => {
        let flop = event.target.checked;
        setSettings({nSamples: settings.nSamples, nPlayers: settings.nPlayers, flop: flop, turn: flop ? settings.turn : flop, river: flop ? settings.river : flop})
    };

    const handleChangeTurn = (event: React.ChangeEvent<HTMLInputElement>) => {
        let turn = event.target.checked;
        setSettings({nSamples: settings.nSamples, nPlayers: settings.nPlayers, flop: turn ? turn : settings.flop, turn: turn, river: turn ? settings.river : turn})
    };

    const handleChangeRiver = (event: React.ChangeEvent<HTMLInputElement>) => {
        let river = event.target.checked;
        setSettings({nSamples: settings.nSamples, nPlayers: settings.nPlayers, flop: river ? river : settings.flop, turn: river ? river : settings.turn, river: river})
    };

    return (
        <Box className={classes.cardBox}>
            {!cardOpen &&
                <Card className={classnames(classes.card, cardOpen ? classes.cardOpen : "")} onClick={(event) => setCardOpen(true)}>
                    <CardContent>
                        <SettingsIcon />  
                        <Typography sx={{ fontSize: 15, margin: 0 }} color="text.secondary" gutterBottom>
                            Settings
                        </Typography>
                    </CardContent>
                </Card>
            }
            {cardOpen && 
                <Card className={classnames(classes.card, classes.cardOpen)}>
                    <CardContent className={classes.cardContent}>
                        <Typography sx={{ fontSize: 15, margin: 0, marginBottom: 2 }} color="text.secondary" gutterBottom>
                            Set n° samples and n° players:
                        </Typography>
                        <FormControl fullWidth>
                            <Select onChange={handleChangeSamples} id="n-samples" label="N-Samples" value={""+settings.nSamples}>
                                <InputLabel className={classes.item} id="n-samples-label">N° samples</InputLabel>
                                {nSamples.map((samples) => (
                                    <MenuItem key={samples.value} value={samples.value} className={classes.item}>
                                        {samples.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <Select onChange={handleChangePlayers}  id="n-samples" label="N-Samples" value={""+settings.nPlayers}>
                                <InputLabel className={classes.item} id="n-samples-label">N° samples</InputLabel>
                                {nPlayers.map((player) => (
                                    <MenuItem key={player.value} value={player.value} className={classes.item}>
                                        {player.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <FormControlLabel
                                label="Table"
                                control={<Checkbox checked={settings.flop && settings.turn && settings.river} indeterminate={settings.flop !== settings.river || settings.turn !== settings.flop} onChange={handleChangeTable}/>} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                                <FormControlLabel
                                    label={"Flop"}
                                    control={<Checkbox checked={settings.flop} onChange={handleChangeFlop} />} />
                                <FormControlLabel
                                    label={"Turn"}
                                    control={<Checkbox checked={settings.turn} onChange={handleChangeTurn} />} />
                                <FormControlLabel
                                    label={"River"}
                                    control={<Checkbox checked={settings.river} onChange={handleChangeRiver} />} />
                            </Box>
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button onClick={handleClose} variant="contained">
                            Save
                        </Button>
                    </CardActions>
                </Card>
            }
        </Box>
    )
}

export default BasicCard;