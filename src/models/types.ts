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