import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Button, CircularProgress, Container, Divider, List, ListItem, ListItemText } from "@mui/material";
import { fetchObjectModelTesting, fetchObjectDatasetInfo } from '../services/APIService'
import { Response, Image } from '../models/types'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import UploadIcon from '@mui/icons-material/Upload';
import ImageIcon from '@mui/icons-material/Image';
import { CSSProperties } from "@emotion/serialize";

const useStyles = makeStyles({
    main: {
      display: "flex !important",
      flexDirection: "column",
      alignItems: "center",
      gap: 15,
    },
    formBox: {
      display: "flex",
      gap: 20
    },
    divider: {
      borderWidth: "3px !important",
      width: "50%",
      borderRadius: "50px !important",
    },
    resultBox: {
      display: "flex",
      gap: 40,
      width: "100%",
      justifyContent: "space-between"
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
    }
});

const ObjectDetection = () => {
    const classes = useStyles();

    const [result, setResult] = useState<Response>();
    const [image, setImage] = useState<Image>();
    const [responseLoading, setResponseLoading] = useState(false);
  
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

    const getCarDatasetInfo = () => {
      if(image){
        setResponseLoading(true);
        fetchObjectModelTesting(image)
          .then((res) => {
            setResult(res);
            setResponseLoading(false);
          })
      }
    }
  
    const cleanData = () => {
      setResult(undefined);
      setImage(undefined);
    }

    return (
        <Container className={classes.main} maxWidth={"md"}>
            <h2>Object Detection</h2>
            <Box className={classes.formBox}>
              {!image &&
                <Button variant="contained" startIcon={<UploadIcon />} component="label"> 
                  Chose Picture
                  <input type="file" hidden onChange={getImage}/>
                </Button>
              }
              {image &&
                <Button variant="contained" startIcon={<ImageIcon />} component="label" onClick={getCarDatasetInfo}> 
                  Test
                </Button>
              }
              <Button variant="outlined" startIcon={<CleaningServicesIcon />} onClick={cleanData}>
                Clear Data
              </Button>
            </Box>
            <Divider className={classes.divider}/>
            {image &&
              <Box className={classes.resultBox}>
                <Box className={classes.previewImageBox}>
                  <h1>Preview image:</h1>
                  <img src={image.src} />
                </Box>
                <Box className={classes.dataResultBox}>
                  {responseLoading && 
                    <CircularProgress />
                  }
                  {result &&
                    <Box>
                      <h1>Predictions:</h1>
                      <List>
                        {result?.predictions.map((prediction, index) => (
                          <ListItem key={prediction.accuracy}>
                            <ListItemText>
                              <pre>
                              <b>Result:</b> {index+1}<br/>
                              <b>Class: </b> {prediction.model}<br/>
                              <b>Accuracy: </b> {prediction.accuracy}
                              </pre>
                            </ListItemText>
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

export default CarDetection;