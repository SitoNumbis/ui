import { createContext, useReducer, useContext } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// utils
import { logUser, logoutUser } from "../utils/auth";

const UserContext = createContext();

const userReducer = (userState, action) => {
  const { type } = action;
  switch (type) {
    case "set-photo": {
      if (userState.user) {
        userState.user.photo = action.photo;
        logUser(userState.user);
      }
      return { ...userState };
    }
    case "logged-out":
      logoutUser();
      return {};
    case "logged-in": {
      const { user } = action;
      return { user };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const UserProvider = ({ children }) => {
  const [userState, setUserState] = useReducer(userReducer, {});

  const value = { userState, setUserState };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// hooks
const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("userContext must be used within a Provider");
  return context;
};

export { UserProvider, useUser };
