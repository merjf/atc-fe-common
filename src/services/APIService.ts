import { Image } from "../models/types";

const GATEWAY_URL = "http://127.0.0.1:5002/atc/"

const OBJECT_DETECTION_LOAD_DATASET = GATEWAY_URL + "load-dataset"
const OBJECT_DETECTION_TEST_MODEL = GATEWAY_URL + "test-object-model"

const requestFileOptions = (body: any) => ({
    method: 'POST',
    body: body
});

// export const fetchObjectDatasetInfo = () => {
//   return fetch(OBJECT_DETECTION_RESULT_INFO)
//     .then(response => response.json())
// }

export const fetchObjectDetectionLoadDataset = (dataset:string) => {
  return fetch(OBJECT_DETECTION_LOAD_DATASET+"?dataset="+dataset)
    .then(response => response.json())
}

export const fetchObjectModelTesting = (image : Image) => {
  const body = new FormData();
  body.append("image", image.value);
  return fetch(OBJECT_DETECTION_TEST_MODEL, requestFileOptions(body))
    .then(response => response.json())
}