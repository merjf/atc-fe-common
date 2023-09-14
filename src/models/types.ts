import React, { ReactNode } from "react";

interface Response {
    message: String;
}

export interface LoadDatasetResponse extends Response {
    dataset: DatasetResponse
}

export interface TestModelResponse extends Response {
    predictions: Prediction[];
};

export interface Prediction {
    accuracy: number
    model: string
}
  
export interface Image {
    src: string
    value: any
    name: string
    type: string
    size: string
}

export interface Dataset {
    name: string
    id: string
    image: string
    nClasses: number
}

export interface DatasetResponse {
    name: string
    id: string
    image: string
    classes: string[]
}

export interface currentState {
    currentPage: number,
}

export interface Field {
    topic: string,
    icon: any,
    pages: Page[],
}

export interface Page{
    name: string,
    index: number,
    view: any,
    active: boolean,
}

export interface Suit {
    value: number;
    label: string
}

export interface Ranking {
    value: number;
    label: string
}

export interface MontecarloPokerSimulationSettings {
    nPlayers: number;
    nSamples: number;
    flop: boolean;
    turn: boolean;
    river: boolean;
}

interface Card{
    suit?: Suit;
    ranking?: Ranking;
}

interface TableCards {
    cards: Card[]
}

interface PlayerCards {
    cards: Card[]
}

export interface GameCards {
    tableCards: TableCards,
    mainPlayerCards: PlayerCards,
    otherPlayerCards: PlayerCards[]
}

export interface RankingHand {
    rankingMainPlayer: number;
    score: string;
    mainPlayerCards: Card[];
}