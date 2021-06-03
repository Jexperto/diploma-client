import {act} from "react-dom/test-utils";

const initialState = {
    users: {}, // { userUUID : {userName, teamUUID} }
    admin: {}, // {adminUUID, adminName}
    currentUser: "", //userUUID
    code: "",
    teams: {}, // {teamUUID : teamName}
    teamToColor: {},
    questions: {}, // {questionUUID : {questionText, answer} }  --  [{question_id: "", string:""}]
    currentQuestion: {}, // {teamUUID : {questionUUID, questionText, answers}}  --  {questionUUID, questionText, [id,answer]}
    timer: 0,
    currentRound: 0,
    error: {},
    points: {}, // {teamUUID: value}
    maxAns: {}, // {teamUUID: value}
    teamAnswers: {}, //[{teamUUID,questionUUID,answer, correct}]  (for second round)-- round1 -> {teamUUID:count} (for first round)
    pointsModifiers: {right: 1000, wrong: 500},
    teamsWithQuestions: [] // [{"team_id":"123","question_ids":["123","123"]}]
};

function getTeamByQuestion(questionUUID, state) {
    console.log("------------")
    if (state.hasOwnProperty("teamsWithQuestions")) {
        const TWQ = state?.teamsWithQuestions;
        for (const index in TWQ) {
            const team = TWQ[index]
            console.log("team --", team)
            if (team.hasOwnProperty("question_ids")) {
                const questions = team?.question_ids;
                console.log("questions --", questions)
                for (const question in questions) {
                    console.log("question --", questions[question])
                    if (questions[question] === questionUUID) {
                        return team?.team_id;
                    }
                }
            }
        }
    }
    return undefined;
}

const reduce = (state = initialState, action) => {
    switch (action.type) {
        case "ERROR":
            return {
                ...state,
                error: action.error
            };
        case "ROOM_CREATED":
            return {
                ...state,
                code: action.code,
                admin: {adminUUID: action.adminUUID, adminName: action.adminName}
            };
        case "ROOM_JOINED":
            const newUsers = {...state.users,}
            newUsers[action.userUUID] = {userName: action.userName}
            return {
                ...state,
                code: action.code,
                users: newUsers,
                currentUser: action.userUUID,
            };
        case "USER_ROUND1_QUESTION_UPDATED":
            return {
                ...state,
                questions: action.questions
            };

        case "INITIAL_QUESTIONS_SET":
            return {
                ...state,
                questions: action.questions
            };
        case "QUESTION_ADDED":
            const newQuestion = {...state.questions}
            newQuestion[action.questionUUID] = {questionText: action.questionText, answer: action.answer}
            return {
                ...state,
                questions: newQuestion
            };
        case "TEAM_TO_COLOR":
            const newTeamToColor = {...state.teamToColor}
            newTeamToColor[action.teamUUID] = action.color;
            return {
                ...state,
                teamToColor: newTeamToColor
            };
        case "CURRENT_QUESTION_ADDED":
            if (action.teamUUID) {
                const newQuestion = {...state.currentQuestion}
                newQuestion[action.teamUUID] = {
                    questionUUID: action.questionUUID,
                    questionText: action.questionText,
                    answers: action.answers
                }
                return {
                    ...state,
                    currentQuestion: newQuestion
                };
            }
            return {
                ...state,
                currentQuestion: {
                    questionUUID: action.questionUUID,
                    questionText: action.questionText,
                    answers: action.answers
                }
            };
        case "ROUND_STARTED":
            return {
                ...state,
                currentRound: action.number
            };
        case "USER_ADDED":
            const newNewUsers = {...state.users,}
            newNewUsers[action.userUUID] = {userName: action.userName, teamUUID: action.teamUUID}

            return {
                ...state,
                users: newNewUsers,
            };

        case "TEAM_LIST_UPDATED":
            return {
                ...state,
                teams: action.teams
            };
        case "USER_TEAMS_SET":
            const userTeams = {}
            action.users.forEach((user) => {
                userTeams[user.pl_id] = {userName: user.nick, teamUUID: user.team_id}
            })
            return {
                ...state,
                users: userTeams,
            };
        case "TEAM_JOINED":
            const updateUserTeam = {...state.users,}
            const userName = updateUserTeam[action.userUUID].userName
            updateUserTeam[action.userUUID] = {userName: userName, teamUUID: action.teamUUID}
            return {
                ...state,
                users: updateUserTeam,
            };
        case "TIMER_SET":
            return {
                ...state,
                timer: action.value
            };
        case "POINTS_CHANGED":
            const newPoints = {...state.points}
            newPoints[action.teamUUID] += action.value
            return {
                ...state,
                points: newPoints
            };
        case "POINTS_INCREMENTED":
            const newIncPoints = {...state.points}
            let team;
            let pointsRes = 0;
            if (action.correct === true) {
                team = action.teamUUID;
                pointsRes = {...state.pointsModifiers}.right;
            } else {
                team = getTeamByQuestion(action.questionUUID, state);
                pointsRes = {...state.pointsModifiers}.wrong;
            }
            newIncPoints[team] = (newIncPoints[team] + pointsRes) || pointsRes;
            console.log("newIncPoints", newIncPoints, "pointsRes", pointsRes)
            return {
                ...state,
                points: newIncPoints
            };
        case "TEAM_ANSWERED":
            const newTeamAnswers = (Array.isArray(state.teamAnswers)) ? {...state}.teamAnswers : [];
            newTeamAnswers.push({
                teamUUID: action.teamUUID,
                questionUUID: action.questionUUID,
                answer: action.answer,
                correct: action.correct
            })
            return {
                ...state,
                teamAnswers: newTeamAnswers,
            };
        case "TEAM_WR_ANS":
            const roundOneTeamAns = {...state.teamAnswers}
            const teamUUID = state.users[action.userUUID].teamUUID;
            if (!teamUUID)
                return;
            roundOneTeamAns[teamUUID] = ++roundOneTeamAns[teamUUID] || 1;
            return {
                ...state,
                teamAnswers: roundOneTeamAns,
            };
        case "USER_TEAM_WR_ANS":
            return {
                ...state,
                teamAnswers: ++state.teamAnswers || 1,
            };
        case "MAX_ANS":
            return {
                ...state,
                maxAns: action.maxAns,
            }
        case "TWQ":
            return {
                ...state,
                teamsWithQuestions: action.values,
            };
        default:
            return state;
    }
}

export default reduce;
export {initialState}