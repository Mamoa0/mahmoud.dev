"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, Bot } from "lucide-react";

const REMINDER_INTERVAL = 1000 * 60 * 5; // 5 minutes
const STORAGE_KEY = "chatbot-reminder-shown";

export const ChatbotReminder = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkAndShowReminder = () => {
        const lastShown = localStorage?.getItem(STORAGE_KEY);
        const shouldShow =
          !lastShown || Date.now() - Number(lastShown) > REMINDER_INTERVAL;

        if (shouldShow) {
          setOpen(true);
          localStorage?.setItem(STORAGE_KEY, Date.now().toString());
        }
      };

      // Show on first visit or after interval
      checkAndShowReminder();

      // Set up periodic reminder
      const interval = setInterval(checkAndShowReminder, REMINDER_INTERVAL);

      return () => clearInterval(interval);
    }
  }, []);

  const handleStartChat = () => {
    setOpen(false);
    // Find and click the chat button
    const chatButton = document.querySelector(
      '[data-chat-trigger="true"]'
    ) as HTMLButtonElement;
    if (chatButton) {
      chatButton.click();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary rounded-full p-4 border-4 border-background">
          <Bot className="h-8 w-8 text-primary-foreground" />
        </div>

        <DialogHeader className="pt-4">
          <DialogTitle className="flex items-center justify-center gap-2 text-xl pt-6">
            <MessageCircle className="h-5 w-5" />
            Need Help? Chat with AI Assistant!
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            For an easy and fast way to know more about me, my skills and
            experiences, just click the chat icon in the bottom right corner!
            The AI chatbot will provide you with all the information you need.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4">
          <Button className="w-full" onClick={handleStartChat} size="lg">
            <MessageCircle className="h-5 w-5" />
            Start Chatting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
