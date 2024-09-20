import axios from "axios";
import { getCookie } from "./cookieJs";

function getUser(setUser) {
    const userId = getCookie("isLogin");
    console.log(userId);
    axios.get(`/userSearch/${userId}`).then(response => {
        setUser(response.data);
    });
}

function isLogin() {
    return !!getCookie("isLogin");
}
function isAdmin() {
    return getCookie("isLogin") === "admin"
}
function getUserId() {
    return getCookie("isLogin");
}
// function getDeliList(userId){
//     axios.get(`/userSearch/${userId}`).then(response => {
//         setUser(response.data);
//     });
// }
export { getUser, isLogin, getUserId, isAdmin };

