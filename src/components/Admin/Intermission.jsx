import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useDispatch, useSelector} from "react-redux";
import {getWebSocket} from "../../store/websocket"
import {Redirect} from "react-router-dom";
import {ThemeProvider} from "@material-ui/core/styles";
import {
    CircularProgress,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    TextField
} from "@material-ui/core";
import useStyles from "../../resources/styles";
import ApplicationBar from "../AppBar";
import Container from "@material-ui/core/Container";
import theme from "../../resources/theme";
import {pointsDispatch} from "../../store/actions/messageActions";


const useIntermissionStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        fontSize: 50,
        // background: `linear-gradient(45deg, ${theme.palette.primary.main}  30%, ${fade(theme.palette.primary.main, 0.7)}  90%)`
    },
}));

// const theme = createMuiTheme({
//     palette: {
//         primary: blue,
//         secondary: cyan,
//
//     },
// });

const Intermission = ({history}) => {
    const websocket = getWebSocket();
    const classes = useIntermissionStyles();
    const globalStyles = useStyles();
    const dispatch = useDispatch();
    const round = useSelector(state => state.currentRound);
    const teams = useSelector(state => state.teams);
    console.log(round);
    const [open, setOpen] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);
    const timerRef = React.useRef();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
        setSubmitted(true);
        Object.keys(teams).forEach((teamUUID)=>{
            dispatch(pointsDispatch(teamUUID,0))
        })
        if (websocket.isConnected())
        websocket.sendMessage("start", {num: 2, timer: timerRef.current.value});

    };
    if (round === 2)
        return <Redirect to="/round2Admin"/>;

    if (submitted) {
        return (
            <div className={globalStyles.center}>
                <CircularProgress color={"primary"}/>
            </div>
        );
    }
    return (<>
            <CssBaseline/>
            <ApplicationBar title={"Перерыв"}/>
            <Container className={globalStyles.center} maxWidth={"md"}>
                {/*<Paper className={globalStyles.lobbyPaper} style={{display:"flex", direction:"column", alignItems:"center", justifyContent:"center"}}>*/}
                <ThemeProvider theme={theme}>
                    <Button variant="contained" color="primary" className={classes.button} onClick={handleClickOpen}>
                        Начать второй раунд
                    </Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title" style={{paddingLeft:23}}> Настройка таймера</DialogTitle>
                        <DialogContentText style={{paddingLeft:23}}>Введите время на ответ:</DialogContentText>
                        <DialogContent>
                            <TextField
                                inputRef={timerRef}
                                autoFocus
                                margin="dense"
                                id="seconds"
                                defaultValue={"15"}
                                label="Время"
                                type="seconds"
                                fullWidth
                                style={{marginTop:-20}}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary" style={{padding:15}}>
                                Отменить
                            </Button>
                            <Button onClick={handleSubmit} color="primary"  style={{padding:15}}>
                                Подтвердить
                            </Button>
                        </DialogActions>
                    </Dialog>
                </ThemeProvider>
                {/*</Paper>*/}

            </Container>
        </>
    );
}
export default Intermission;