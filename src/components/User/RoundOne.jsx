import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {CircularProgress, Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import AllInclusive from "@material-ui/icons/AllInclusive";
import useStyles from "../../resources/styles";
import TextField from "@material-ui/core/TextField";
import {useSelector} from "react-redux";
import {getWebSocket} from "../../store/websocket";
import {Redirect} from "react-router-dom";

const RoundOne = ({history}) => {
    const classes = useStyles();
    const ansRef = React.useRef();
    const ws = getWebSocket();
    const qta = useSelector(state => state.questions); //questionsToAnswer
    const player = useSelector(state => state.currentUser);
    const round = useSelector(state => state.currentRound);
    //const teamAnswersCount = useSelector(state => state.teamAnswers);
    const [count, setCount] = React.useState(0);
    // React.useEffect(()=>{
    //     if (teamAnswersCount > count)
    //         setCount(teamAnswersCount)
    // })
    //console.log("teamAnswersCount:", teamAnswersCount)
    console.log(qta)
    console.log("count:", count)
    if (!Array.isArray(qta)) {
        return (
            <div className={classes.center}>
                <CircularProgress color={"primary"}/>
            </div>
        )
    }
    if (round < 0) {
        return (
            <Redirect to={"/round2user"}/>
        )
    }
    if (count >= qta.length) {
        return (
            <div className={classes.center}>
                <CircularProgress color={"primary"}/>
            </div>
        );
    }
    const qID = qta[count].question_id;
    const qText = qta[count].string;
    return (
        <div className={classes.top}>
            <Container component="main" maxWidth="xs" style={{position: "relative", top: 100}}>
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
                            {qText}
                        </Typography>
                        <TextField
                            inputRef={ansRef}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            autoComplete="off"
                            name="answer"
                            label="Ответ"
                            id="answer"
                            autoFocus
                        />
                        <Button
                            fullWidth
                            size="large"
                            color="primary"
                            className={classes.lobbyButton}
                            onClick={() => {
                                ws.sendMessage("wr_ans", {
                                    pl_id: player,
                                    question_id: qID,
                                    string: ansRef.current.value ? ansRef.current.value : ""
                                })
                                setCount(count + 1)
                                ansRef.current.value = ""
                            }}>
                            Подтвердить
                        </Button>
                    </Paper>
                </div>
            </Container>
        </div>

    );
}
export default RoundOne;