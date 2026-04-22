// import {io} from "socket.io-client";

// export const createSocketConnection=()=>{
//     return io("http://localhost:3000");
// }
import { io } from "socket.io-client";

const socketconnect = io(
  "https://bug-free-space-trout-4jpvr7gg5p7735rpr-3000.app.github.dev",
  {
    withCredentials: true,
  }
);

export default socketconnect;