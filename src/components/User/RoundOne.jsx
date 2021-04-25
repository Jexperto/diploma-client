import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import AllInclusive from "@material-ui/icons/AllInclusive";
import useStyles from "../../resources/styles";
import TextField from "@material-ui/core/TextField";

function handleConnect(e){
    console.log("Connect was clicked");

}
function handleRools(e){
    console.log("Rools was clicked");
}
function handleExit(e){
    console.log("Exit was clicked");
}



const RoundOne = ({history}) => {
    const classes = useStyles();
    const codeRef = React.useRef()
    const nickRef = React.useRef()
    return (
        <div className={classes.center}>
            <Container component="main" maxWidth="xs" style={{position:"relative", top:100}} >
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AllInclusive/>
                    </Avatar>
                    <Typography component="h2" variant="h4">
                        Первый раунд
                    </Typography>
                    <Typography component="h2" variant="h6">
                        Добавьте ложный ответ соперникам
                    </Typography>
                    <Paper className={classes.lobbyPaper}>
                        <Typography component="h1" variant="h6">
                            Очень длинный ответ, который мне нужно протестировать. Ну а впрочем, я просто хочу сдать этот грёбаный диплом!!!
                        </Typography>
                        <TextField
                            inputRef={codeRef}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            autoComplete="off"
                            name="code"
                            label="Ответ"
                            id="code"
                            autoFocus
                        />
                        <Button
                            fullWidth
                            size="large"
                            color="primary"
                            className={classes.lobbyButton}
                            onClick={handleExit}
                        >
                            Подтвердить
                        </Button>
                    </Paper>

                </div>
            </Container>
        </div>

    );
}
export default RoundOne;