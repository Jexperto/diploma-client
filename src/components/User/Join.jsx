import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Cloud from '@material-ui/icons/Cloud';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useStyles from "../../resources/styles";
import websocket from "../../store/websocket";
import {useDispatch, connect} from "react-redux";
import {joinDispatch} from "../../store/actions/messageActions";
import {Redirect} from "react-router-dom";


const Join = ({history, currentUser}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const codeRef = React.useRef()
    const nickRef = React.useRef()
    const ws = websocket;
    if (currentUser)
        return <Redirect to="/teams"/>;
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <Cloud/>
                </Avatar>
                <Typography component="h1" variant="h4">
                    Подключение
                </Typography>

                <form className={classes.form} noValidate onSubmit={
                    (event => {
                        event.preventDefault();
                        if (!ws.getMode()) ws.connectUser();
                        ws.sendMessage("join", {nick: nickRef.current.value, code: codeRef.current.value})
                        ws.sendMessage("get_t");
                    })
                }>
                    <TextField
                        inputRef={codeRef}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="code"
                        label="Код комнаты"
                        id="code"
                        autoFocus
                    />
                    <TextField
                        inputRef={nickRef}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="nickname"
                        label="Имя"
                        name="nickname"

                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Подключиться
                    </Button>

                </form>
            </div>
        </Container>
    );
}
export default connect(state => {return {currentUser:state.currentUser}})(Join);