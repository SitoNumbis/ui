import { createContext, useContext, ReactNode, useReducer } from "react";

export interface NotificationProviderData {
  notification: NotificationType;
  setNotification: React.Dispatch<NotificationActionType>;
}

export interface NotificationProviderProps {
  children: ReactNode;
}

export interface NotificationType {
  visible: boolean;
  type: "success" | "error" | "info" | "warning" | "hide";
  message: string;
}

export interface NotificationActionType {
  type: "hide" | "success" | "error" | "info" | "warning";
  message?: "string";
}

const NotificationContext = createContext({} as NotificationProviderData);

const notificationReducer = (
  notification: NotificationType,
  action: NotificationActionType
): NotificationType => {
  const { type, message } = action;
  switch (action.type) {
    case "hide":
      return { ...notification, visible: false };

    case "error":
    case "info":
    case "warning":
    case "success":
      return { visible: true, message: message ?? "", type: type };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const notificationInitializer = (initial: NotificationType) => initial;

export const NotificationProvider = (props: NotificationProviderProps) => {
  const { children } = props;
  const [notification, setNotification] = useReducer<
    typeof notificationReducer,
    NotificationType
  >(
    notificationReducer,
    {
      visible: false,
      type: "success",
      message: "message",
    } as NotificationType,
    notificationInitializer
  );

  const value = { notification, setNotification };
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// hooks
// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = (): NotificationProviderData => {
  const context = useContext(NotificationContext);
  if (context === undefined)
    throw new Error("notificationContext must be used within a Provider");
  return context;
};