import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {withStyles} from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import {ClickAwayListener, Fab, Grid, IconButton, Paper} from "@material-ui/core";
import ApplicationBar from "../AppBar";
import {Add, CloseOutlined, CloseRounded, Done, PlayArrow, PlusOne} from "@material-ui/icons";
import Team from "../team/Team";
import theme from "../../resources/theme";
import {useDispatch, useSelector} from "react-redux";
import {initQuestionSetDispatch} from "../../store/actions/messageActions";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        height: 400,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    paper: {
        // marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    summary: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center"
    },
    footer: {
        margin: theme.spacing(1), // You might not need this now
        position: "fixed",
        bottom: theme.spacing(2),

    },

}));

const Question = ({history, canAddQuestions, setCanAddQuestions, question, updateQuestion}) => {
    const classes = useStyles();
    const [questionError, setError] = React.useState(undefined);
    const [questionNotEmpty, setQuestionNotEmpty] = React.useState(false);
    const [answerNotEmpty, setAnswerNotEmpty] = React.useState(false);
    return (
        <ClickAwayListener onClickAway={() => {
            if (question.question === "" || question.answer === "") {
                setError(true)
                setTimeout(() => {
                    setError(undefined)
                }, 2000)
            }

        }}>
            <div style={{
                flexGrow: 1,
                display: 'flex',
            }
            }>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <TextField
                            error={questionError}
                            //inputRef={questionRef}
                            value={question.question}
                            //defaultValue={initQuestion.question}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="question"
                            label="Текст вопроса"
                            id="question"
                            autoComplete="off"
                            onChange={(e) => {
                                updateQuestion(e.target.value, question.answer)
                                if (e.target.value === "") {
                                    setCanAddQuestions(false)
                                    setQuestionNotEmpty(false)
                                } else
                                    setQuestionNotEmpty(true)

                                if (canAddQuestions === false && questionNotEmpty && answerNotEmpty) {
                                    setCanAddQuestions(true)
                                }
                            }}
                        />
                        <TextField
                            error={questionError}
                            value={question.answer}
                            //inputRef={answerRef}
                            //defaultValue={initQuestion.answer}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="answer"
                            label="Ответ"
                            name="answer"
                            autoComplete="off"
                            onChange={(e) => {
                                updateQuestion(question.question, e.target.value)
                                if (e.target.value === "") {
                                    setCanAddQuestions(false)
                                    setAnswerNotEmpty(false)
                                } else
                                    setAnswerNotEmpty(true)
                                if (canAddQuestions === false && questionNotEmpty && answerNotEmpty) {
                                    setCanAddQuestions(true)
                                }

                            }}
                        />

                    </div>
                </Container>
            </div>
        </ClickAwayListener>

    );
}


const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);


const AddQuestions = ({history}) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const selector = useSelector(state => state.questions);
    const [questions, setQuestions] = React.useState((Array.isArray(selector) && selector[0].question !== undefined && selector[0].answer !== undefined) ? selector : [{
        question: "",
        answer: ""
    }]);
    const [expanded, setExpanded] = React.useState(questions.length-1);
    const [canAddQuestions, setCanAddQuestions] = React.useState(questions.length!==1);
    window.qst = questions;
    const handleAccordionChange = (panel) => (event) => {
        if (event.target.attributes.clickable && canAddQuestions) {
            setExpanded(panel);
        }
    };
    const addQuestion = () => {
        if (canAddQuestions) {
            setQuestions(questions => {
                const qst = [...questions];
                qst.push({question: "", answer: ""})
                setTimeout(() => {
                    setExpanded(questions.length)
                }, 100)
                return qst;
            })
            setCanAddQuestions(false)
        }
    }

    return (
        <>
            <CssBaseline/>
            <ApplicationBar title={"Добавить вопрос"}/>
            <Container component="main" maxWidth="lg">

                {questions.map((data, index) => (
                    <Accordion key={index} square expanded={expanded === index} clickable="true"
                               onClick={handleAccordionChange(index)}>
                        <AccordionSummary aria-controls={`panel${index}d-content`} id={`panel${index}d-header`}
                                          clickable="true">
                            <Typography className={classes.summary}
                                        clickable="true"> {`Вопрос №${index + 1}`}</Typography>
                            <IconButton aria-label="close" size="small" onClick={() => {
                                setQuestions(questions => {
                                    const qst = [...questions];
                                    qst.splice(index, 1)
                                    if (index === questions.length - 1)
                                        setCanAddQuestions(true)
                                    if (expanded === questions.length - 1) {
                                        setTimeout(() => {
                                            setExpanded(questions.length - 2)
                                        }, 100)
                                    } else if (index < expanded) {
                                        setExpanded(expanded - 1)
                                    }
                                    return qst;
                                })
                            }}>
                                <CloseRounded/>
                            </IconButton>

                        </AccordionSummary>
                        <AccordionDetails>
                            <Question updateQuestion={(question, answer) => {
                                setQuestions(questions => {
                                    const qst = [...questions];
                                    qst[index] = {question: question ? question : "", answer: answer ? answer : ""}
                                    return qst
                                })
                            }} canAddQuestions={canAddQuestions} setCanAddQuestions={setCanAddQuestions}
                                      question={questions[index]}/>
                        </AccordionDetails>
                    </Accordion>
                ))}

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={addQuestion}
                >
                    Добавить
                </Button>

                <footer className={classes.footer} style={{left: theme.spacing(3),}}>
                    <Container>
                        <Button variant="outlined" color="secondary" onClick={() => {
                            history.push("/adminLobby")
                        }}>
                            Назад
                        </Button>
                    </Container>
                </footer>

                <footer className={classes.footer} style={{right: theme.spacing(3),}}>
                    <Container className={classes.paper}>
                        <Fab style={{marginBottom: theme.spacing(2)}} color="secondary" aria-label="play"
                             onClick={() => {if (canAddQuestions){
                                 dispatch(initQuestionSetDispatch(questions))
                                 history.push("/adminLobby")}
                             }}>
                            <Done/>
                        </Fab>
                        <Fab color="primary" aria-label="play" onClick={addQuestion}>
                            <Add/>
                        </Fab>
                    </Container>
                </footer>

            </Container>
        </>

    );
}
export default AddQuestions;