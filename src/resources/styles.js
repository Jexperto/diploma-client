import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
       // marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    root: {
        flexGrow: 1,
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    lobbyPaper:{
        width: '100%',
        marginTop: theme.spacing(1),
        padding:theme.spacing(3)
    },
    lobbyButton:{
        margin: theme.spacing(2, 2, 0, 0),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    center: {
        position:"absolute",
        top:0,
        bottom:0,
        left:0,
        right:0,
        overflow:"auto",
        display: 'flex',
        justifyContent:'center',
        alignItems:"top",
},


}));

export default useStyles;