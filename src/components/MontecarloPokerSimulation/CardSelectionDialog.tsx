import { Dialog, DialogTitle, FormControl, InputLabel, Select } from "@mui/material";

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

const SimpleDialog = (props: SimpleDialogProps) => {
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleChangeCard = (value: string) => {
      onClose(value);
    };
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Choose Card </DialogTitle>
        <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <InputLabel htmlFor="max-width">maxWidth</InputLabel>
            {/* <Select
                autoFocus
                onChange={handleChangeCard}
                label="maxWidth"
                inputProps={{
                    name: 'max-width',
                    id: 'max-width',
                }}
            >
                <MenuItem value={false as any}>false</MenuItem>
            </Select> */}
        </FormControl>
      </Dialog>
    );
  }