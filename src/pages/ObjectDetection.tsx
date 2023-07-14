import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Button, CircularProgress, Container, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { fetchObjectModelTesting } from '../services/APIService'
import { Image, TestModelResponse } from '../models/types'
import BasicCard from '../components/ObjectDetection/BasicCard'
import UploadIcon from '@mui/icons-material/Upload';
import ImageIcon from '@mui/icons-material/Image';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import PsychologyIcon from '@mui/icons-material/Psychology';
import Title from "../components/Title";

const useStyles = makeStyles({
  main: {
    display: "flex !important",
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
  },
  formBox: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: 10
  },
  resultBox: {
    display: "flex",
    justifyContent: "center",
    gap: 100,
    width: "100%",
  },
  previewImageBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 0,
    "& > pre": {
      margin: 0
    },
    "& > img":{
      minWidth: 500,
      maxWidth: 700,
    }
  },
  dataResultBox: {
    minWidth: 250,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  predictionList:{
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  predictionItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start !important",
    gap: 40
  }
});

const ObjectDetection = () => {
  const classes = useStyles();

  const [testModelResult, setTestModelResult] = useState<TestModelResponse>();
  const [image, setImage] = useState<Image>();
  const [responseLoading, setResponseLoading] = useState(false);
  const [datasetSelected, setDatasetSelected] = useState(false);

  const getImage = (event : any) => {
    var file = event.target.files[0];
    setImage({
      src: URL.createObjectURL(file),
      value: file,
      name: file.name,
      type: file.type,
      size: file.size
    });
  }

  const postTestModel = () => {
    if(image){
      setResponseLoading(true);
      fetchObjectModelTesting(image)
        .then((res) => {
          setTestModelResult(res);
          setResponseLoading(false);
        })
    }
  }

  const datasetIsPresent = (value:boolean) => {
    setDatasetSelected(value)
  }

  const cleanData = () => {
    setTestModelResult(undefined);
    setImage(undefined);
  }

  return (
    <Container className={classes.main} maxWidth={"xl"}>
      <Title title={"Object Detection Service"} icon={<PsychologyIcon sx={{fontSize: 42}} htmlColor="#36aacf"/>} />
      <BasicCard title={"Select dataset"} description={""} datasetSelected={datasetIsPresent}/>
      {datasetSelected && 
        <Box className={classes.formBox}>
          <h4>To test the model, upload a picture related to the active dataset</h4>
          {!image &&
            <Button variant="contained" startIcon={<UploadIcon />} component="label"> 
              Chose Picture
              <input type="file" hidden onChange={getImage}/>
            </Button>
          }
          {image &&
            <Button variant="contained" startIcon={<ImageIcon />} component="label" onClick={postTestModel}> 
              Test
            </Button>
          }
          <Button variant="outlined" startIcon={<CleaningServicesIcon />} onClick={cleanData} />
        </Box> 
      }
      {image &&
        <Box className={classes.resultBox}>
          <Box className={classes.previewImageBox}>
            <h3>Preview image:</h3>
            <img src={image.src} />
          </Box>
          <Box className={classes.dataResultBox}>
            {responseLoading && 
              <CircularProgress />
            }
            {testModelResult &&
              <Box>
                <h3>Predictions:</h3>
                <List className={classes.predictionList}>
                  {testModelResult?.predictions.map((prediction, index) => (
                    <ListItem key={prediction.accuracy} className={classes.predictionItem}>
                      <Typography variant="h4">
                        {index+1}
                      </Typography>
                      <Box>
                        <Typography variant="h6">
                          Class: <b>{prediction.model.charAt(0).toUpperCase() + prediction.model.slice(1)}</b>
                        </Typography>
                        <Typography variant="h6">
                          Accuracy: <b>{prediction.accuracy}%</b>
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Box>
            }
            </Box>
        </Box>
      }
    </Container>
  )
}

export default ObjectDetection;