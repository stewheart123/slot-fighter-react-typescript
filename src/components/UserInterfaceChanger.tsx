import React from 'react';
import MessageScroller from './messageScroller';

interface MessageProps {
  message: string | undefined;
}

function UserInterfaceChanger(props:MessageProps){
    return (
        <> 
          <MessageScroller message={props.message} />
        </>
    );
};

export default UserInterfaceChanger;