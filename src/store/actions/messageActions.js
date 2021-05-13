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
const joinDispatch = (code, userUUID, userName) => {
    console.log(code, userUUID, userName);
    return {
        type: "ROOM_JOINED",
        code,
        userUUID,
        userName,
    };
}
const initQuestionSetDispatch = (questions) => {
    console.log(questions);
    return {
        type: "INITIAL_QUESTIONS_SET",
        questions,
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

const teamAddedWrongAnswerDispatch = (userUUID, questionUUID) => {
    console.log(userUUID);
    return {
        type: "TEAM_WR_ANS",
        userUUID,
    };
}
const userAddedWrongAnswerDispatch = (userUUID) => {
    console.log(userUUID);
    return {
        type: "USER_TEAM_WR_ANS",
        userUUID,
    };
}

export const userQuestionDispatch = (questions) => {
    console.log(questions);

    return {
        type: "USER_ROUND1_QUESTION_UPDATED",
        questions
    };
}

const currentQuestionDispatch = (questionUUID, answers, questionText = "", teamUUID = "") => {
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

const userDispatch = (userUUID, userName, teamUUID) => {
    console.log(userUUID, userName, teamUUID);

    return {
        type: "USER_ADDED",
        userUUID,
        userName,
        teamUUID,
    }
}

const teamDispatch = (teams) => {
    console.log(teams);

    return {
        type: "TEAM_LIST_UPDATED",
        teams,
    }
}

const teamColorDispatch = (teamUUID,color) => {
    console.log(teamUUID,color);

    return {
        type: "TEAM_TO_COLOR",
        teamUUID,color
    }
}


const setUserJoinTeamDispatch = (users) => {

    return {
        type: "USER_TEAMS_SET",
        users
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

const teamsWithQuestionsDispatch = (values) => {
    console.log(values);

    return {
        type: "TWQ",
        values,
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

const pointsIncDispatch = (teamUUID,questionUUID, correct) => {
    console.log(teamUUID, correct);

    return {
        type: "POINTS_INCREMENTED",
        teamUUID,
        questionUUID,
        correct,
    }
}

const maxAnsDispatch = (teams) => {
    console.log(teams);
    const maxAns = {}
    teams.forEach((team) => {
        console.log(team)
        maxAns[team.team_id] = team.value;
        console.log(team.team_id, team.value)
    })
    console.log(maxAns)

    return {
        type: "MAX_ANS",
        maxAns
    }
}

const teamAnswerDispatch = (teamUUID, questionUUID, answer, correct) => {
    console.log("teamAnswerDispatch", teamUUID, questionUUID, answer, correct);
    return {
        type: "TEAM_ANSWERED",
        teamUUID,
        questionUUID,
        answer,
        correct,
    }
}

const userAnswerDispatch = (userUUID, questionUUID, answer, correct) => {
    console.log("userAnswerDispatch", userUUID, questionUUID, answer, correct);
    return {
        type: "USER_ANSWERED",
        userUUID,
        questionUUID,
        answer,
        correct,
    }
}

export {
    currentQuestionDispatch,
    roomDispatch,
    joinDispatch,
    pointsDispatch,
    pointsIncDispatch,
    questionDispatch,
    roundDispatch,
    errorDispatch,
    teamDispatch,
    timerDispatch,
    userDispatch,
    userJoinTeamDispatch,
    teamAnswerDispatch,
    userAnswerDispatch,
    initQuestionSetDispatch,
    setUserJoinTeamDispatch,
    teamAddedWrongAnswerDispatch,
    userAddedWrongAnswerDispatch,
    maxAnsDispatch,
    teamColorDispatch,
    teamsWithQuestionsDispatch,
}