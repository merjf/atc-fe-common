
export type Response = {
    message: string;
    predictions: Prediction[];
};

export type Prediction = {
    accuracy: number;
    model: string;
}
  
export type Image = {
    src: string,
    value: any,
    name: string,
    type: string,
    size: string
}