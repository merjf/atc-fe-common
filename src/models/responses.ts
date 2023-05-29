
export type Response = {
    predictions: number;
    classes: string;
};
  
export type Image = {
    src: string,
    value: any,
    name: string,
    type: string,
    size: string
}