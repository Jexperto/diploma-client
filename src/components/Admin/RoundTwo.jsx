import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
    Box, CircularProgress, Grid,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../resources/theme";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {width} from "@material-ui/system";
import ApplicationBar from "../AppBar";
import {useSelector} from "react-redux";
import {useColors} from "../../resources/colors";
import {isEmpty} from "../../utils/functions";
import {Redirect} from "react-router-dom";
import useStyles from "../../resources/styles";

const useRoundTwoStyles = makeStyles((theme) => ({
    progress: {
        flexGrow: 1
    },
    footer: {
        margin: theme.spacing(1), // You might not need this now
        position: "fixed",
        bottom: theme.spacing(2),

    },
    card: {
        display: 'flex',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),

    },
    cardDetails: {
        flex: 1,
    },
    square: {
        float: 1,
        height: 4,
        fill: width,
    },

}));

const questionStyles = makeStyles((theme) => ({
    square: {
        float: 1,
        height: 4,
        fill: width,
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    question: {
        marginTop: theme.spacing(5),
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
    card: {},
    cardContent: {},
}));

function Timer(props) {
    return (
        <Box position="relative" display="inline-flex" width={props.size} height={props.size}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography style={{fontSize: props.size / 4}} variant="caption" component="div"
                            color="textSecondary">{`${Math.round(
                    props.time,
                )}`}</Typography>
            </Box>
        </Box>
    );
}

const TeamTask = (props) => {
    const classes = questionStyles()
    const [colorState, setColorState] = React.useState("#FFFFFF")
    React.useEffect(() => {
        if (props.completed?.value === true) { // && props.questionUUID === props.completed?.questionUUID
            if (props.completed?.correct === true)
                setColorState("#00FF00")
            else
                setColorState("#FF0000")
        } else
            setColorState("#000000")
    }, [props.completed, props.questionUUID])

    return (
        <CardContent>
            <Typography component="h1" variant="h5">
                {`${props.team.teamName}`}
            </Typography>
            <div className={`${classes.square}`} style={{background: props.color}}/>
            <Typography className={classes.question} component="h2" variant="h4">
                {props.question}
            </Typography>

            <Grid container spacing={4}>
                {props.answers.map((ans) => (
                    <Grid key={ans} item xs={12} lg={6}>
                        <Card variant="outlined" className={classes.card}>
                            <CardContent className={classes.cardContent}>
                                <Typography className={classes.answer} style={(() => {
                                    if (props.completed?.value === true && props.completed?.answer === ans) {
                                        return {color: colorState}
                                    }
                                    return {color: "#000000"}
                                })()} component="h1" variant="h5">
                                    {`${ans}`}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

            </Grid>

        </CardContent>
    )
}
const factor = 1;
const RoundTwo = ({history}) => {
    const classes = useRoundTwoStyles();
    const globalStyles = useStyles();
    const questions = useSelector(state => state.questions);
    const teamAns = useSelector(state => state.teamAnswers);
    const currentQuestion = useSelector(state => state.currentQuestion);
    const round = useSelector(state => state.currentRound);
    const teams = useSelector(state => state.teams);
    const timer = useSelector(state => state.timer);
    const colors = useColors();
    const [ansCount, setAnsCount] = React.useState(teamAns?.length || 0);
    const [questionCount, setQuestionCount] = React.useState(0);
    const [questionCompleted, setQuestionCompleted] = React.useState({});
    React.useEffect(() => {
        if (teamAns.length > ansCount) {
            setAnsCount(ansCount + 1)
            setQuestionCompleted(() => {
                const tempQC = {...questionCompleted}
                tempQC[teamAns[ansCount].teamUUID] = {
                    value: true,
                    questionUUID: teamAns[ansCount].questionUUID,
                    answer: teamAns[ansCount].answer,
                    correct: teamAns[ansCount].correct
                }
                return tempQC;
            })
        }
    }, [teamAns.length, ansCount])

    React.useEffect(() => {
        setQuestionCount(questionCount + 1)
        Object.keys(currentQuestion).forEach((teamUUID) => {
            setQuestionCompleted(() => {
                const tempQC = {...questionCompleted}
                tempQC[teamUUID] = {value: false}
                return tempQC;
            })
        })
    }, [currentQuestion])

    const [teamsArray, setTeamsArray] = React.useState([]);
    React.useEffect(() => {
        setTeamsArray(Object.keys(teams).map((key) => {
            return {teamUUID: key, teamName: teams[key]}
        }).sort((a, b) => {
            return (a.teamUUID < b.teamUUID ? -1 : 1)
        }));
    }, [teams])


    const progressCoefficient = React.useMemo(() => timer / 100.0, [timer]);
    const increment = React.useMemo(() => 1 / progressCoefficient / factor, [progressCoefficient]);
    const [timerProgress, setTimerProgress] = React.useState(100);

    React.useEffect(() => {
        setTimerProgress(100);
        const interval = setInterval(() => {
            if (timerProgress > 0)
                setTimerProgress((progress) => (progress - increment));
        }, 1000 / factor);
        return (() => {
            clearInterval(interval)
        })
    }, [timer, currentQuestion]);


    if (round < 0 || isEmpty(currentQuestion)) {
        if (round === -2 && timerProgress <= 0)
            return (<Redirect to={"/results"}/>);
        return (
            <div className={globalStyles.center}>
                <CircularProgress color={"primary"}/>
            </div>
        );
    }

    return (
        <>
            <CssBaseline/>
            <ApplicationBar title={"Выберите верный вариант ответа"}/>
            <Grid container spacing={4}>
                {teamsArray.map((team, index) => (
                    <Grid key={team.teamUUID} item xs={12} lg={6}>
                        <Card className={classes.card}>
                            <div className={classes.cardDetails}>
                                <TeamTask completed={questionCompleted[team.teamUUID]}
                                          color={colors[index][500] || colors[0][500]} team={team}
                                          answers={currentQuestion[team.teamUUID]?.answers || []}
                                          question={questions[currentQuestion[team.teamUUID]?.questionUUID]?.questionText}
                                          questionUUID={currentQuestion[team.teamUUID]?.questionUUID}/>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <footer className={classes.footer} style={{left: theme.spacing(3),}}>
                <Timer size={80} value={timerProgress} time={timerProgress * progressCoefficient}/>
            </footer>
        </>
    );
}

export default RoundTwo;