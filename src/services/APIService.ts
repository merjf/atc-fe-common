import { nPlayers } from "../models/constants";
import { EvaluationHand, GameCards, Image } from "../models/types";

const GATEWAY_URL = "http://127.0.0.1:5001"
const OBJECT_DETECTION_SERVICE_PREFIX = "/atc-be-object-detection"
const MONTECARO_SERVICE_PREFIX = "/atc-be-montecarlo"

const OBJECT_DETECTION_LOAD_DATASET = GATEWAY_URL + OBJECT_DETECTION_SERVICE_PREFIX + "/load-dataset"
const OBJECT_DETECTION_TEST_MODEL = GATEWAY_URL + OBJECT_DETECTION_SERVICE_PREFIX + "/test-object-model"

const MONTECARLO_DRAW_CARDS = GATEWAY_URL + MONTECARO_SERVICE_PREFIX + "/draw-cards"
const MONTECARLO_EVALUATE_HAND = GATEWAY_URL + MONTECARO_SERVICE_PREFIX + "/evalutate-hand"
const MONTECARLO_GET_LAST_FIVE_HANDS = GATEWAY_URL + MONTECARO_SERVICE_PREFIX + "/get-last-hands"
const MONTECARLO_SHUFFLE_DECK = GATEWAY_URL + MONTECARO_SERVICE_PREFIX + "/shuffle-deck"

const requestFileOptions = (body: any) => ({
  method: 'POST',
  body: body
});

const requestPOSTWithBody = (body: any) => ({
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  },
  body: JSON.stringify(body)
})

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

// Montecarlo Poker Simulation Service APIs

export const fetchDrawCards = (nPlayers:number, flop:boolean, turn:boolean, river:boolean) => {
  return fetch(MONTECARLO_DRAW_CARDS+"?nPlayers="+nPlayers+"&flop="+flop+"&turn="+turn+"&river="+river)
    .then(response => response.json())
}

export const fetchShuffleDeck = () => {
  return fetch(MONTECARLO_SHUFFLE_DECK)
    .then(response => response.json())
}

export const fetchMontecarloEvaluation = (gameCards : GameCards, nsamples: number) => {
  const body = ({...gameCards, nsamples: nsamples})
  return fetch(MONTECARLO_EVALUATE_HAND, requestPOSTWithBody(body))
    .then(response => response.json())
}

export const fetchMontecarloLast5Hands = () => {
  return fetch(MONTECARLO_GET_LAST_FIVE_HANDS)
    .then(response => response.json())
}