import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MessageCircle, Send, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";
import formatMessage from "@/lib/formatBotMessage";
import { BOT_MESSAGE } from "@/constants";

interface Message {
  content: string;
  isUser: boolean;
  displayedContent?: string; // For the typing effect
  isTyping?: boolean;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      content:
        "Hi! I'm an AI assistant that can tell you about the Mahmoud's portfolio. How can I help you today?",
      isUser: false,
      displayedContent: "", // Will be filled gradually
      isTyping: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [quotaReached, setQuotaReached] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const MESSAGE_QUOTA = 20; // Maximum number of messages allowed

  // Typing effect
  useEffect(() => {
    const typingMessages = messages.filter((m) => m.isTyping);

    if (typingMessages.length === 0) return;

    const currentMessage = typingMessages[0];
    const fullContent = currentMessage.content;
    const displayedContent = currentMessage.displayedContent || "";

    if (displayedContent.length < fullContent.length) {
      const timer = setTimeout(() => {
        // Update the displayed content with one more character
        setMessages((prevMessages) =>
          prevMessages.map((msg, idx) => {
            if (idx === messages.indexOf(currentMessage)) {
              return {
                ...msg,
                displayedContent: fullContent.slice(
                  0,
                  displayedContent.length + 1
                ),
                isTyping: displayedContent.length + 1 < fullContent.length,
              };
            }
            return msg;
          })
        );
      }, 15); // Speed of typing, lower = faster

      return () => clearTimeout(timer);
    }
  }, [messages]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Check if quota has been reached
    if (messageCount >= MESSAGE_QUOTA && !quotaReached) {
      setQuotaReached(true);
      setMessages((prev) => [
        ...prev,
        {
          content: input,
          isUser: true,
        },
        {
          content:
            "You've reached the free message quota. I recommend speaking to Mahmoud directly or supporting his work by buying him a coffee. You can use his PayPal: https://paypal.me/Mahmoua07",
          isUser: false,
          displayedContent: "",
          isTyping: true,
        },
      ]);
      setInput("");
      return;
    }

    // If quota already reached, don't process further messages
    if (quotaReached) {
      setInput("");
      return;
    }

    // Add user message to chat
    const userMessage = input;
    setMessages((prev) => [...prev, { content: userMessage, isUser: true }]);
    setInput("");
    setIsLoading(true);

    // Increment message count
    setMessageCount((prev) => prev + 1);

    try {
      // Prepare the conversation history for context
      const conversationHistory = [];

      for (let i = 1; i < messages.length; i++) {
        const msg = messages[i];
        if (msg.isUser) {
          // Only add user messages to history
          conversationHistory.push({
            role: "user",
            parts: [{ text: msg.content }],
          });

          // If there's a response to this user message, add it too
          if (i + 1 < messages.length && !messages[i + 1].isUser) {
            conversationHistory.push({
              role: "model",
              parts: [{ text: messages[i + 1].content }],
            });
          }
        }
        // Skip model messages as they're handled in the user message loop
      }

      // Add the new user message
      conversationHistory.push({
        role: "user",
        parts: [{ text: userMessage }],
      });

      // Call the Gemini API through our backend
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: conversationHistory,
          systemPrompt: BOT_MESSAGE,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from AI");
      }

      const data = await response.json();
      const aiResponse = data.message;

      // Add AI response to the chat with typing effect
      setMessages((prev) => [
        ...prev,
        {
          content: aiResponse,
          isUser: false,
          displayedContent: "", // Start empty
          isTyping: true,
        },
      ]);

      // Check if we're approaching quota limit to give a warning
      if (messageCount === MESSAGE_QUOTA - 10) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              content:
                "You have 10 messages remaining in your free quota. For unlimited conversation, please consider contacting Mahmoud directly or supporting his work.",
              isUser: false,
              displayedContent: "",
              isTyping: true,
            },
          ]);
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          content:
            "Sorry, I'm having trouble connecting to my brain right now. Please try again later.",
          isUser: false,
          displayedContent: "",
          isTyping: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-4 right-4 z-50 md:bottom-8 md:right-8 h-12 w-12 rounded-full p-0 shadow-lg hover:shadow-xl transition-shadow"
          size="icon"
          data-chat-trigger="true"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full w-[90vw] sm:w-[400px] p-0">
        <SheetHeader className="px-4 py-3 border-b">
          <SheetTitle>Portfolio Assistant</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto space-y-4 p-4 scrollbar-thin scrollbar-thumb-gray-300">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex w-full",
                message.isUser ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "rounded-2xl px-4 py-2 max-w-[85%] break-words",
                  message.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.isUser
                  ? message.content
                  : formatMessage(message.displayedContent || "")}
                {message.isTyping && (
                  <span className="inline-block w-1 h-4 ml-1 bg-gray-500 animate-pulse"></span>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl px-4 py-2">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t p-4 bg-background">
          {quotaReached ? (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-gray-500 mb-2">
                You&lsquo;ve reached the free message quota
              </p>
              <Button
                className="flex items-center justify-center gap-2 w-full"
                onClick={() =>
                  window.open("https://paypal.me/Mahmoua07", "_blank")
                }
              >
                <Coffee className="h-4 w-4" />
                Buy Mahmoud a coffee
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  (window.location.href = "mailto:mahmoua07@gmail.com")
                }
              >
                Contact Mahmoud directly
              </Button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="shrink-0"
                disabled={isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatBot;
