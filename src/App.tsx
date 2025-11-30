import './App.css'
import './Chat'
import { Box } from './Box'
import { ChangeEvent, useEffect, useState } from 'react';
import { socket } from './sockets';

// const [username, setUsername] = useState(""); 
// function App() {

//   return (
//     <div> 
//     	<Box name="Message :" message="get the msg" />

// 	</div>
//   )
// }
// const messages = ["Bonjour", "Ça va ?", "Très bien !"];

// function App() {
//   return (
//     <>
//       <h1>Mon chat</h1>
//       {messages.map(m => (
//         <p>{m}</p>
//       ))}
//     </>
//   );
// }

// export default App;

interface Message {
  message : string
}

function App() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("test", (data)=> {
      console.log(data);
    })
  })

  const handleSubmit = (event : ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();

    console.log(message);

    socket.emit("test", message)
	}

  return (
    <>
      <h1>Mon chat</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Ton message' onChange={( event : ChangeEvent<HTMLInputElement>) => setMessage(event.target.value)}/>
      </form>
      {messages.map(m => (
        <p>{m.message}</p>
      ))}
    </>
  );
}

export default App;

 // 1. username stocké en state
  // 2. si pas de username → afficher un input
  // 3. si username → envoyer "identify" au serveur
  // 4. puis afficher <Chat username={username} />

//user CreateChatClient


