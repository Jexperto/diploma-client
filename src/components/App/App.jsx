import React from "react";

import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom"
import {ThemeProvider} from '@material-ui/core/styles';

import Join from '../User/Join'
import Lobby from '../Lobby'
import './App.css';
import theme from '../../resources/theme'

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route path={"/"} render={({}) => {
                        return (<div className="App">
                            <h2>
                                This is Homepage!
                            </h2>
                            <Link to={"/lobby"}>ToAuth</Link>
                        </div>)
                    }}
                           exact={true}>
                    </Route>
                    <Route path={'/lobby'} component={Lobby}/>
                    <Route path={'/join'} component={Join}/>
                </Switch>
            </Router>
        </ThemeProvider>
    )


    // return (
    //     <Router>
    //         <Switch>
    //             <Route path={"/ff"} render={({history, location, match}) => {
    //                 return (<div className="App" onClick={() => console.log("FFFFFFFFFFFFFFFFFFFFFF")}>
    //                     <header className="App-header">
    //                         <img src={logo} className="App-logo" alt="logo"/>
    //                         <p>
    //                             Обхуесось <code>src/App.js</code> and save to reload.
    //                         </p>
    //                         <a
    //                             className="App-link"
    //                             href="https://reactjs.org"
    //                             target="_blank"
    //                             rel="noopener noreferrer"
    //                         >
    //                             Learn React
    //                         </a>
    //                         <Link to={"/ff/gg"}>Нажми</Link>
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
    //                     <Link to={"/ff"}>И ещё разок, а?</Link>
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
