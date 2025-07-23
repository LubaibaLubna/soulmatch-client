import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";

const MyMessages = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState({});
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      window.location.href = "/login";
    } else {
      setUserEmail(user.email);
    }
  }, []);

  useEffect(() => {
    if (!userEmail) return;

    fetch(`https://ass-12-server-wheat.vercel.app/api/messages?userEmail=${userEmail}`)
      .then(res => res.json())
      .then(data => {
        setMessages(data);

        // Group messages by the OTHER party's id/email
        const grouped = data.reduce((acc, msg) => {
          // Determine the "other party" in the conversation
          let otherParty = null;
          if (msg.senderEmail === userEmail) {
            otherParty = msg.recipientBiodataId; // recipient is the other party
          } else {
            otherParty = msg.senderEmail; // sender is the other party
          }

          if (!acc[otherParty]) acc[otherParty] = [];
          acc[otherParty].push(msg);
          return acc;
        }, {});

        setConversations(grouped);

        // Automatically select the first conversation
        const firstConv = Object.keys(grouped)[0];
        setSelectedConversationId(firstConv);
      })
      .catch(() => Swal.fire("Error", "Failed to load messages", "error"));
  }, [userEmail]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const recipientId = selectedConversationId;
    if (!recipientId) return;

    try {
      const res = await fetch("https://ass-12-server-wheat.vercel.app/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderEmail: userEmail,
          recipientBiodataId: recipientId,
          message: newMessage.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        // Append the new message locally
        setMessages(prev => [...prev, {
          senderEmail: userEmail,
          recipientBiodataId: recipientId,
          message: newMessage.trim(),
          createdAt: new Date().toISOString(),
        }]);
        setConversations(prev => {
          const updated = { ...prev };
          if (!updated[recipientId]) updated[recipientId] = [];
          updated[recipientId].push({
            senderEmail: userEmail,
            recipientBiodataId: recipientId,
            message: newMessage.trim(),
            createdAt: new Date().toISOString(),
          });
          return updated;
        });
        setNewMessage("");
      } else {
        Swal.fire("Error", data.error || "Failed to send message", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to send message", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex max-w-6xl mx-auto rounded-lg shadow-lg">
      {/* Conversations List */}
      <div className="w-1/3 bg-white rounded-lg shadow p-4 overflow-y-auto max-h-[80vh]">
        <h2 className="text-xl font-semibold mb-4">Conversations</h2>
        {Object.keys(conversations).length === 0 && <p>No conversations yet.</p>}
        <ul>
          {Object.entries(conversations).map(([convId, msgs]) => {
            const lastMsg = msgs[msgs.length - 1];
            return (
              <li
                key={convId}
                onClick={() => setSelectedConversationId(convId)}
                className={`cursor-pointer p-3 rounded mb-2 ${
                  selectedConversationId === convId ? "bg-pink-200" : "hover:bg-pink-100"
                }`}
              >
                <div className="font-semibold truncate">{convId}</div>
                <div className="text-sm text-gray-600 truncate">
                  {lastMsg.senderEmail === userEmail ? "You: " : ""}
                  {lastMsg.message}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Messages Panel */}
      <div className="flex-1 bg-white rounded-lg shadow flex flex-col p-4 ml-4 max-h-[80vh]">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        {!selectedConversationId && <p>Select a conversation to start chatting.</p>}

        <div className="flex-1 overflow-y-auto mb-4 space-y-3 flex flex-col">
          {selectedConversationId &&
            conversations[selectedConversationId]?.map((msg, i) => {
              const isSender = msg.senderEmail === userEmail;
              return (
                <div
                  key={i}
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    isSender ? "bg-pink-600 text-white self-end" : "bg-gray-200 text-gray-900 self-start"
                  }`}
                  style={{ wordBreak: "break-word" }}
                >
                  {msg.message}
                  <div className="text-xs text-gray-400 mt-1 text-right">
                    {new Date(msg.createdAt).toLocaleString()}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Send Message */}
        {selectedConversationId && (
          <div className="flex gap-2">
            <textarea
              className="flex-1 border border-gray-300 rounded px-3 py-2 resize-none"
              rows={2}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-pink-600 text-white px-4 rounded hover:bg-pink-700"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMessages;
