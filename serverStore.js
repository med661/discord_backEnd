const {v4:uuidv4}=require('uuid');
const connectUsers=new Map();
let activeRooms=[]
let io=null;

const setSocketServerInstance = (ioInstance)=>{
    io=ioInstance;
}
const getSocketServerInstance = ()=>{
    return io
}


const addNewConnectedUser=({socketId,userId})=>{
    connectUsers.set(socketId,{userId});
//console.log({connectUsers});
};
const removeConnectedUser=(socketId)=>{

    if (connectUsers.has(socketId)) {
        connectUsers.delete(socketId); 
         console.log("new user connected user");
          console.log({connectUsers});
    }
} 


const getActiveConnections=(userId)=>{
    const activeConnections = [];
    connectUsers.forEach(function(value,key){
        if(value.userId === userId){
            activeConnections.push(key);
        }
    })
return activeConnections;
}
const getOnlineUsers=()=>{
    const onlineUser=[]
    connectUsers.forEach((value,key)=>{
        onlineUser.push({socketId:key,userId:value.userId})
    })
return onlineUser
}

//room is
const addNewActiveRom=(userId,socketId)=>{
    const newActiveRoom={
        roomCreator:{ 
            userId,
            socketId
        },
        participants:[
        { 
            userId,
            socketId

        }
     ],
     roomId:uuidv4(),
    };
    activeRooms=([...activeRooms,newActiveRoom]);
    //console.log("new active room")
    //console.log(activeRooms)

    return newActiveRoom;

}
const getActiveRooms=()=>{
    return [...activeRooms] 
}

const getActiveRoom=(roomId)=>{
    const activeRoom=activeRooms.find((activeRoom)=>activeRoom.roomId===roomId)
    if(activeRoom){
        return {
            ...activeRoom,
        }
    }else{
        return null
    }
}
const joinActiveRoom=(roomId, NewParticipant)=>{
    const room=activeRooms.find(room=>room.roomId===roomId)
    activeRooms=activeRooms.filter((room)=>room.roomId!==roomId)
    const updatedRoom={
        ...room,
        participants:[...room.participants,NewParticipant]
    }
    activeRooms.push(updatedRoom)
    console.log({activeRooms})


}
const leaveActiveRoom=(roomId,participantSocketId)=>{
    const activeRoom=activeRooms.find(room=>room.roomId===roomId)
    if (activeRoom) {
        const copyOfActiveRoom={...activeRoom};
        copyOfActiveRoom.participants=copyOfActiveRoom.participants.filter(
            (participant)=>participant.socketId!==participantSocketId
        );
        activeRooms=activeRooms.filter((room)=>room.roomId!==roomId)
        if (copyOfActiveRoom.participants.length >0) {
            activeRooms.push(copyOfActiveRoom)
            
        }

        
    }

}
module.exports = {
    addNewConnectedUser,
    removeConnectedUser,
    getActiveConnections,
    getSocketServerInstance,
    setSocketServerInstance,
    getOnlineUsers,
    addNewActiveRom,
    getActiveRooms,
    getActiveRoom,
    joinActiveRoom,
    leaveActiveRoom
}