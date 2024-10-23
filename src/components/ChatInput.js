import { Button } from '@mui/material'
import React, {  useState } from 'react'
import styled from 'styled-components';
import { db } from '../firebase';
import { collection,doc,addDoc,serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';



const ChatInput = ({channelName,channelId,chatRef}) => {
   const [input,setInput ] = useState("");
   const [user] = useAuthState(auth);
  
    const sendMessage = async (e) => {
        e.preventDefault(); //Prevents refresh

        if(!channelId) {
            return false;
        }
        
        if(channelId) {
            const docRef = doc(db, 'rooms', channelId);
            await addDoc(collection(docRef,'messages'),{
                message:input,
                timestamp: serverTimestamp(),
                user: user.displayName,
                userImage: user.photoURL,
            });

            chatRef.current.scrollIntoView({
                behavior: "smooth",
            });
        }
        // Clear the input field after sending
        setInput("");
    }

  return (
    <ChatInputContainer>
        <form onSubmit={sendMessage}>
            <input 
                   value={input}
                   onChange={(e) => setInput(e.target.value)} 
                   placeholder={`Message #${channelName}`}
            />
            <Button hidden type='submit'>
                SEND
            </Button>
        </form>
    </ChatInputContainer>
  )
}

export default ChatInput;

const ChatInputContainer = styled.div`
    border-radius:20px;

    > form {
        position: relative;
        display:flex;
        justify-content:center;
    }

    > form > input {
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }

    > form > button{
        display: none !important;
    }
`;