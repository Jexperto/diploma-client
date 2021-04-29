const errorDispatch = (error) => {
    console.log(error);
    return {
        type: "ERROR",
        error,
    };
}

const roomDispatch = (code, adminUUID, adminName) => {
    console.log(code, adminUUID, adminName);
    return {
        type: "ROOM_CREATED",
        code,
        adminUUID,
        adminName,
    };
}
const joinDispatch = (code, userUUID, username) => {
    console.log(code, userUUID, username);
    return {
        type: "ROOM_JOINED",
        code,
        userUUID,
        username,
    };
}
const questionDispatch = (questionUUID, questionText, answer) => {
    console.log(questionUUID, questionText, answer);
    return {
        type: "QUESTION_ADDED",
        questionUUID,
        questionText,
        answer,
    };
}
export const userQuestionDispatch = (questions) => {
    console.log(questions);

    return {
        type: "USER_ROUND1_QUESTION_UPDATED",
        questions
    };
}

const currentQuestionDispatch = (questionUUID, answers, questionText="", teamUUID="") => {
    console.log(questionUUID, answers, questionText, teamUUID);

    return {
        type: "CURRENT_QUESTION_ADDED",
        questionUUID,
        questionText,
        answers,
        teamUUID,
    };
}

const roundDispatch = (number) => {
    console.log(number);

    return {
        type: "ROUND_STARTED",
        number,
    };
}

const userDispatch = (userUUID, username, team) => {
    console.log(userUUID, username, team);

    return {
        type: "USER_ADDED",
        userUUID,
        username,
        team,
    }
}

const teamDispatch = (teams) => {
    console.log(teams);

    return {
        type: "TEAM_LIST_UPDATED",
        teams,
    }
}

const userJoinTeamDispatch = (userUUID, teamUUID) => {
    console.log(userUUID, teamUUID);

    return {
        type: "TEAM_JOINED",
        teamUUID,
        userUUID,
    }
}

const timerDispatch = (value) => {
    console.log(value);

    return {
        type: "TIMER_SET",
        value,
    }
}

const pointsDispatch = (teamUUID, value) => {
    console.log(teamUUID, value);

    return {
        type: "POINTS_CHANGED",
        teamUUID,
        value,
    }
}

const teamAnswerDispatch = (teamUUID, questionUUID, correct) => {
    console.log(teamUUID, questionUUID, correct);

    return {
        type: "TEAM_ANSWERED",
        questionUUID,
        correct,
    }
}

export {
    currentQuestionDispatch,
    roomDispatch,
    joinDispatch,
    pointsDispatch,
    questionDispatch,
    roundDispatch,
    errorDispatch,
    teamDispatch,
    timerDispatch,
    userDispatch,
    userJoinTeamDispatch,
    teamAnswerDispatch
}