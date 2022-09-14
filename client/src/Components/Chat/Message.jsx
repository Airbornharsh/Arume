import React, { useContext } from "react";
import { useState } from "react";
import Context from "../../Context/Context";

const Message = (props) => {
  const [isInfo, setIsInfo] = useState(false);
  const UtilCtx = useContext(Context).util;

  const ToggleMessageInfo = () => {
    if (isInfo) setIsInfo(false);
    else setIsInfo(true);
  };

  const CopyToClipboard = () => {
    navigator.clipboard.writeText(props.message);
    UtilCtx.setAlert({
      isVisible: true,
      value: `${props.message} is Copied`,
    });
  };

  const DeleteMessage = async (id, message) => {
    try {
      props.socket.emit("messageDelete", {
        communityId: props.communityId,
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

      UtilCtx.setAlert({
        isVisible: true,
        value: `${message} is Deleted`,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <li
      key={props.id}
      className="relative w-[100%] text-right"
      onMouseEnter={ToggleMessageInfo}
      onMouseLeave={ToggleMessageInfo}
      onClick={ToggleMessageInfo}
    >
      <div className="flex justify-end">
        <p className="text-[0.7rem] mr-2 text-blue-500">You </p>
        <p className="text-[0.7rem] mr-1 text-slate-400">{props.time}</p>
      </div>
      <div className=" w-[100%] rounded-tr-none  bg-slate-300 rounded-2xl rounded-l-md p-3 pl-4">
        <p>{props.message}</p>
        {isInfo && (
          <span className="absolute w-[6rem] text-[0.7rem] top-10 right-0 z-10">
            <button
              className="w-[100%]  bg-slate-400 py-[0.4rem] border-b-[0.05rem] border-slate-900"
              onClick={CopyToClipboard}
            >
              Copy
            </button>
            <button
              className="w-[100%]  bg-slate-400 py-[0.4rem] border-b-[0.05rem] border-slate-900"
              onClick={() => {
                DeleteMessage(props.id, props.message);
              }}
            >
              Delete
            </button>
          </span>
        )}
      </div>
    </li>
  );
};

export default Message;
