import React from 'react';
import MessageScroller from './messageScroller';

interface MessageProps {
  message: string | undefined;
  colourClass: string | undefined
}

function UserInterfaceChanger(props:MessageProps){
    return (
        <> 
          <MessageScroller message={props.message} colourClass={props.colourClass} />
        </>
    );
};

export default UserInterfaceChanger;