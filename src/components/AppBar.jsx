import React from "react";
import {
    AppBar,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar
} from "@material-ui/core";
import {Cancel, Menu} from "@material-ui/icons";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

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
    toolbar: theme.mixins.toolbar,

}));


const ApplicationBar = (props) => {
    const classes = useStyles();
    const drawer = (
        <div>
            <div className={classes.toolbar}/>
            <Divider/>
            <List>
                <ListItem button key={"Закрыть сессию"}>
                    <ListItemIcon> <Cancel/></ListItemIcon>
                    <ListItemText primary={"Закрыть сессию"}/>
                </ListItem>
            </List>
        </div>
    );
    const [drawerState, setDrawerState] = React.useState(false);
    const toggleDrawer = () => {
        setDrawerState(!drawerState);
    };
    return (
        <>
            <CssBaseline/>
                <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                                    onClick={toggleDrawer}>
                            <Menu/>
                        </IconButton>
                        <Typography className={classes.title} variant="h5" noWrap>
                            {props.title}
                        </Typography>
                        {props.children}
                    </Toolbar>
                </AppBar>
                <Drawer anchor="left" open={drawerState} onClose={toggleDrawer}>
                    {drawer}
                </Drawer>
            </div>
        </>
    );
}

export default ApplicationBar;