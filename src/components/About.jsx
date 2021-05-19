import useStyles from "../resources/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import AllInclusive from "@material-ui/icons/AllInclusive";
import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../resources/theme";
import Button from "@material-ui/core/Button";

const aboutStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const About = ({history}) => {
    const rootClasses = useStyles();
    const classes = aboutStyles();
    const bull = <span className={classes.bullet}>•</span>;
    return (
        <div className={rootClasses.top}>
            <Container component="main" maxWidth="xs" style={{position:"relative", top:100}} >
                <CssBaseline/>
                <div className={rootClasses.paper}>
                    <Avatar className={rootClasses.avatar}>
                        <AllInclusive/>
                    </Avatar>
                    <Typography component="h1" variant="h4">
                        Правила
                    </Typography>

                    <Paper className={rootClasses.lobbyPaper}>
                        <Typography className={classes.pos} color="textSecondary" gutterBottom>
                            Правила викторины:
                        </Typography>

                        <Typography variant="body2" component="p">

                            Уважаемый Участник! В нашей викторине правила максимально просты! Обмани соперника и не обманись Сам!
                            <br />
                            <br />
                            Викторина состоит из двух этапов:
                            <br />

                            В первом этапе ты и твои сокомандники видят вопросы, на которые будут отвечать ваши противники в следующем этапе. Ваша задача придумать на этот вопрос не правильный ответ так, чтобы соперники выбрали его. За это вы получите баллы, а они нет.
                            <br />
                            <br />
                            Во втором этапе вы отвечаете на вопросы с "ловушками" от ваших соперников. БУдьте внимательны и не ошибитесь, а то мало того что сами не получите баллы, так еще и отдадите их в лапы ваших соперников!
                            <br />

                            По окончанию второго этапа вы увидете результат! Надеемся победите имено Вы!

                        </Typography>
                        <Typography variant="h6" component="h2">
                            Удачи!
                        </Typography>
                    </Paper>
                </div>
                <footer className={rootClasses.footer} style={{left: theme.spacing(3),}}>
                    <Container>
                        <Button variant="outlined" color="secondary" onClick={() => {
                            history.push("/lobby")
                        }}>
                            Назад
                        </Button>
                    </Container>
                </footer>
            </Container>
        </div>

    );
}
export default About;