import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks";
import { logout } from "../services/auth";
import { ROUTES } from "../utils/contants";
import { getUser } from "../services/user";

function Logout() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector((store) => store.auth);

    useEffect(() => {
        dispatch(logout());
    }, [])

    useEffect(() => {
        if (!!user) {
            return;
        }

        dispatch(getUser());

        navigate(ROUTES.HOME);
    }, [user])

    return <></>;
}

export default Logout;
