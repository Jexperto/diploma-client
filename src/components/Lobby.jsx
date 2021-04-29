import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from "../resources/styles";
import {Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import AllInclusive from "@material-ui/icons/AllInclusive";

function handleConnect(e){
    console.log("Connect was clicked");

}
function handleRules(e){
    console.log("Rules was clicked");
}
function handleExit(e){
    console.log("Exit was clicked");
}



const Lobby = ({history}) => {
    const classes = useStyles();
    return (
        <div className={classes.center}>
            <Container component="main" maxWidth="xs" style={{position:"relative", top:100}} >
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AllInclusive/>
                    </Avatar>
                    <Typography component="h1" variant="h4">
                        Лобби
                    </Typography>

                    <Paper className={classes.lobbyPaper}>
                        <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            color="primary"
                            className={classes.lobbyButton}
                            onClick={handleConnect}
                        >
                            Подключиться
                        </Button>
                        <Button
                            fullWidth
                            size="large"
                            variant="outlined"
                            color="primary"
                            className={classes.lobbyButton}
                            onClick={ (event => {
                                event.preventDefault()
                                history.push(`/adminLobby`)
                            })}

                        >
                            Создать комнату
                        </Button>

                        <Button
                            fullWidth
                            size="large"
                            color="primary"
                            variant="outlined"
                            className={classes.lobbyButton}
                            onClick={handleRules}
                        >
                            Правила
                        </Button>

                        <Button
                            fullWidth
                            size="large"
                            color="primary"
                            className={classes.lobbyButton}
                            onClick={handleExit}
                        >
                            Выход
                        </Button>
                    </Paper>

                </div>
            </Container>
        </div>

    );
}
export default Lobby;