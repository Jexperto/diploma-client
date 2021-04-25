import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {CardActionArea, Grid, Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import AllInclusive from "@material-ui/icons/AllInclusive";
import useStyles from "../../resources/styles";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import {width} from "@material-ui/system";

function handleConnect(e){
    console.log("Connect was clicked");

}
function handleRools(e){
    console.log("Rools was clicked");
}
function handleExit(e){
    console.log("Exit was clicked");
}

const questionStyles = makeStyles((theme) => ({
    square: {
        float: 1,
        height: 4,
        fill: width,
    },
    question:{
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(5),
        marginRight:  theme.spacing(2),
        marginLeft:  theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    answer:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
    },
    cardContent: {
    },
}));



const UserTask = (props) => {
    const classes = questionStyles()
    return (
        <>
            <Typography className={classes.question}  component="h2" variant="h4">
                {props.question}
            </Typography>

            <Grid container spacing={4} className={classes.cardGrid}>
                {props.answers.map((ans) => (
                    <Grid key={ans} item xs={12} lg={6}>
                        <Card variant="outlined" className={classes.card}>
                            <CardActionArea>
                            <CardContent className={classes.cardContent}>
                                <Typography className={classes.answer} component="h1" variant="h5">
                                    {`${ans}`}
                                </Typography>
                            </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}

            </Grid>
        </>
    )
}

const answers = ["Первый", "Второй", "Третий", "Четвертый"]


const RoundTwo = ({history}) => {
    const classes = useStyles();
    const codeRef = React.useRef()
    const nickRef = React.useRef()
    return (
        <div className={classes.center}>
            <Container component="main" maxWidth="lg" style={{position:"relative", top:100}} >
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AllInclusive/>
                    </Avatar>
                    <Typography component="h2" variant="h4">
                        Выберите верный вариант ответа
                    </Typography>
                    <Paper className={classes.lobbyPaper}>
                        <UserTask answers={answers} question={"Сколько полос у зебры?"}/>
                    </Paper>

                </div>
            </Container>
        </div>

    );
}
export default RoundTwo;