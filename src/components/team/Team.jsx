import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Box, Divider, List, ListItem, ListItemIcon, ListItemText, Toolbar} from "@material-ui/core";
import {height, width} from "@material-ui/system";
import theme from "../../resources/theme";

const useStyles = makeStyles({
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
});

export default function Team(props) {
    const classes = useStyles();
    //const team = props;
    const teamName = props.teamName;
    const users = props.users;
    const teamUUID = props.teamUUID;
    const color = props.color;
    return (
            <Card className={classes.card}>
                <div className={classes.cardDetails}>
                    <CardContent>
                        <Typography component="h1" variant="h5">
                            {`${teamName}`}
                        </Typography>
                        <div className={`${classes.square}`} style={{background:color}}/>
                        <List aria-label="Team">
                            {users.map((user) => (
                                <React.Fragment key={user.userUUID}>
                                <ListItem button divider>
                                    <ListItemText primary={user.userName}/>
                                </ListItem>
                                    <Divider light/>
                                </React.Fragment>
                            ))}
                        </List>
                    </CardContent>
                </div>
                {props.children}
            </Card>

    );
}

Team.propTypes = {
    post: PropTypes.object,
};