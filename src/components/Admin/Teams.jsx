import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {
    Fab,
    Grid,
} from "@material-ui/core";
import Team from "../team/Team";
import Typography from "@material-ui/core/Typography";
import {PlayArrow} from "@material-ui/icons";
import theme from "../../resources/theme";
import Button from "@material-ui/core/Button";
import ApplicationBar from "../AppBar";
import {useDispatch, useSelector} from "react-redux";
import {getWebSocket} from "../../store/websocket";
import {teamsStyles} from "../team/styles";
import {Redirect} from "react-router-dom";
import {useColors} from "../../resources/colors";
import {teamColorDispatch} from "../../store/actions/messageActions";

const useStyles = teamsStyles();

const Teams = ({history}) => {
    const classes = useStyles();
    const ws = getWebSocket();
    const dispatch = useDispatch();
    const selTeams = useSelector(state => state.teams);
    const selUsers = useSelector(state => state.users);
    const code = useSelector(state => state.code);
    const colors = React.useMemo(() => useColors(code), [])
    const selRound = useSelector(state => state.currentRound)
    const [teamsArray, setTeamsArray] = React.useState([]);
    React.useEffect(() => {
        let tempTeams = {}
        for (let key in selTeams) {
            tempTeams[key] = {teamName: selTeams[key], users: []}
        }
        for (let key in selUsers) {
            const team = tempTeams[selUsers[key].teamUUID];
            if (team)
                team.users.push({userName: selUsers[key].userName, userUUID: key, key: key})
        }
        setTeamsArray(Object.keys(tempTeams).map((key) => {
            return {teamUUID: key, teamName: tempTeams[key].teamName, users: tempTeams[key].users}
        }).sort((a, b) => {
            return (a.teamUUID < b.teamUUID ? -1 : 1)
        }))
    }, [selTeams, selUsers])
    // console.log(teamsArray.sort((a, b) => { return (a.teamUUID<b.teamUUID?-1:1)}))
    if (selRound > 0) {
        return <Redirect to={"/round1admin"}/>
    }

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
                {teamsArray.map((data, index) => (
                    <Grid item xs={12} lg={6} key={data.teamUUID}>
                        <Team teamUUID={data.teamUUID} teamName={`${data.teamName}`} users={data.users}
                              color={(()=>{{dispatch(teamColorDispatch(data.teamUUID,colors[index][500]))
                                  return colors[index][500]}})()}>
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
                    <Fab color="primary" aria-label="play" onClick={(event => {
                        ws.sendMessage("start", {num: 1, timer: 60})
                        history.push("/round1admin") //TODO: Track empty teams
                    })}>
                        <PlayArrow/>
                    </Fab>
                </Container>
            </footer>
        </>
    );
}
export default Teams;