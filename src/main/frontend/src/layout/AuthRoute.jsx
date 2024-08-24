import React, { useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { isLogin } from "../js/userInfo";
export default function AuthRoute(props) {
    const navi = useNavigate();
    useEffect(() => {
        if (!isLogin()) { navi(props.to); }
    }, [])

    return props.children
}
