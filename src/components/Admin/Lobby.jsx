import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Paper, Snackbar} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import AllInclusive from "@material-ui/icons/AllInclusive";
import useStyles from "../../resources/styles";
import {connect, useDispatch, useSelector} from "react-redux";
import {getWebSocket} from "../../store/websocket"
import {Redirect} from "react-router-dom";
import MuiAlert from '@material-ui/lab/Alert';
import {initQuestionSetDispatch} from "../../store/actions/messageActions";


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Lobby = ({history, code, teams}) => {
    const websocket = getWebSocket()
    websocket.connectAdmin();
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state.questions);
    const [errorOpen, setErrorOpen] = React.useState(false);
    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorOpen(false);
    };

    if (Object.keys(teams).length > 0)
        return <Redirect to="/adminTeams"/>;
    return (
        <div className={classes.top}>
            <Container component="main" maxWidth="xs" style={{position: "relative", top: 100}}>
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
                            onClick={(event => {
                                event.preventDefault()
                                if ((Array.isArray(selector) && selector[0].question !== undefined && selector[0].answer !== undefined)) {
                                    websocket.sendMessage("create", {nick: ""})
                                    websocket.sendMessage("add_t", {team_names: ["Команда 1", "Команда 2"]})
                                    const questions = [...selector];
                                    dispatch(initQuestionSetDispatch(undefined));
                                    questions.forEach((it)=>{
                                        websocket.sendMessage("add_question",{question:it.question,answer:it.answer})
                                    })
                                } else {
                                    setErrorOpen(true)
                                }
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
                                websocket.sendMessage("close")
                                history.push("/AddQuestions")
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
                                websocket.sendMessage("close")
                                history.push("/lobby")
                            })}
                        >
                            Назад
                        </Button>

                    </Paper>

                </div>
            </Container>
            <Snackbar open={errorOpen} autoHideDuration={3000} onClose={handleErrorClose}>
                <Alert onClose={handleErrorClose} severity="error">
                    Сначала нужно добавить вопросы!
                </Alert>
            </Snackbar>
        </div>
    );
}
export default connect(state => {
    return {code: state.code, teams: state.teams}
})(Lobby);