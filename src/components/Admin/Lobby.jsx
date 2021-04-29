import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import AllInclusive from "@material-ui/icons/AllInclusive";
import useStyles from "../../resources/styles";
import {useDispatch} from "react-redux";
import {roomDispatch} from "../../store/actions/messageActions";''
import websocket from "../../store/websocket"

const Lobby = ({history}) => {
    const websocket = websocket;
    websocket.connectAdmin();
    const classes = useStyles();
    const dispatch = useDispatch();
    return (
        <div className={classes.center}>
        <Container component="main" maxWidth="xs" style={{position:"relative", top:100}}>
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AllInclusive/>
                </Avatar>
                <Typography component="h1" variant="h4">
                    Викторина
                </Typography>

                <Paper className={classes.lobbyPaper}>
                    <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        color="primary"
                        className={classes.lobbyButton}
                        onClick={ (event => {
                            event.preventDefault()
                            dispatch(roomDispatch("ABCDEF", "ADMINID", "NAME"))
                            history.push(`/teams`)
                        })}
                    >
                        Начать
                    </Button>
                    <Button
                        fullWidth
                        size="large"
                        variant="outlined"
                        color="primary"
                        className={classes.lobbyButton}
                        onClick={(event => {

                        })}

                    >
                        Добавить вопросы
                    </Button>

                    <Button
                        fullWidth
                        size="large"
                        color="primary"
                        className={classes.lobbyButton}
                        onClick={(event => {

                        })}
                    >
                        Назад
                    </Button>

                </Paper>

            </div>
        </Container>
        </div>
    );
}
export default Lobby;