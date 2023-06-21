import axios from "axios";


let token = null;
try {
    token = localStorage.getItem("loginToken");
} catch (error) {console.log("No Logintoken yet")}

const _axios = axios.create();

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
  };

const baseUrl = "https://www2.hs-esslingen.de/~melcher/map/chat/api/"

const getAxiosClient = () => _axios;

if (window.caches) {
    caches.open("profile-cache");
}

async function register(userid, password, nickname, fullname) {
    //const response = await _axios.get(baseUrl + "register&userid=" + userid + "&password=" + password + "&nickname=" + nickname + "&fullname=" + fullname);
    const response = await axios.post(baseUrl, {
        request: "register",
        userid: userid,
        password: password,
        nickname: nickname,
        fullname: fullname
    }, axiosConfig).then((response) => {
        localStorage.setItem("username", JSON.stringify(userid));
    });
    return response;
}

async function login(userid, password, remember) {
    //const response = await _axios.get(baseUrl + "login&userid=" + userid + "&password=" + password);
    const response = await axios.post(baseUrl, {
        request: "login",
        userid: userid,
        password: password
    }, axiosConfig).then((response) => {
        token = response.data.token;
        if(remember === "on"){localStorage.setItem("loginToken", token);}
        console.log("Userhash: " + response.data.hash);
        console.log("Username: " + response.data.usernickname);
        localStorage.setItem("userhash", response.data.hash);
        localStorage.setItem("usernickname", response.data.usernickname);
    });
    return response;
}

async function logout() {
    //const response = await _axios.get(baseUrl + "logout&userid=" + userid + "&sessionToken=" + sessionToken);
    const response = await axios.post(baseUrl, {
        request: "logout",
        token: token
    }, axiosConfig);
    return response;
}

async function getMessages(userid, sessionToken) {
    //const response = await _axios.get(baseUrl + "getMessages&userid=" + userid + "&sessionToken=" + sessionToken);
    const response = await axios.post(baseUrl, {
        request: "fetchmessages",
        token: token
    }, axiosConfig);
    return response;
}

async function fetchPhoto(userid, photoid, sessionToken) {
    //const response = await _axios.get(baseUrl + "fetchPhoto&userid=" + userid + "&photoid=" + photoid + "&sessionToken=" + sessionToken);
    const response = await axios.get(baseUrl + '?request=fetchphoto&photoid=' + photoid + '&token=' + token, axiosConfig);
    return response;
}

async function sendMessage(message, photo) {
    //const response = await _axios.get(baseUrl + "sendMessage&userid=" + userid + "&sessionToken=" + sessionToken + "&message=" + message);
    const response = await axios.post(baseUrl, {
        request: "sendmessage",
        token: token,
        text: message,
        photo: photo
    }, axiosConfig);
    return response;
}

async function deregister(message) {
    //const response = await _axios.get(baseUrl + "sendMessage&userid=" + userid + "&sessionToken=" + sessionToken + "&message=" + message);
    const response = await axios.post(baseUrl, {
        request: "deregister",
        token: token
    }, axiosConfig);
    return response;
}

const HttpService = {
    login,
    logout,
    register,
    getMessages,
    fetchPhoto,
    sendMessage,
    deregister,
};

export default HttpService;