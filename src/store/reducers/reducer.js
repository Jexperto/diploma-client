import {act} from "react-dom/test-utils";

const initialState = {
    users: {}, // { userUUID : {userName, teamUUID} }
    admin: {}, // {adminUUID, adminName}
    currentUser: "", //userUUID
    code: "",
    teams: {}, // {teamUUID : teamName}
    questions: {}, // {questionUUID : {questionText, answer} }  -- [{question_id: "", string:""}]
    currentQuestion: {}, // {questionUUID, questionText, [id,answer]} -- {teamUUID : {questionUUID, answers}}
    timer: 0,
    currentRound: 0,
    error: "",
    points: {}, // {teamUUID: value}
    teamAnswer: {} //{teamUUID,questionUUID, correct}
};

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
                currentQuestion: {questionUUID:action.questionUUID, questionText:action.questionText, answers:action.answers}
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
            action.users.forEach((user)=>{
                userTeams[user.pl_id] = {userName: user.nick, teamUUID: user.team_id}
            })
            return {
                ...state,
                users: userTeams,
            };
        case "TEAM_JOINED":
            const updateUserTeam = {...state.users,}
            const userName = updateUserTeam[action.userUUID].userName
            updateUserTeam[action.userUUID] = {userName: userName,teamUUID: action.teamUUID}
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
            newPoints[action.teamUUID]+=action.value
            return {
                ...state,
                points: newPoints
            };
        case "TEAM_ANSWERED":
            return {
                ...state,
                teamUUID: action.teamUUID,
                questionUUID: action.questionUUID,
                correct: action.correct,
            };
        default:
            return state;
    }
}

export default reduce;
export {initialState}