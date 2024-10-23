import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch, useSelector } from "react-redux";
import ChatInput from './ChatInput';
import { enterRoom, selectRoomId } from '../features/appSlice';
import { useCollection, useDocument } from "react-firebase-hooks/firestore"
import { db } from '../firebase';
import { collection, doc, orderBy, query } from 'firebase/firestore';
import Message from './Message';

const Chat = () => {
    const chatRef = useRef(null);
    const roomId = useSelector(selectRoomId);

    const [roomDetails] = useDocument(
        roomId ? doc(db, 'rooms', roomId) : null
    );

    const [roomMessage,loading] = useCollection(
        roomId ? query(
            collection(doc(db, "rooms",roomId),"messages"),
            orderBy("timestamp","asc")
        ) : null  
    );

    {/*console.log(roomDetails?.data());
    console.log(roomMessage); */}

    useEffect(() => {
        if(chatRef.current){
            chatRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end"
            });
        }
    }, [roomId, roomMessage,loading]);
    
  return (
    <ChatContainer>
        {roomDetails && roomMessage && (
            <>
            <Header>
            <HeaderLeft>
                <h4>
                    <strong>#{roomDetails?.data().name}</strong>
                </h4>
                <StarBorderIcon />
            </HeaderLeft>

            <HeaderRight>
                <p>
                   <InfoIcon/> Details
                </p>
            </HeaderRight>
       </Header>

       <ChatMessages>
            {roomMessage?.docs.map(doc => {
                const {message, timestamp, user, userImage} = doc.data();

                return (
                    <Message 
                        key={doc.id}
                        message={message}
                        timestamp={timestamp}
                        user={user}
                        userImage = {userImage}
                    />
                )
            })}
            <ChatBottom ref={chatRef} />
       </ChatMessages>

        <ChatInput 
            chatRef={chatRef}
            channelName={roomDetails?.data().name}
            channelId={roomId} 
        />
        </>
        )}
    </ChatContainer>
  );
}

export default Chat;

const ChatBottom = styled.div`
    padding-bottom: 200px; 
`

const ChatContainer = styled.div`
    flex: 1; 
    display: flex;
    flex-direction: column; 
    margin-left: 190px; 
    overflow-y: auto; 
    margin-top: 60px; 
`

const Header = styled.div`
    display:flex;
    justify-content:space-between;
    padding:20px;
    border-bottom:1px solid lightgray;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items:center;

    > h4 {
        display:flex;
        text-transform:lowercase;
        margin-right: 10px;
    }
    
    > h4 > .MuiSvgIcon-root {
        margin-left: 20px;
        font-size: 18px;
    }

`;

const HeaderRight = styled.div`
    > p {
        display:flex;
        align-items:center;
        font-size:14px;
    }

    > p > .MuiSvgIcon-root {
        margin-right: 5px !important;
        font-size:16px;
    }
`;

const ChatMessages = styled.div`
    flex:1;
    overflow: auto;
    padding: 20px;
    padding-bottom: 100px;
`;

