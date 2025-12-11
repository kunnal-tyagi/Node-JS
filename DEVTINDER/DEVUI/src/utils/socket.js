// import {io} from "socket.io-client";

// export const createSocketConnection=()=>{
//     return io("http://localhost:3000");
// }
import { io } from "socket.io-client";

const socketconnect = io("http://localhost:3000", {
  withCredentials: true
});

export default socketconnect;
