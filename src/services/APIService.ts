import { Image } from "../models/types";

const GATEWAY_URL = "http://127.0.0.1:5002/atc/"

const OBJECT_DETECTION_RESULT_INFO = GATEWAY_URL + "dataset-info"
const TEST_MODEL = GATEWAY_URL + "test-object-model"

const requestFileOptions = (body: any) => ({
    method: 'POST',
    body: body
});

export const fetchObjectDatasetInfo = () => {
  return fetch(OBJECT_DETECTION_RESULT_INFO)
    .then(response => response.json())
}

export const fetchObjectModelTesting = (image : Image) => {
  const body = new FormData();
  body.append("image", image.value);
  return fetch(TEST_MODEL, requestFileOptions(body))
    .then(response => response.json())
}