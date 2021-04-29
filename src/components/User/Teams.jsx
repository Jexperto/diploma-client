import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {
    Divider,
    Fab,
    fade,
    Grid, IconButton,
    List,
    ListItem, ListItemIcon, ListItemText,
} from "@material-ui/core";
import Team from "../Team";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {Menu, PlayArrow, Inbox, Mail, Cancel, Add} from "@material-ui/icons";
import theme from "../../resources/theme";
import Button from "@material-ui/core/Button";
import ApplicationBar from "../AppBar";
import {useSelector} from "react-redux";
import websocket from "../../store/websocket";

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

const colors = [
    "blue","red","orange","purple"
];

const Teams = ({history}) => {
    const classes = useStyles();
    const ws = websocket;
    const selTeams = useSelector(state => state.teams);
    const selUsers = useSelector(state => state.users);
    const code = useSelector(state => state.code);
    let tempTeams = {}
    for (let key in selTeams){tempTeams[key] = {teamName:selTeams[key], users:[]}}

    for (let key in selUsers){
        const team = tempTeams[selUsers[key].userTeam];
        if (team)
            tempTeams[team].users.add({username:selUsers[key].username, userUUID:key,key:key})
    }
    const teamsArray = Object.keys(tempTeams).map((key) => {
        return {teamUUID: key, teamName:tempTeams[key].teamName, users:tempTeams[key].users}
    });
    console.log(teamsArray)
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
                {teamsArray.map((data,index) => (
                    <Grid item xs={12} lg={6}>
                        <Team key={data.teamUUID} teamUUID={data.teamUUID} teamName={`${data.teamName}`} users={data.users} color={colors[index]}>
                            <Button aria-label="join">
                                <Add color="primary"/>
                            </Button>
                        </Team>
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