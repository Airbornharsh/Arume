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
import { AiFillDelete } from "react-icons/ai";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState("");
  const [messages, setMessages] = useState([]);
  const UtilCtx = useRef(useContext(Context).util);

  const params = useParams();
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
          { message: data.message, id: data.id, userId: data.userId },
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
  }

  useEffect(() => {
    UtilCtx.current.setAlert({
      isVisible: true,
      value: `Entered ${params.communityId.toLowerCase()} Community`,
    });
    const tempSocket = io(window.localStorage.getItem("arume-backend-uri"));

    setSocket(tempSocket);
  }, [params.communityId]);

  const AddMessage = async (e) => {
    e.preventDefault();

    try {
      socket.emit("messageAdd", {
        communityId: params.communityId.toLowerCase(),
        message: message,
        id: uuidv1(),
        userId: params.userId,
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

  const DeleteMessage = async (id, message) => {
    try {
      socket.emit("messageDelete", {
        communityId: params.communityId.toLowerCase(),
        id: id,
      });

      // await axios.delete(
      //   `${window.localStorage.getItem("arume-backend-uri")}/message/${id}`,
      //   {
      //     headers: {
      //       authorization: `Bearer ${window.localStorage.getItem(
      //         "arume-accessToken"
      //       )}`,
      //     },
      //   }
      // );

      UtilCtx.current.setAlert({
        isVisible: true,
        value: `${message} is Deleted`,
      });

      setMessage("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="relative">
      <ul className="flex flex-col w-[80vw] h-[calc(100vh-9rem)] overflow-scroll relative">
        {messages.map((data, index) => {
          console.log(data);
          if (params.userId === data.userId)
            return (
              <li key={index} className="p-2 pl-4 pr-12 my-2 text-right rounded-sm text-slate-800 bg-slate-300">
                {data.message}
                <span
                  className="absolute transition-none cursor-pointer right-2 hover:text-red-600 "
                  onClick={() => {
                    const confirmData = window.confirm("Want to Delete");
                    if (confirmData) DeleteMessage(data.id, data.message);
                  }}
                >
                  <AiFillDelete size={"1.3rem"} />
                </span>
              </li>
            );
          else
            return (
              <li key={index} className="p-2 pl-4 my-2 rounded-sm bg-slate-600">
                {data.message}
                <span
                  className="absolute transition-none cursor-pointer right-2 hover:text-red-600 "
                  onClick={() => {
                    const confirmData = window.confirm("Want to Delete");
                    if (confirmData) DeleteMessage(data.id, data.message);
                  }}
                >
                  <AiFillDelete size={"1.3rem"} />
                </span>
              </li>
            );
        })}
      </ul>
      <form className="flex items-center fixed bottom-10 left-[50%] translate-x-[-50%] w-[90vw] max-w-[25rem]">
        <input
          type={"text"}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="h-8 max-w-[20rem] text-[0.9rem] w-[85vw] text-slate-600 px-2"
          placeholder="Enter Your Message"
          autoFocus
        />
        <button
          className="bg-slate-300 text-slate-700 px-3 h-8 max-w-[5rem] rounded-sm "
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
