import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { logout } from "./auth-slice";
import { ROUTES } from "../../utils/contants";
import { getUser } from "../user/user-slice";

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
