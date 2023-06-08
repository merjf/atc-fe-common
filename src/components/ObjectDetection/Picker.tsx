import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { Dataset } from "../../models/types";

const useStyles = makeStyles({
    main: {
      display: "flex !important",
      flexDirection: "column",
      alignItems: "center",
      gap: 15,
    },
});

export interface PickerProps {
    onClose: (dataset: Dataset|undefined) => void;
    datasetID: string|undefined,
    loading: boolean
}

const Picker = (props: PickerProps) => {
    const classes = useStyles();

    const { onClose } = props;

    const [datasetID, setDatasetID] = useState<string>(props.datasetID ? props.datasetID : "");

    const handleListItemClick = (event: SelectChangeEvent) => {
        var d = datasets.find(d => d.id === event.target.value);
        setDatasetID(event.target.value);
        onClose(d as Dataset);
    };

    const datasets = [{
        name: 'Flowers',
        id: 'flowers',
    },{
        name: 'Luxury Cars',
        id: 'cars_1'
    },{
        name: 'Common Cars',
        id: 'cars_2'
    }]

    return (
        <FormControl fullWidth disabled={props.loading}>
            <InputLabel id="demo-simple-select-label">Dataset</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={datasetID}
                label="Age"
                onChange={handleListItemClick}
            >
                {datasets.map((dataset) => (
                    <MenuItem value={dataset.id} key={dataset.id}>{dataset.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default Picker;