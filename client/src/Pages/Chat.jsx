import React from "react";
import { io } from "socket.io-client";
// import { v1 as uuidv1 } from "uuid";
// import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import Context from "../Context/Context";
import { useRef } from "react";
import Message from "../Components/Chat/Message";
import NavBar from "../Layout/NavBar";
import MessageAddForm from "../Components/Chat/MessageAddForm";

const Chat = () => {
  const [socket, setSocket] = useState("");
  const params = useParams();
  const [messages, setMessages] = useState([
    {
      message: `Welcome to Arume`,
      id: params.communityId,
      name: "ARUME",
      nameColor: 1,
    },
  ]);
  const UtilCtx = useRef(useContext(Context).util);

  const Navigate = useNavigate();

  if (!window.localStorage.getItem("arume-accessToken")) {
    Navigate("/");
  }

  const NotificationFn = (data) => {
    let notification;

    if (!("Notification" in window)) {
      alert("Does Not Support Notifacation in Browser");
    } else if (Notification.permission === "granted") {
      notification = new Notification(data);
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          notification = new Notification(data);
        }
      });
    }

    // notification.close();

    console.log(notification);
  };

  if (socket) {
    socket.on("messageDelete", (data) => {
      const tempMessages = [];
      messages.forEach((tempMessage) => {
        if (tempMessage.id !== data.id) {
          tempMessages.push(tempMessage);
        }
      });
      setMessages(tempMessages);
    });
  }

  useEffect(() => {
    UtilCtx.current.setAlert({
      isVisible: true,
      value: `Entered ${params.communityId.toLowerCase()} Community`,
    });
    const tempSocket = io(window.localStorage.getItem("arume-backend-uri"));

    tempSocket.emit("connectionRender", {
      name: params.name,
      userId: params.userId.toLowerCase(),
    });

    tempSocket.on("messageAdd", (data) => {
      console.log(data);
      if (data.communityId === params.communityId.toLowerCase()) {
        setMessages((temp) => [
          ...temp,
          {
            message: data.message,
            id: data.id,
            userId: data.userId,
            name: data.name,
            nameColor: data.nameColor,
            date: data.date,
          },
        ]);

        if (data.userId !== params.userId.toLowerCase())
          NotificationFn(`${data.message} By ${data.name}`);
      }
    });

    tempSocket.on("connectionRender", (data) => {
      setMessages((temp) => [...temp, { for: "joining", name: data.name }]);
      UtilCtx.current.setAlert({
        isVisible: true,
        value: `${data.name} Joined`,
      });
      if (data.userId !== params.userId.toLowerCase())
        NotificationFn(`${data.name} Joined `);
    });

    setSocket(tempSocket);
  }, [params.communityId, params.name, params.userId]);

  return (
    <div className="relative">
      <NavBar heading={`${params.communityId} Community`} />
      <ul className="flex flex-col w-[80vw] h-[calc(100vh-9rem)] relative items-center overflow-auto">
        {messages &&
          messages.map((data, index) => {
            let time;
            if (data.date) {
              time = new Date(data.date).toString().split(" ")[4];
            }
            if (data.for === "joining")
              return (
                <li className="w-[100%] ml-4 py-2 text-slate-500">{`${data.name} just Joined`}</li>
              );

            if (params.userId === data.userId)
              return (
                <Message
                  message={data.message}
                  index={index}
                  communityId={params.communityId.toLowerCase()}
                  socket={socket}
                  id={data.id}
                  time={time}
                />
              );
            else {
              return (
                <li key={index} className="\ w-[100%]">
                  <span className="flex">
                    <p
                      className={`text-[0.7rem] ml-1 nameColor${data.nameColor}`}
                    >
                      {data.name}
                    </p>
                    <p className={`text-[0.7rem] ml-2 text-slate-400`}>
                      {time}
                    </p>
                  </span>
                  <div className=" w-[100%] rounded-tl-none bg-Color1 rounded-2xl rounded-r-md p-3 pl-4">
                    <p className="text-slate-100">{data.message}</p>
                  </div>
                </li>
              );
            }
          })}
      </ul>
      <MessageAddForm
        socket={socket}
        communityId={params.communityId.toLowerCase()}
        userId={params.userId}
        name={params.name}
      />
    </div>
  );
};

export default Chat;
