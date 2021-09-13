import React, { useCallback, useContext, useEffect, useState } from "react";
import { onMessageRecive, sendMessage } from "../../api/apiServer";
import loadChats from "../../api/chats";
import AuthContext from "../../Components/AuthContext";
import ChatMessage from "../../Components/ChatMessage/ChatMessage";
import Input from "../../Components/Input/Input";
import { ReactComponent as Chevron } from "./../../assets/chevronDark.svg";
import { ReactComponent as SendIcon } from "./../../assets/send.svg";

import "./chatPage.css";

function ChatPage({ location }) {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [chatsLoaded, setChatsLoaded] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setChatsLoaded(false);
      const { data: loadedChats } = await loadChats(user._id);
      const chatWithSeller = location.state;

      //check if loaded chats contains req user
      let hasUser = false;
      loadedChats.map((c) => {
        if (c.withUser._id === chatWithSeller._id) hasUser = true;
      });

      //Checking if forwarded from postDetails page and if their req user to chat with
      //if need to chat with new user adding that user to chats to initiate chats with him-her
      if (!hasUser) {
        setChats([
          ...loadedChats,
          {
            withUser: chatWithSeller,
            chats: [],
          },
        ]);
        setSelectedUser(chatWithSeller._id);
      } else {
        setChats(loadedChats);
      }
      setChatsLoaded(true);
    };
    try {
      if (user) fetch();
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    if (chatsLoaded) {
      onMessageRecive((recivedMessage) => {
        updateChats(recivedMessage, "from");
      });
    }
  }, [chatsLoaded]);

  class Message {
    constructor(from, to, message) {
      this.from = from;
      this.to = to;
      this.message = message;
      this.participents = [from, to];
    }
  }

  const handleMessageSend = () => {
    if (!message || !selectedUser) return;

    const { _id: myId } = user;
    const { _id: sendersId } = findUser(selectedUser).withUser;

    const messageDetails = new Message(myId, sendersId, message);
    sendMessage(messageDetails);

    updateChats(messageDetails, "to");
    setMessage("");
  };

  const updateChats = (newMessage, what) => {
    const allchats = [...chats];

    const updatedChats = allchats.map((chat) => {
      if (chat.withUser._id === newMessage[what]) {
        const all = [...chat.chats, newMessage];
        chat.chats = all;
        return chat;
      } else return chat;
    });

    setChats(updatedChats);
  };

  function findUser(id) {
    return chats.filter((c) => c.withUser._id === id)[0];
  }

  if (!user) return <h1>You Need to login frist</h1>;

  return (
    <div className="chat-container">
      <div className="inbox">
        <div className="inbox-header">
          <div className="round-img">
            <img src={user.profile_pic}></img>
          </div>
          <span>Chats</span>
        </div>
        {chats.map((chat, i) => (
          <div
            key={i}
            onClick={() => setSelectedUser(chat.withUser._id)}
            className="user-info"
          >
            <img
              className="img"
              src={chat.withUser.profile_pic}
              alt="user-img"
            />
            <div className="user-last-message">
              <span className="user-name">{chat.withUser.name}</span>
              <span className="lastMessage">
                {chat.chats[chats.length - 1]?.message}
              </span>
            </div>
            <Chevron />
          </div>
        ))}
      </div>
      <div className="chats-container">
        <div className="chats-header">
          {selectedUser ? (
            <>
              <img
                src={findUser(selectedUser)?.withUser.profile_pic}
                alt="selected-img"
              />
              <span>{findUser(selectedUser)?.withUser.name}</span>
            </>
          ) : (
            <span className>Messages</span>
          )}
        </div>
        {selectedUser ? (
          <div className="chats-messages-container">
            {findUser(selectedUser).chats.map((m, i) => (
              <ChatMessage
                key={i}
                message={m.message}
                isSelf={user._id === findUser(selectedUser).withUser._id}
              />
            ))}
          </div>
        ) : (
          <span className="note">Please Select a user and start Chating</span>
        )}
        <div className="chat-input-box">
          <Input
            disabled={!selectedUser}
            className="chat-input"
            placeholder="Type a message..."
            onChange={(e) => setMessage(e.currentTarget.value)}
            value={message}
          />
          <div className="send-icon">
            <SendIcon onClick={handleMessageSend} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
