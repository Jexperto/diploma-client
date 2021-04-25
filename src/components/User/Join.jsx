import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Cloud from '@material-ui/icons/Cloud';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useStyles from "../../resources/styles";


const Join = ({history}) => {
    const classes = useStyles();
    const codeRef = React.useRef()
    const nickRef = React.useRef()
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <Cloud/>
                </Avatar>
                <Typography component="h1" variant="h4">
                    Подключение
                </Typography>

                <form className={classes.form} noValidate onSubmit={
                    (event => {
                        event.preventDefault()
                        history.push(`/connect?code=${codeRef.current.value}&nickname=${nickRef.current.value}`)
                    })
                }>
                    <TextField
                        inputRef={codeRef}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="code"
                        label="Код комнаты"
                        id="code"
                        autoFocus
                    />
                    <TextField
                        inputRef={nickRef}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="nickname"
                        label="Имя"
                        name="nickname"

                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Подключиться
                    </Button>

                </form>
            </div>
        </Container>
    );
}
export default Join;