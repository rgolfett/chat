import './App.css'
import './Chat'
import { Box } from './Box'
import { useState } from 'react';


const [username, setUsername] = useState(""); 
// function App() {

//   return (
//     <div> 
//     	<Box name="Message :" message="get the msg" />

// 	</div>
//   )
// }
const messages = ["Bonjour", "Ça va ?", "Très bien !"];

function App() {
  return (
    <>
      <h1>Mon chat</h1>
      {messages.map(m => (
        <p>{m}</p>
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


