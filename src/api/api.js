import axios from 'axios'

const verbose = true;

function doPostAuthorized(url, token, data, onSuccess, onError) {
    axios.post(url,data,{
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
    }}).then((res) => {
        if (verbose) console.log(res);
        onSuccess(res);
    }).catch((err) => {
        if (verbose) console.log("POST to " + url + "\n Payload: " + JSON.stringify({
            headers: {
                "Authorization": "Bearer " + token
            }, data: data
        }), err)
        onError(err)
    })
}

function doPost(url, data, onSuccess, onError) {
    axios.post(url,data).then((res) => {
        if (verbose) console.log(res);
        onSuccess(res);
    }).catch((err) => {
        if (verbose) console.log("POST to " + url + "\n Payload: " + JSON.stringify(data), err)
        onError(err)
    })
}

function doGetWithParams( url, token = "" , data, onSuccess, onError ) {
    axios.get(url, {
        headers: {
            "Authorization": "Bearer " + token
        },
        params: data
    }).then((res) => {
        if (verbose) console.log(res);
        onSuccess(res);
    }).catch((err) => {
        if (verbose) console.log("GET to " + url, err)
        onError(err)
    })
}

function doGet( url, token = "", onSuccess, onError ) {
    axios.get(url, {
        headers: {
            "Authorization": "Bearer " + token
        },
    }).then((res) => {
        if (verbose) console.log(res);
        onSuccess(res);
    }).catch((err) => {
        if (verbose) console.log("GET to " + url, err)
        onError(err)
    })
}

export default {
    login(email, password, onSuccess, onError) {
        let userdata = {
            username: email,
            password: password
        };
        doPost('api/login', userdata, onSuccess, onError);
    },
    register(userdata, onSuccess, onError) {
        doPost('api/register', userdata, onSuccess, onError);
    },
    createGroup(token, onSuccess, onError) {
        doPostAuthorized('api/auth/new-wg', token, {}, onSuccess, onError);
    },
    joinGroup(token, joinId, onSuccess, onError) {
        doPostAuthorized('api/auth/join-wg', token, {inviteLink: joinId}, onSuccess, onError);
    },
    leaveGroup(token, onSuccess, onError) {
        doPostAuthorized('api/auth/leave-wg', token, {}, onSuccess, onError);
    },
    renameGroup(token, newName, onSuccess, onError) {
        doPostAuthorized('api/auth/update-wg', token, {newName: newName}, onSuccess, onError);
    },
    fetchUserData(token, onSuccess, onError) {
        doGet("/api/auth/profile", token, onSuccess, onError );
    },
    fetchGroupData(token, onSuccess, onError) {
        doGet("/api/auth/wg", token, onSuccess, onError );
    },
    searchGroup(token, query, onSuccess, onError) {
        doGetWithParams("/api/auth/search-wg", token, {query: query},onSuccess, onError );
    },
    fetchFollowedGroups(token, onSuccess, onError) {
        doGet("/api/auth/followed-wgs", token, onSuccess, onError );
    },
    followGroup(token, id,onSuccess, onError) {
        doPostAuthorized("/api/auth/follow-wg", token, {id: id}, onSuccess, onError );
    },
    fetchCurrentChallenge(token, onSuccess, onError) {
        doGet("/api/auth/current-challenge", token, onSuccess, onError );
    },
    completeCurrentChallenge(token, challengeId,onSuccess, onError) {
        doPostAuthorized("/api/auth/complete-challenge", token, {id: challengeId}, onSuccess, onError );
    },
    fetchCompletedChallenges(token, onSuccess, onError) {
        doGet("/api/auth/completed-challenges", token, onSuccess, onError );
    },
    fetchPastChallenges(token, onSuccess, onError) {
        doGet("/api/auth/past-challenges", token, onSuccess, onError );
    },
    fetchScore(token, onSuccess, onError) {
        doGet("/api/auth/score", token, onSuccess, onError );
    },
    registerPushNotifications(subscription, onSuccess, onError) {
        doPost("/api/push/register", {subscription: subscription}, onSuccess, onError)
    }

};