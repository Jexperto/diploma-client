import {makeStyles} from "@material-ui/core/styles";
import {fade} from "@material-ui/core";

const styles = makeStyles((theme) => ({
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
export function teamsStyles(){
    return styles;
}
export default teamsStyles;

