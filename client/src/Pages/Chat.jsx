import React from "react";
import { io } from "socket.io-client";
import axios from "axios";
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
    socket.on("messages", (data) => {
      console.log(data);

      if (data.communityId === params.id) {
        if (data.action === "create")
          setMessages([...messages, { message: data.message, id: data.id }]);
        else if (data.action === "delete") {
          const tempMessages = [];
          messages.forEach((tempMessage) => {
            if (tempMessage.id !== data.id) {
              tempMessages.push(data);
            }
          });
          setMessages(tempMessages);
        }
      }
    });
  }

  useEffect(() => {
    UtilCtx.current.setAlert({
      isVisible: true,
      value: `Entered ${params.id} Community`,
    });
    const tempSocket = io(window.localStorage.getItem("arume-backend-uri"));
    setSocket(tempSocket);
  }, [params.id]);

  const AddMessage = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${window.localStorage.getItem("arume-backend-uri")}/message`,
        {
          message: message,
        },
        {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem(
              "arume-accessToken"
            )}`,
          },
        }
      );

      setMessage("");
    } catch (e) {
      console.log(e);
    }
  };

  const DeleteMessage = async (id, message) => {
    try {
      await axios.delete(
        `${window.localStorage.getItem("arume-backend-uri")}/message/${id}`,
        {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem(
              "arume-accessToken"
            )}`,
          },
        }
      );

      UtilCtx.current.setAlert({
        isVisible: true,
        value: `${message} is Deleted`,
      });

      // const tempMessages = [];
      // messages.forEach((data) => {
      //   if (data.id !== id) {
      //     tempMessages.push(data);
      //   }
      // });
      // setMessages(tempMessages);

      setMessage("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="relative">
      <ul className="flex flex-col w-[80vw] h-[calc(100vh-9rem)] overflow-scroll relative">
        {messages.map((data, index) => {
          return (
            <li key={index} className="p-2 pl-4 my-2 rounded-sm bg-slate-600">
              {data.message}
              <span
                className="absolute right-2 hover:text-red-600 transition-none cursor-pointer "
                onClick={() => {
                  DeleteMessage(data.id, data.message);
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
