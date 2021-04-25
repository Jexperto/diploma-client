import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {
    Box, CircularProgress,
    fade, Grid, LinearProgress, Toolbar,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../resources/theme";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {width} from "@material-ui/system";
import ApplicationBar from "../AppBar";

const useStyles = makeStyles((theme) => ({
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

const useStyles2 = makeStyles((theme) => ({
    colorPrimary: {
        backgroundColor:  props => fade(props.color,0.15)
    },
    barColorPrimary: {
        backgroundColor: props => props.color
    }
}));


const teams = [
    {
        teamUUID: "id1",
        teamName: "Team1",
        users: [
            {name: "Player1"},
            {name: "Player2"},
            {name: "Player3"},
            {name: "Player4"}
        ],
        color: "rgb(0,245,245)",
    },
    {
        teamUUID: "id2",
        teamName: "Team2",
        users: [
            {name: "LPlayer1"},
            {name: "LPlayer2"},
            {name: "LPlayer3"},
            {name: "LPlayer4"}
        ],
        color: "rgb(255,0,0)",
    },
    {
        teamUUID: "id3",
        teamName: "Team3",
        users: [
            {name: "RPlayer1"},
            {name: "RPlayer2"},
            {name: "RPlayer3"},
            {name: "RPlayer4"}
        ],
        color: "rgb(255,89,2)",
    },

];


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
                <Typography style={{fontSize:props.size/4}}  variant="caption" component="div" color="textSecondary">{`${Math.round(
                    props.value,
                )}`}</Typography>
            </Box>
        </Box>
    );
}

const TeamDetails = ({team, progress}) => {
    const classes = useStyles2({color: team.color});
    return (
        <CardContent>
            <Typography component="h1" variant="h5">
                {`${team.teamName}`}
            </Typography>
            <div className={`${classes.square}`} style={{background: team.color}}/>
            <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                    <LinearProgress classes={{
                        colorPrimary: classes.colorPrimary,
                        barColorPrimary: classes.barColorPrimary
                    }} variant="determinate" value={progress}/>
                </Box>
                <Box minWidth={35}>
                    <Typography variant="body2" color="textSecondary">{`${Math.round(
                        progress,
                    )}%`}</Typography>
                </Box>
            </Box>
        </CardContent>
    )
}

const RoundOne = ({history}) => {
    const classes = useStyles();
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);
    return (
        <>
            <CssBaseline/>
            <ApplicationBar title={"Подготовка командами ответов"}/>
            <Grid container spacing={4}>
                {teams.map((team) => (
                    <Grid key={team.teamUUID} item xs={12} lg={6}>
                        <Card className={classes.card}>
                            <div className={classes.cardDetails}>
                                <TeamDetails team={team} progress={progress}/>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <footer className={classes.footer} style={{left: theme.spacing(3),}}>
                <Timer size={80} value={progress}/>
            </footer>
        </>
    );
}

export default RoundOne;