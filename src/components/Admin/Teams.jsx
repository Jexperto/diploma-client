import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {
    Divider,
    Fab,
    fade,
    Grid,
    List,
    ListItem, ListItemIcon, ListItemText,
} from "@material-ui/core";
import Team from "../Team";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {Menu, PlayArrow, Inbox, Mail, Cancel} from "@material-ui/icons";
import theme from "../../resources/theme";
import Button from "@material-ui/core/Button";
import ApplicationBar from "../AppBar";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: 10,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    code: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        padding: theme.spacing(1),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    footer: {
        margin: theme.spacing(1), // You might not need this now
        position: "fixed",
        bottom: theme.spacing(2),

    },
    toolbar: theme.mixins.toolbar,
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
        color: 'blue',
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
        color: 'red',
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
        color: 'orange',
    },

];

const Teams = ({history}) => {
    const classes = useStyles();
    const code = useSelector(state => state.code);
    return (
        <>
            <CssBaseline/>
            <ApplicationBar title={"Команды"}>
                <div className={classes.code}>
                    <Typography variant="h6">
                        Код комнаты: {code}
                    </Typography>
                </div>
            </ApplicationBar>


            <Grid container spacing={4} direction="row">
                    {teams.map((team) => (
                        <Grid item xs={12} lg={6}>
                        <Team key={team.teamUUID} team={team}/>
                        </Grid>
                    ))}
            </Grid>

            <footer className={classes.footer} style={{left: theme.spacing(3),}}>
                <Container>
                    <Button variant="outlined" color="secondary">
                        Назад
                    </Button>
                </Container>
            </footer>
            <footer className={classes.footer} style={{right: theme.spacing(3),}}>
                <Container>
                    <Fab color="primary" aria-label="play">
                        <PlayArrow/>
                    </Fab>
                </Container>
            </footer>
        </>
    );
}
export default Teams;