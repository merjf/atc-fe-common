import { Image } from "../models/types";

const GATEWAY_URL = "http://127.0.0.1:5001"
const OBJECT_DETECTION_SERVICE_PREFIX = "/atc-be-object-detection"
const MONTECARO_SERVICE_PREFIX = "/atc-be-montecarlo"

const OBJECT_DETECTION_LOAD_DATASET = GATEWAY_URL + OBJECT_DETECTION_SERVICE_PREFIX + "/load-dataset"
const OBJECT_DETECTION_TEST_MODEL = GATEWAY_URL + OBJECT_DETECTION_SERVICE_PREFIX + "/test-object-model"

const MONTECARLO_GET_DECK = GATEWAY_URL + MONTECARO_SERVICE_PREFIX + "/get-deck"

const requestFileOptions = (body: any) => ({
    method: 'POST',
    body: body
});

// Object Detection Service APIs

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

// Montecarlo Simulation Service APIs

export const fetchDeck = () => {
  return fetch(MONTECARLO_GET_DECK)
    .then(response => response.json())
}