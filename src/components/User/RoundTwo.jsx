import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {CardActionArea, CircularProgress, Grid, Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import AllInclusive from "@material-ui/icons/AllInclusive";
import useStyles from "../../resources/styles";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import {width} from "@material-ui/system";
import {getWebSocket} from "../../store/websocket";
import {useDispatch, useSelector} from "react-redux";
import {currentQuestionDispatch} from "../../store/actions/messageActions";
import {Redirect} from "react-router-dom";


const questionStyles = makeStyles((theme) => ({
    square: {
        float: 1,
        height: 4,
        fill: width,
    },
    question: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(5),
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    answer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    cardGrid: {},
    card: {},
    cardContent: {},
    waiting: {
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center",
    }
}));


const UserTask = (props) => {
    const ws = getWebSocket();
    const waiting = props.waiting;
    const setWaiting = props.setWaiting;
    const classes = questionStyles();
    const answersAndIds = props.answersAndIds;
    const question = props.question;
    const questionID = props.questionID;
    const playerID = props.playerID;
    const rootRef = React.createRef();
    const [lastHeight, setLastHeight] = React.useState(0);
    const [idState, setIdState] = React.useState("");
    //console.log("qId: ",questionID)
    if (waiting)
        return (
            <div className={classes.waiting} style={{height: `${lastHeight}px`}} onLoad={() => {
                if (questionID !== idState) {
                    setWaiting(false);
                    setIdState(questionID);
                }
            }
            }>
                <CircularProgress color={"primary"}/>
            </div>

        )
    return (
        <div ref={rootRef}>
            <Typography className={classes.question} component="h2" variant="h4">
                {question}
            </Typography>

            <Grid container spacing={4} className={classes.cardGrid}>
                {answersAndIds.map((ans) => (
                    <Grid key={ans.value + ans.key} item xs={12} lg={6}>
                        <Card variant="outlined" className={classes.card}>
                            <CardActionArea onClick={() => {
                                const height = rootRef.current.clientHeight;
                                setLastHeight(height)
                                setWaiting(true)
                                ws.sendMessage("r_ans", {pl_id: playerID, question_id: questionID, answer_id: ans.key})
                            }}>
                                <CardContent className={classes.cardContent}>
                                    <Typography className={classes.answer} component="h1" variant="h5">
                                        {`${ans.value}`}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}

            </Grid>
        </div>
    )
}


const lQuestion = {
    questionUUID: "1",
    questionText: "Какой сегодня день?",
    answers: [{id: 1, value: "Хороший"}, {id: 2, value: "Очень хороший"}, {id: 3, value: "Плохой"}, {
        id: 4,
        value: "Диплом"
    }]
}

const RoundTwo = ({history}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    window.question = lQuestion;
    window.currQstDispatch = (obj) => {
        (dispatch(currentQuestionDispatch(obj.questionUUID, obj.answers, obj.questionText)))
    }
    const [waiting, setWaiting] = React.useState(false);
    const question = useSelector(state => state.currentQuestion); //questionsToAnswer
    const playerID = useSelector(state => state.currentUser);
    const round = useSelector(state => state.currentRound);
    const qID = question.questionUUID;
    const qText = question.questionText;
    const answersAndIds = question.answers;


    if (!question.questionUUID || round < 0) {
        if (round === -2)
            return (<Redirect to={"/userFinish"}/>);
        return (
            <div className={classes.center}>
                <CircularProgress color={"primary"}/>
            </div>
        );
    }
    return (
        <div className={classes.top}>
            <Container component="main" maxWidth="lg" style={{position: "relative", top: 100}}>
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AllInclusive/>
                    </Avatar>
                    <Typography component="h2" variant="h4">
                        Выберите верный вариант ответа
                    </Typography>
                    <Paper className={classes.lobbyPaper}>
                        <UserTask playerID={playerID} answersAndIds={answersAndIds} question={qText} questionID={qID}
                                  waiting={waiting}
                                  setWaiting={(state) => setWaiting(state)}/>
                    </Paper>

                </div>
            </Container>
        </div>

    );
}
export default RoundTwo;