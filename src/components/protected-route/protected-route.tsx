import React, { useCallback, useEffect } from "react";
import { RouteProps, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppLocation, useAppSelector } from "../../hooks";
import { getUser } from "../../features/user/user-slice";
import { ROUTES } from "../../utils/contants";
import { getCookie } from "../../utils/cookie";
import { IUser } from "../../utils/types";

export enum Role {
  USER = "USER",
  GUEST = "GUEST",
}

type ProtectedRouteParams = RouteProps & {
  user?: IUser;
  role?: Role;
};

function ProtectedRoute({ children, role = Role.GUEST }: ProtectedRouteParams) {
  const dispatch = useAppDispatch();
  const location = useAppLocation();
  const navigate = useNavigate();
  const { user, request } = useAppSelector((store) => store.user);

  useEffect(() => {
    if (!getCookie("accessToken") || !!user) {
      return;
    }

    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    navigatePage();
  }, [request]);

  const navigatePage = useCallback(() => {
    switch (role) {
      case Role.GUEST:
        if (!!user) {
          navigate(location?.state?.from || ROUTES.HOME);
        }

        break;
      case Role.USER:
        if (!user) {
          navigate(ROUTES.LOGIN, { state: { from: location } });
        }

        break;
    }
  }, [user, request]);

  return <>{children}</>;
}

export default ProtectedRoute;
