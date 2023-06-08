import { makeStyles } from "@mui/styles";
import Card from '@mui/material/Card';
import { useEffect, useState } from "react";
import { Box, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, Collapse, Divider, IconButton, Typography } from "@mui/material";
import { Dataset, DatasetResponse } from '../../models/types'
import { fetchObjectDetectionLoadDataset } from '../../services/APIService'
import Picker from './Picker'
import classnames from "classnames";
import { ExpandMore } from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles({
    cardBox:{
        position: "absolute",
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
        }
    },
    cardContent: {
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
    cardLoading:{
        opacity: 0.3
    },
    divider: {
        width: "100%",
        margin: "20px 0px !important"
    },
    cardOpen:{
        cursor: "auto",
        minWidth: 450,
        boxShadow: "-2px 2px 2px -2px grey !important",
        "&:hover":{
            backgroundColor: "white",
            "& > div > p, & > div > div":{
                color: "text.primary !important"
            }
        }
    },
    loadingButton:{
        position: "absolute",
        top: "40%",
        left: "40%",
        zIndex: 1202
    }
})

interface CardProps{
    title: String,
    description: String,
    datasetSelected: Function,
}

const BasicCard = (props: CardProps) => {
    const classes = useStyles();

    const [cardOpen, setCardOpen] = useState(false);
    const [expandDatasetDetails, setExpandDatasetDetails] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [datasetSelected, setDatasetSelected] = useState<DatasetResponse|undefined>(undefined);
    const [responseLoading, setResponseLoading] = useState(false);

    useEffect(() => {
        if(datasetSelected){
            setPreviewImage('data:image/jpg;base64,'+datasetSelected.image)
        }
    }, [datasetSelected]);

    const handleClose = (datasetSelected: Dataset|undefined) => {
        setResponseLoading(true)
        if(datasetSelected){
            fetchObjectDetectionLoadDataset(datasetSelected.id)
                .then((res) => {
                    setDatasetSelected(res.dataset);
                    setResponseLoading(false)
                    props.datasetSelected(true)
                    setCardOpen(false)
                })
        }
    };

    const handleCloseCard = (e:any) => {
        setCardOpen(!cardOpen)
    }

    const handleExpandClick = () => {
        setExpandDatasetDetails(!expandDatasetDetails);
    };

    return (
        <Box className={classes.cardBox}>
            {responseLoading && 
                <CircularProgress className={classes.loadingButton}/>
            }
            {!cardOpen &&
                <Card className={classnames(classes.card, cardOpen ? classes.cardOpen : "")} onClick={(event) => handleCloseCard(event)}>
                    {datasetSelected &&
                        <CardMedia
                            component="img"
                            height="120"
                            image={datasetSelected ? previewImage : require("../../assets/objectDetection/images/preview.jpg")}
                            alt="Dataset not selected"
                        />
                    }
                    <CardContent>
                        <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                            {datasetSelected ? "Dataset Active: " : "Dataset Empty. Please pick one"}
                        </Typography>
                        <Typography variant="h4" component="div">
                            {datasetSelected ? datasetSelected.name : ""}
                        </Typography>
                    </CardContent>
                </Card>
            }
            {cardOpen && 
                <Card className={classnames(classes.card, classes.cardOpen)}>
                    <CardActionArea onClick={(event) => handleCloseCard(event)} className={responseLoading ? classes.cardLoading : ""}>
                        <CardMedia
                            component="img"
                            height="300"
                            image={datasetSelected ? previewImage : require("../../assets/objectDetection/images/preview.jpg")}
                            alt="Dataset not selected"
                        />
                        <CardContent className={classes.cardContent}>
                            {datasetSelected &&
                                <Box>
                                    <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                                        Dataset Active:
                                    </Typography>
                                    <Typography variant="h3" component="div">
                                        {datasetSelected.name}
                                    </Typography>
                                </Box>
                            }
                        </CardContent>
                    </CardActionArea>
                    {datasetSelected && 
                        <CardContent className={classes.cardDetails}>
                            <CardActions disableSpacing sx={{padding: 0, gap: 2}}>
                                <Typography variant="h4">
                                    Dataset details
                                </Typography>
                                <IconButton onClick={handleExpandClick} sx={{transform: !expandDatasetDetails ? 'rotate(0deg)' : 'rotate(180deg)',}}>
                                    <ExpandMoreIcon />
                                </IconButton>
                            </CardActions>
                            <Collapse in={expandDatasetDetails} timeout="auto" unmountOnExit sx={{ maxWidth: 400 }}>
                                <Typography variant="h6">
                                    N° of classes: <b>{datasetSelected.classes.length}</b>
                                </Typography>
                                <Typography variant="h6">
                                    Classes: 
                                </Typography>
                                <Typography variant="h6" >
                                    <b>{datasetSelected.classes.map((item:string) => (
                                        item.split(' ').map(word => {
                                            return word.charAt(0).toUpperCase() + word.slice(1);
                                        }).join(' ')
                                    )).join(" - ")}</b>
                                </Typography>
                            </Collapse>
                        </CardContent>
                    }
                    <Divider className={classes.divider}/>
                    <CardActions className={classes.cardActions}>
                        <Typography color="text.secondary" gutterBottom>
                            {datasetSelected ? "Select another dataset" : "Select dataset"}
                        </Typography>
                        <Picker onClose={handleClose} datasetID={datasetSelected ? datasetSelected.id : ""} loading={responseLoading}/>
                    </CardActions>
                </Card>
            }
        </Box>
    )
}

export default BasicCard;