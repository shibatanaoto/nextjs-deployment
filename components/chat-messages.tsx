import React, { FC } from "react";
import { ChatBubble } from "@/components/chat-bubble";
import { MdRenderer } from "@/components/md-renderer";

// Copied from Verce AI SDK Message interface
interface Message {
  /**
  A unique identifier for the message.
   */
  id: string;
  /**
  The timestamp of the message.
   */
  createdAt?: Date;
  /**
  Text content of the message.
   */
  content: string;
  /**
   * Additional attachments to be sent along with the message.
   */
  // experimental_attachments?: Attachment[];
  role: "system" | "user" | "assistant" | "data";
  // data?: JSONValue;
  /**
   * Additional message-specific information added on the server via StreamData
   */
  // annotations?: JSONValue[] | undefined;
  /**
  Tool invocations (that can be tool calls or tool results, depending on whether or not the invocation has finished)
  that the assistant made as part of this message.
   */
  // toolInvocations?: Array<ToolInvocation>;
}

export interface ChatMessagesProps {
  messages: Message[];
  status?: string;
}

const ChatMessages: FC<ChatMessagesProps> = ({ messages, status }) => {
  const getVariantFromRole = (role: Message["role"]) => {
    switch (role) {
      case "system":
        return "supplementary";
      case "user":
        return "bubble";
      case "assistant":
        return "ghost";
      case "data":
        return "supplementary";
    }
  };

  const getClassFromRole = (role: Message["role"]) => {
    switch (role) {
      case "user":
        return "text-right ml-auto";
      default:
        return "";
    }
  };
  return (
    <div className="w-full grid grid-cols-1 gap-4">
      {messages.map((message, i) => (
        <ChatBubble
          key={message.id}
          variant={getVariantFromRole(message.role)}
          className={getClassFromRole(message.role)}
        >
          <MdRenderer
            value={message.content}
            isLoading={i === messages.length - 1 && status === "streaming"}
          />
        </ChatBubble>
      ))}
    </div>
  );
};

export { ChatMessages };
