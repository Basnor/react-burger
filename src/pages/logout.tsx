import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../hooks";
import { logout } from "../services/auth";

function Logout() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout());

        navigate("/")
    }, [])

    return <></>;
}

export default Logout;
