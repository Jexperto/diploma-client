import React from "react";

import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom"
import {ThemeProvider} from '@material-ui/core/styles';

import Join from '../User/Join'
import Lobby from '../Lobby'
import AdminLobby from '../Admin/Lobby'
import './App.css';
import theme from '../../resources/theme'
import AdminTeams from "../Admin/Teams";
import Teams from "../User/Teams";
import RoundOneUser from "../User/RoundOne";
import RoundTwoUser from "../User/RoundTwo";
import UserFinish from "../User/Finish";
import RoundOneAdmin from "../Admin/RoundOne";
import AddQuestions from "../Admin/AddQuestions";
import RoundTwoAdmin from "../Admin/RoundTwo";
import {Provider} from "react-redux";
import store from "../../store/store";
import Intermission from "../Admin/Intermission";
import Results from "../Admin/Results";
import About from "../About";

// const websocketConnection = new Connection("admin",store.dispatch);
 window.store = store;
function App() {
    return (
        <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/lobby" />
                    </Route>
                    <Route path={'/lobby'} component={Lobby}/>
                    <Route path={'/adminLobby'} component={AdminLobby}/>
                    <Route path={'/round1user'} component={RoundOneUser}/>
                    <Route path={'/round1admin'} component={RoundOneAdmin}/>
                    <Route path={'/round2admin'} component={RoundTwoAdmin}/>
                    <Route path={'/round2user'} component={RoundTwoUser}/>
                    <Route path={'/join'} component={Join}/>
                    <Route path={'/AddQuestions'} component={AddQuestions}/>
                    <Route path={'/adminTeams'} component={AdminTeams}/>
                    <Route path={'/teams'} component={Teams}/>
                    <Route path={'/userFinish'} component={UserFinish}/>
                    <Route path={'/intermission'} component={Intermission}/>
                    <Route path={'/results'} component={Results}/>
                    <Route path={'/about'} component={About}/>


                </Switch>
            </Router>
        </ThemeProvider>
        </Provider>
    )

    // return (
    //     <Router>
    //         <Switch>
    //             <Route path={"/ff"} render={({history, location, match}) => {
    //                 return (<div className="App" onClick={() => console.log("FFFFFFFFFFFFFFFFFFFFFF")}>
    //                     <header className="App-header">
    //                         <img src={logo} className="App-logo" alt="logo"/>
    //                         <p>
    //                             ?????????????????? <code>src/App.js</code> and save to reload.
    //                         </p>
    //                         <a
    //                             className="App-link"
    //                             href="https://reactjs.org"
    //                             target="_blank"
    //                             rel="noopener noreferrer"
    //                         >
    //                             Learn React
    //                         </a>
    //                         <Link to={"/ff/gg"}>??????????</Link>
    //                     </header>
    //                 </div>)
    //             }
    //             } exact={true}>
    //             </Route>
    //             <Route path={"/ff/gg"} render={({}) => {
    //                 return (<div className="App">
    //                     <h2>
    //                         HELLO !!!
    //                     </h2>
    //                     <Link to={"/ff"}>?? ?????? ??????????, ???</Link>
    //                 </div>)
    //             }}
    //                    exact={true}>
    //             </Route>
    //             <Route render={()=>{
    //                 return <Redirect to={"/ff"}/>
    //             }}>
    //
    //             </Route>
    //         </Switch>
    //     </Router>
    // )

}

export default App;
