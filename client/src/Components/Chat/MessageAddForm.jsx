import React, { useState } from "react";
import { v1 as uuidv1 } from "uuid";

const MessageAddForm = (props) => {
  const [message, setMessage] = useState("");

  const validateForm = () => {
    return message.length > 0;
  };

  const AddMessage = async (e) => {
    e.preventDefault();

    try {
      const random = Math.ceil(Math.random() * 5);

      props.socket.emit("messageAdd", {
        communityId: props.communityId,
        message: message,
        id: uuidv1(),
        userId: props.userId,
        name: props.name,
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
  );
};

export default MessageAddForm;
