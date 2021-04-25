import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Box, Divider, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
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
    const {team} = props;

    return (
        <Grid item xs={12} lg={6}>
            <Card className={classes.card}>
                <div className={classes.cardDetails}>
                    <CardContent>
                        <Typography component="h1" variant="h5">
                            {`${team.teamName}`}
                        </Typography>
                        <div className={`${classes.square}`} style={{background:team.color}}/>
                        <List aria-label="Team">
                            {team.users.map((user) => (
                                <React.Fragment key={user.name+"_id"}>
                                <ListItem button divider>
                                    <ListItemText primary={user.name}/>
                                </ListItem>
                                    <Divider light/>
                                </React.Fragment>
                            ))}
                        </List>
                    </CardContent>
                </div>
            </Card>
        </Grid>
    );
}

Team.propTypes = {
    post: PropTypes.object,
};