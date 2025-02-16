'use client';

import { useState, useEffect } from 'react';

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  reply?: string;
  created_at: string;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  // Fetch messages
  useEffect(() => {
    async function fetchMessages() {
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMessages(data);
    }
    fetchMessages();
  }, []);

  // Handle reply submission
  const handleReply = async (id: string) => {
    if (!replyText[id]) return;
    
    setLoading(true);
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, reply: replyText[id] }),
    });

    const result = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, reply: replyText[id] } : msg
        )
      );
      setReplyText((prev) => ({ ...prev, [id]: '' }));
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Messages</h2>
      {messages.length ? (
        messages.map((msg) => (
          <div key={msg.id} className="p-4 mb-4 bg-gray-100 rounded-lg shadow-sm">
            <p className="text-lg font-semibold text-gray-700">{msg.name} ({msg.email})</p>
            <p className="text-sm text-gray-600 mb-2">"{msg.message}"</p>

            {msg.reply ? (
              <p className="text-green-600 text-sm">Reply: {msg.reply}</p>
            ) : (
              <div className="mt-2">
                <textarea
                  placeholder="Write a reply..."
                  value={replyText[msg.id] || ''}
                  onChange={(e) => setReplyText({ ...replyText, [msg.id]: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={() => handleReply(msg.id)}
                  disabled={loading}
                  className="mt-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                >
                  {loading ? 'Replying...' : 'Send Reply'}
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No messages found.</p>
      )}
    </div>
  );
}