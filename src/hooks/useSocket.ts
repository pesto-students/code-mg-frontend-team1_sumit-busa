import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";


const getSocket = () => {
  const baseUrl: string = process.env.REACT_APP_BASE_URL || "";
  const token = localStorage.token;
  console.log({ socketurl: process.env.REACT_APP_BASE_URL, token });
  return io(baseUrl, {
    extraHeaders: { Authorization: `Bearer ${token}` },
  });
};
let socket = getSocket();

export const EVENTS = {
  submit: "assignment:submit",
  customRun: "assignment:custom-input",
  save: "assignment:save",
} as const;

type EventKeys = keyof typeof EVENTS;
const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    if (!socket.connected) {
      socket = getSocket();
    }

    socket.on("connect", () => {
      console.log("connect");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("disconnect");
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const eventHandlers: Record<string, { handler: (payload: any) => void }> =
    useMemo(() => {
      return {};
    }, []);

  const registerEvent = useMemo(
    () => (eventName: EventKeys, handler: (payload: any) => void) => {
      eventHandlers[eventName] = { handler };
      return (payload: any) => {
        console.log("triggered", eventName);
        socket.emit(EVENTS[eventName], payload);
      };
    },
    [eventHandlers]
  );

  useEffect(() => {
    Object.keys(EVENTS).forEach((event) => {
      socket.on(EVENTS[event as EventKeys], (payload) => {
        const eventName = event as EventKeys;
        if (
          eventHandlers[eventName] &&
          typeof eventHandlers[eventName].handler === "function"
        )
          console.log({ event, payload });
        eventHandlers[eventName].handler(payload);
      });
    });

    return () => {
      Object.keys(EVENTS).forEach((event) => socket.off(event));
    };
  }, [eventHandlers]);

  return { isConnected, registerEvent };
};

export default useSocket;
