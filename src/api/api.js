import axios from 'axios'

const verbose = true;

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
    createGroup(userdata, onSuccess, onError) {
        doPost('api/new-wg', userdata, onSuccess, onError);
    },
    fetchUserData(token, onSuccess, onError) {
        doGet("/api/auth/profile", token, onSuccess, onError );
    },
    fetchGroupData(token, onSuccess, onError) {
        doGet("/api/auth/wg", token, onSuccess, onError );
    }

};