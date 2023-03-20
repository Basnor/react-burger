import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../hooks";
import { logout } from "../services/auth";
import { ROUTES } from "../utils/contants";

function Logout() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout());

        navigate(ROUTES.HOME);
    }, [])

    return <></>;
}

export default Logout;
