import React, { useCallback, useEffect } from "react";
import { RouteProps, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppLocation, useAppSelector } from "../../hooks";
import { RootState } from "../../services";
import { getUser } from "../../services/user";
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
  const user = useAppSelector((store: RootState) => !!store.user.user);

  useEffect(() => {
    dispatch(getUser());

    navigatePage();
  }, [dispatch]);

  const navigatePage = useCallback(() => {
    switch (role) {
      case Role.GUEST:
        if (user) {
          navigate(location?.state?.from || "/");
        }

        break;
      case Role.USER:
        if (!user) {
          navigate("/login", { state: { from: location } });
        }

        break;
    }
  }, [user]);

  return <>{children}</>;
}

export default ProtectedRoute;
