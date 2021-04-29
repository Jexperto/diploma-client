const errorDispatch = (error) => {
    return {
        type: "ERROR",
        error,
    };
}

const roomDispatch = (code, adminUUID, adminName) => {
    return {
        type: "ROOM_CREATED",
        code,
        adminUUID,
        adminName,
    };
}
const joinDispatch = (code, userUUID, username) => {
    return {
        type: "ROOM_JOINED",
        code,
        userUUID,
        username,
    };
}
const questionDispatch = (questionUUID, questionText, answer) => {
    return {
        type: "QUESTION_ADDED",
        questionUUID,
        questionText,
        answer,
    };
}

const currentQuestionDispatch = (questionUUID, answers, questionText="", teamUUID="") => {
    return {
        type: "CURRENT_QUESTION_ADDED",
        questionUUID,
        questionText,
        answers,
        teamUUID,
    };
}

const roundDispatch = (number) => {
    return {
        type: "ROUND_STARTED",
        number,
    };
}

const userDispatch = (userUUID, username, team) => {
    return {
        type: "USER_ADDED",
        userUUID,
        username,
        team,
    }
}

const teamDispatch = (teamUUID, teamName) => {
    return {
        type: "TEAM_ADDED",
        teamUUID,
        teamName,
    }
}

const userJoinTeamDispatch = (userUUID, teamUUID) => {
    return {
        type: "TEAM_JOINED",
        teamUUID,
        userUUID,
    }
}

const timerDispatch = (value) => {
    return {
        type: "TIMER_SET",
        value,
    }
}

const pointsDispatch = (teamUUID, value) => {
    return {
        type: "POINTS_CHANGED",
        teamUUID,
        value,
    }
}

const teamAnswerDispatch = (teamUUID, questionUUID, correct) => {
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