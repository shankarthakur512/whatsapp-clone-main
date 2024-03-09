import React from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs";

function MessageStatus({MessageStatus}) {
  return (
  <>
{MessageStatus === "sent" && <BsCheck className="text-lg" ></BsCheck>}
{MessageStatus === "delivered" && <BsCheckAll className="text-lg" />} 
{MessageStatus === "read" && (<BsCheckAll className="text-lg text-icon-ack" />)} 
  </>
  
  );
}

export default MessageStatus;
