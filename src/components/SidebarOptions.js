import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { enterRoom } from "../features/appSlice";

function SidebarOptions({ id, Icon, title, addChannelOption }) {
    const dispatch = useDispatch();

    const addChannel = () => {
        const channelName = prompt('Please enter the channel name');

        if (channelName) {
            try {
                const docRef =  addDoc(collection(db, 'rooms'), {
                    name: channelName,
                });
                console.log('New Channel ID:', docRef.id);
                dispatch(enterRoom({ roomId: docRef.id }))
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }
    };

    const selectChannel = () => {
        if (id) {
            dispatch(enterRoom({ 
                roomId: id 
            }));  
        } else {
            console.log("No roomId provided");
        }
    };

    return (
        <SidebarOptionContainer
            onClick={addChannelOption ? addChannel : selectChannel} // Select channel here
        >
            <SidebarOptionContent>
                {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
                {Icon ? (
                    <h3>{title}</h3>
                ) : (
                    <SidebarOptionChannel>
                        <span>#</span> {title}
                    </SidebarOptionChannel>
                )}
            </SidebarOptionContent>
        </SidebarOptionContainer>
    );
}

export default SidebarOptions;

const SidebarOptionContainer = styled.div`
    display: flex;
    font-size: 12px;
    align-items: center;
    padding-left: 2px;
    cursor: pointer;
    margin-top: 5px;

    :hover {
        opacity: 0.9;
        background-color: #340e36; 
    }

    > h3 {
        font-weight: 500;
    }

    > h3 > span {
        padding: 15px;
    }
`;

const SidebarOptionContent = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const SidebarOptionChannel = styled.h3`
    padding: 10px 0;
    font-weight: 400;
    font-size: 16px;
    margin-left: 18px;
`;
