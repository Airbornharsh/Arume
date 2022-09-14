import React from "react";
import { io } from "socket.io-client";
import { v1 as uuidv1 } from "uuid";
// import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import Context from "../Context/Context";
import { useRef } from "react";
import Message from "../Components/Chat/Message";
import NavBar from "../Layout/NavBar";

const Chat = () => {
  const [message, setMessage] = useState("");
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

  const validateForm = () => {
    return message.length > 0;
  };

  if (!window.localStorage.getItem("arume-accessToken")) {
    Navigate("/");
  }

  if (socket) {
    // socket.on("messages", (data) => {
    //   if (data.communityId === params.id.toLowerCase()) {
    //     if (data.action === "create")
    //       setMessages([...messages, { message: data.message, id: data.id }]);
    //     else if (data.action === "delete") {
    //       const tempMessages = [];
    //       messages.forEach((tempMessage) => {
    //         if (tempMessage.id !== data.id) {
    //           tempMessages.push(tempMessage);
    //         }
    //       });
    //       setMessages(tempMessages);
    //     }
    //   }
    // });

    socket.on("messageAdd", (data) => {
      // console.log(data);
      if (data.communityId === params.communityId.toLowerCase()) {
        setMessages([
          ...messages,
          {
            message: data.message,
            id: data.id,
            userId: data.userId,
            name: data.name,
            nameColor: data.nameColor,
            date: data.date,
          },
        ]);
      }
    });

    socket.on("messageDelete", (data) => {
      const tempMessages = [];
      messages.forEach((tempMessage) => {
        if (tempMessage.id !== data.id) {
          tempMessages.push(tempMessage);
        }
      });
      setMessages(tempMessages);
    });

    socket.on("connectionRender", (data) => {
      setMessages([...messages, { for: "joining", name: data.name }]);
      UtilCtx.current.setAlert({
        isVisible: true,
        value: `${data.name} Joined`,
      });
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
    });

    setSocket(tempSocket);
  }, [params.communityId, params.name]);

  const AddMessage = async (e) => {
    e.preventDefault();

    try {
      const random = Math.ceil(Math.random() * 5);

      socket.emit("messageAdd", {
        communityId: params.communityId.toLowerCase(),
        message: message,
        id: uuidv1(),
        userId: params.userId,
        name: params.name,
        nameColor: random,
        date: Date.now(),
      });

      // await axios.post(
      //   `${window.localStorage.getItem("arume-backend-uri")}/message`,
      //   {
      //     message: message,
      //   },
      //   {
      //     headers: {
      //       authorization: `Bearer ${window.localStorage.getItem(
      //         "arume-accessToken"
      //       )}`,
      //     },
      //   }
      // );

      setMessage("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="relative">
      <NavBar heading={`${params.communityId} Community`} />
      <ul className="flex flex-col w-[80vw] h-[calc(100vh-9rem)] relative items-center overflow-auto">
        {messages.map((data, index) => {
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
                  <p className={`text-[0.7rem] ml-2 text-slate-400`}>{time}</p>
                </span>
                <div className=" w-[100%] rounded-tl-none bg-Color1 rounded-2xl rounded-r-md p-3 pl-4">
                  <p className="text-slate-100">{data.message}</p>
                </div>
              </li>
            );
          }
        })}
      </ul>
      <form className="flex items-center fixed bottom-10 left-[50%] translate-x-[-50%] w-[90vw] max-w-[25rem]">
        <input
          type={"text"}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="h-8 max-w-[20rem] text-[0.9rem] w-[85vw] text-slate-600 bg-slate-200 px-2"
          placeholder="Enter Your Message"
          autoFocus
        />
        <button
          className="bg-Color1 text-slate-200 px-3 h-8 max-w-[5rem] rounded-sm "
          onClick={AddMessage}
          disabled={!validateForm()}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
