import React, { useEffect } from "react";
import { Navigate, RouteProps } from "react-router-dom";

import { useAppDispatch, useAppLocation, useAppSelector } from "../../hooks";
import { RootState } from "../../services";
import { getUser } from "../../services/user";

export enum Role {
  USER = "USER",
  GUEST = "GUEST",
}

type ProtectedRouteParams = RouteProps & {
  role?: Role;
};

function ProtectedRoute({ children, role = Role.GUEST }: ProtectedRouteParams) {
  const dispatch = useAppDispatch();
  const location = useAppLocation();
  const { user } = useAppSelector((store: RootState) => store.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (role === Role.GUEST && !!user) {
    return <Navigate to={location?.state?.from || "/"} replace />;
  }

  if (role === Role.USER && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
