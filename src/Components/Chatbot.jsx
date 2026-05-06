// import React, { useState } from "react";

// function Chatbot() {
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Hi! I'm Kyle from KejaLink 👋 How can I help?" }
//   ]);
//   const [input, setInput] = useState("");
//   const [open, setOpen] = useState(false);

//   const sendMessage = async () => {
//     if (!input) return;

//     const userMsg = { sender: "user", text: input };
//     setMessages(prev => [...prev, userMsg]);

//     try {
//       const res = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ message: input })
//       });

//       const data = await res.json();

//       const botMsg = { sender: "bot", text: data.reply };
//       setMessages(prev => [...prev, botMsg]);

//     } catch (err) {
//       setMessages(prev => [
//         ...prev,
//         { sender: "bot", text: "Error connecting to server." }
//       ]);
//     }

//     setInput("");
//   };

//   return (
//     <>
//       {/* Chat Button */}
//       <div
//         onClick={() => setOpen(!open)}
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           right: "20px",
//           background: "#007bff",
//           color: "#fff",
//           padding: "15px",
//           borderRadius: "50%",
//           cursor: "pointer",
//           zIndex: 999
//         }}
//       >
//         💬
//       </div>

//       {/* Chat Window */}
//       {open && (
//         <div
//           style={{
//             position: "fixed",
//             bottom: "80px",
//             right: "20px",
//             width: "300px",
//             height: "400px",
//             background: "#fff",
//             border: "1px solid #ccc",
//             borderRadius: "10px",
//             display: "flex",
//             flexDirection: "column",
//             zIndex: 999
//           }}
//         >
//           <div style={{ padding: "10px", background: "#007bff", color: "#fff" }}>
//             KejaLink Assistant
//           </div>

//           <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 style={{
//                   textAlign: msg.sender === "user" ? "right" : "left",
//                   margin: "5px 0"
//                 }}
//               >
//                 <span
//                   style={{
//                     background: msg.sender === "user" ? "#007bff" : "#eee",
//                     color: msg.sender === "user" ? "#fff" : "#000",
//                     padding: "8px",
//                     borderRadius: "10px",
//                     display: "inline-block"
//                   }}
//                 >
//                   {msg.text}
//                 </span>
//               </div>
//             ))}
//           </div>

//           <div style={{ display: "flex" }}>
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type a message..."
//               style={{ flex: 1, padding: "10px", border: "none" }}
//             />
//             <button onClick={sendMessage} style={{ padding: "10px" }}>
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Chatbot;