import React, {useRef, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
    Grid, Paper,
} from "@material-ui/core";
import ApplicationBar from "../AppBar";
import {useSelector} from "react-redux";
import useStyles from "../../resources/styles";
import {Bar, BarChart, CartesianGrid, Cell, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {useColors} from "../../resources/colors";
import Container from "@material-ui/core/Container";
import theme from "../../resources/theme";

const renderCustomBarLabel = ({payload, x, y, width, height, value}) => {
    return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`${value}`}</text>;
};

 //const selTeam = {"1": "Команда 1", "2": "Команда 2"}
 //const selPoints = {"1": 10000, "2": 5500}
const teamColorSelector = state => state.teamToColor;
const pointSelector = state => state.points;
const teamSelector =  state => state.teams;

const Results = ({history}) => {
    const classes = useStyles();
    const colors = useColors();
    const barRef = useRef();
    const teamToColor = useSelector(teamColorSelector);
    const selPoints = useSelector(pointSelector);
    const selTeam = useSelector(teamSelector);
    const [pointsArray, setPointsArray] = useState([]);
    React.useEffect(() => {
        setPointsArray(Object.keys(selPoints).map((key) => {
                return {team: selTeam[key], points: selPoints[key]}
            })
        )
    }, [selPoints, selTeam])

    return (
        <>
            <CssBaseline/>
            <ApplicationBar title={"Результаты"}>
            </ApplicationBar>
            <Container component="main" >
                    <Paper>
                    <BarChart
                        ref={barRef}
                        style={{  display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                            }}
                        width={1000}
                        height={600}
                        data={pointsArray}
                        margin={{
                            top: 20,  bottom: 5, right:20
                        }}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="team"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="points" name={"Очки"} barSize={60} fill={theme.palette.primary.main}
                             label={renderCustomBarLabel}>
                            {
                                pointsArray.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index][500]}/>
                                ))
                            }
                        </Bar>
                    </BarChart>
                    </Paper>
            </Container>

        </>
    );
}
export default Results;