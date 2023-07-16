import React from "react";

interface MessageProps {
  message: string | undefined;
  colourClass: string | undefined;
}

function MessageScroller(props: MessageProps) {
  return (
    <>
      <div className="marquee-wrapper">
        <h2 className={props.colourClass}>{props.message}</h2>

        <div className="marquee">
          <div className="track">
            <div className="content">
              &nbsp;READY READY READY READY READY READY READY READY READY READY
              READY READY READY READY
            </div>
          </div>
        </div>
        <div className="marquee">
          <div className="track-reverse">
            <div className="content">
              &nbsp;READY READY READY READY READY READY READY READY READY READY
              READY READY READY READY
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageScroller;
