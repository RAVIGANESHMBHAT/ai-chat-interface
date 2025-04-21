import React, { useState, FormEvent } from "react";
import axios from "axios";
import "./ChatWithLLM.css";
import { FaPaperPlane } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import parse from "html-react-parser";

interface Source {
  name: string;
  url: string;
}

interface Message {
  type: "user" | "bot";
  text: string;
  source?: Source[];
}

const URL = "https://run.mocky.io/v3/57f8019b-03d2-41eb-a41a-93dbbd060410";

const ChatWithLLM: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [expandedIndexes, setExpandedIndexes] = useState<Set<number>>(new Set());

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post<{ content: string; source: Source[] }>(
        URL,
        { prompt: input }
      );
      const botMessage: Message = {
        type: "bot",
        text: response.data.content,
        source: response.data.source,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        type: "bot",
        text: "Error fetching response.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (index: number) => {
    setExpandedIndexes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.length === 0 ? (
          <div className="no-data">No Data</div>
        ) : (
          messages.map((msg, index) => (
            <React.Fragment key={index}>
              <div className={`message ${msg.type === "user" ? "user" : "bot"}`}>
                {msg.type === "bot" ? parse(msg.text) : msg.text}
              </div>
              {msg.type === "bot" && msg.source && msg.source.length > 0 && (
                <div className="source-section">
                  <h5
                    onClick={() => toggleExpand(index)}
                    className="collapsible-header"
                  >
                    {expandedIndexes.has(index) ? (
                      <FaChevronUp className="icon" />
                    ) : (
                      <FaChevronDown className="icon" />
                    )}
                    Source Documents
                  </h5>
                  {expandedIndexes.has(index) && (
                    <ul>
                      {msg.source.map((doc, idx) => (
                        <li key={idx}>
                          <a href={doc.url} target="_blank" rel="noopener noreferrer">
                            {doc.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </React.Fragment>
          ))
        )}
        {loading && (
          <div className="loading">
            <div className="loading-bubbles">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>
      <form className="input-box" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything"
        />
        <button type="submit" disabled={loading} title="Send">
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default ChatWithLLM;