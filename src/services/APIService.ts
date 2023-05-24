import { Image } from "../models/responses";

const GATEWAY_URL = "http://127.0.0.1:5002/atc/"

const CAR_RESULT_INFO = GATEWAY_URL + "car-dataset-info"
const TEST_MODEL = GATEWAY_URL + "test-car-model"

const requestFileOptions = (body: any) => ({
    method: 'POST',
    body: body
});

export const fetchCarDatasetInfo = () => {
  return fetch(CAR_RESULT_INFO)
    .then(response => response.json())
}

export const fetchCarModelTesting = (image : Image) => {
  const body = new FormData();
  body.append("image", image.value);
  return fetch(TEST_MODEL, requestFileOptions(body))
    .then(response => response.json())
}