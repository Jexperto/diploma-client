import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
    Box, CircularProgress, Divider,
    fade, Grid, LinearProgress, Toolbar,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../resources/theme";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {width} from "@material-ui/system";
import useStyles from "../../resources/styles";
import ApplicationBar from "../AppBar";
import {useSelector} from "react-redux";
import websocket, {getWebSocket} from "../../store/websocket";
import {Redirect} from "react-router-dom";
import {useColors} from "../../resources/colors";
import {isEmpty} from "../../utils/functions";

const round1Styles = makeStyles((theme) => ({
    progress: {
        flexGrow: 1
    },
    footer: {
        margin: theme.spacing(1),
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

const useTeamColorStyles = makeStyles((theme) => ({
    colorPrimary: {
        backgroundColor: props => fade(props.color, 0.15)
    },
    barColorPrimary: {
        backgroundColor: props => props.color
    }
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

const TeamDetails = ({team, maxProgress, progress, color}) => {
    let value;
    if (!maxProgress || !progress)
        value = 0;
    else
        value = ((progress / maxProgress)) * 100


    //const colorStyles = useStyles2({color: team.color || "rgb(189,12,150)"});
    const classes = round1Styles();
    return (
        <CardContent>
            <Typography component="h1" variant="h5">
                {`${team.teamName}`}
            </Typography>
            {/*<div className={`${classes.square}`} style={{background: color}}/>*/}

            <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                    <LinearProgress classes={{
                        colorPrimary: useTeamColorStyles({color: color}).colorPrimary,
                        barColorPrimary: useTeamColorStyles({color: color}).barColorPrimary
                    }} variant="determinate" value={value ?? 100}/>
                </Box>
                <Box minWidth={35}>
                    <Typography variant="body2" color="textSecondary">{`${Math.round(
                        value ?? 100,
                    )}%`}</Typography>
                </Box>
            </Box>
        </CardContent>
    )
}
const factor = 1;
const RoundOne = ({history}) => {
    const classes = round1Styles();
    const globalStyles = useStyles();
    const colors = useColors();
    const ws = getWebSocket();
    //const currentQuestion = useSelector(state => state.currentQuestion)
    //window.startRound = (num, timer) => {getWebSocket().sendMessage("start", {num: num, timer: timer})};
    const questions = useSelector(state => state.questions);
    const teamAns = useSelector(state => state.teamAnswers);
    const round = useSelector(state => state.currentRound);
    const teams = useSelector(state => state.teams);
    const maxAns = useSelector(state => state.maxAns);
    const timer = useSelector(state => state.timer);
    const teamsArray = Object.keys(teams).map((key) => {
        return {teamUUID: key, teamName: teams[key]}
    }).sort((a, b) => {
        return (a.teamUUID < b.teamUUID ? -1 : 1)
    });
    const progressCoefficient = React.useMemo(() => timer / 100.0, [timer]);
    const increment = React.useMemo(() => 1 / progressCoefficient / factor, [progressCoefficient]);
    const [timerProgress, setTimerProgress] = React.useState(100);
    React.useEffect(() => {
        const interval = setInterval(() => {
            setTimerProgress((progress) => (progress - increment));
        }, 1000 / factor);
        setTimeout(() => {
            clearInterval(interval);
        }, timer * 1000)
    }, [timer, increment]);

    React.useEffect(() => {
        let completeCount = 0;
        for (let idx in teamsArray) {
            let team = teamsArray[idx]
            if (teamAns[team.teamUUID]!==undefined && maxAns[team.teamUUID]!==undefined && teamAns[team.teamUUID] === maxAns[team.teamUUID]) {
                completeCount++;
                console.log("completeCount", completeCount)
            }
            else break;
        }
        if (completeCount===teamsArray.length){
            ws.sendMessage("skip")
            console.log("ws.sendMessage(\"skip\")")
        }
    }, [teamsArray, teamAns, maxAns]);


    if (round < 0 || isEmpty(maxAns)) {
        if (round === -1) {
            ws.sendMessage("get_twq")
            return (<Redirect to={"/intermission"}/>);
        }
        return (
            <div className={globalStyles.center}>
                <CircularProgress color={"primary"}/>
            </div>
        );
    }

    return (
        <>
            <CssBaseline/>
            <ApplicationBar title={"Подготовка командами ответов"}/>
            <Grid container spacing={4}>
                {teamsArray.map((team, index) => (
                    // {teams.map((team) => (
                    <Grid key={team.teamUUID} item xs={12} lg={6}>
                        <Card className={classes.card}>
                            <div className={classes.cardDetails}>
                                <TeamDetails color={colors[index][500]} team={team} maxProgress={(() => {
                                    // console.log("maxAns", maxAns, team.teamUUID);
                                    return maxAns[team.teamUUID];
                                })()}
                                             progress={teamAns[team.teamUUID] || 0}/>
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

export default RoundOne;