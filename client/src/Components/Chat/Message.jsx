import React, { useContext } from "react";
import { useState } from "react";
import { BsFillTriangleFill } from "react-icons/bs";
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
      className="p-2 pl-4 pr-6 my-2 pt-0 pb-1 text-right rounded-sm text-slate-800 bg-slate-300 w-[97%] mr-2 relative"
      onMouseEnter={ToggleMessageInfo}
      onMouseLeave={ToggleMessageInfo}
    >
      <p className="text-[0.7rem] text-slate-400">Me</p>
      <p>{props.message}</p>
      <BsFillTriangleFill className="text-slate-300 rotate-[60deg] absolute -top-1 -right-[0.58rem]" />
      {isInfo && (
        <span className="absolute w-[6rem] text-[0.7rem] top-10 right-0 z-10">
          <button
            className="w-[100%]  bg-slate-500 py-[0.4rem] border-b-[0.05rem] border-slate-900"
            onClick={CopyToClipboard}
          >
            Copy
          </button>
          <button
            className="w-[100%]  bg-slate-500 py-[0.4rem] border-b-[0.05rem] border-slate-900"
            onClick={() => {
              DeleteMessage(props.id, props.message);
            }}
          >
            Delete
          </button>
        </span>
      )}
    </li>
  );
};

export default Message;
