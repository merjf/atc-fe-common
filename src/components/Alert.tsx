import * as React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useState } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    main: {
      display: "flex !important",
      flexDirection: "column",
      alignItems: "center",
      gap: 15,
    },
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    const classes = useStyles();
    
    return (
        <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
    );
    
});

export default Alert;