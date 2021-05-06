import React from "react";
import useStyles from "../../resources/styles";
import Typography from "@material-ui/core/Typography";

const Finish = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.center}>
            <Typography component="h1" variant="h1">Конец</Typography>
        </div>
    )
}

export default Finish;