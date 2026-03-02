import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Bot, User, ExternalLink, Loader2 } from "lucide-react"; // Added Loader2 back

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "안녕하세요! 미톡스 도우미입니다. 무엇을 도와드릴까요?" },
  ]);

  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [open, messages]);

  useEffect(() => {
    if (open && !isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open, isLoading]);

  const send = async (e) => {
    e?.preventDefault?.();
    const text = input.trim();
    if (!text || isLoading) return;

    // Show user message
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setIsLoading(true);

    const maxRetries = 2; // Will try 1 initial time + 2 retries (3 total)
    const delayMs = 1500; // Wait 1.5 seconds between retries

    try {
      let data = null;
      const chatHistory = [...messages, { role: "user", content: text }];
      // The Silent Retry Loop
      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          //Store chat history
          const response = await fetch("https://awicwbolytrwodzqwacp.supabase.co/functions/v1/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ history: chatHistory })
          });

          // 1. Check for Rate Limit (Spam)
          if (response.status === 429) {
            throw new Error("너무 빠른 요청입니다! 잠시 후 다시 시도해주세요 :)");
          }

          // 2. Check for other server errors
          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
          }

          // 3. Success! Parse data and break the loop
          data = await response.json();
          break; 

        } catch (err) {
          // If it's a 429 Spam error, DO NOT retry. Throw it to the outer catch immediately.
          if (err.message.includes("너무 빠른")) {
            throw err; 
          }
          
          // If we used up all our retries, throw a network error to the outer catch
          if (attempt === maxRetries) {
            throw new Error("네트워크가 불안정해요 :(");
          }
          
          // Otherwise, wait 1.5 seconds and loop again
          console.warn(`Connection failed. Retrying attempt ${attempt + 1}...`);
          await new Promise(resolve => setTimeout(resolve, delayMs));
        }
      }

      // Add Gemini's successful response to chat
      setMessages((m) => [...m, { role: "bot", content: data.reply }]);

    } catch (error) {
      console.error("Chat error:", error);
      
      setMessages((m) => [...m, { role: "bot", content: error.message }]);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* FAB (closed state) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          className="diag-hover fixed bottom-4 right-4 z-[100] rounded-none px-4 py-3 text-sm font-semibold text-white bg-[color:var(--mint-600)] shadow-lg"
        >
          <span className="inline-flex items-center gap-2">
            <MessageCircle size={16} />
            미톡스 AI와 상담하기
          </span>
        </button>
      )}

      {/* Chat panel (open state) */}
      {open && (
        <div className="fixed bottom-4 right-4 z-[100] w-[22rem] sm:w-96">
          <div className="card overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-black/10 dark:border-white/10 bg-[color:var(--surface)]/80">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-[color:var(--pink-500)]/90 text-white grid place-items-center">
                  <Bot size={16} />
                </div>
                <div className="text-sm font-semibold">Dr. Assistant</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="diag-hover rounded-none p-1.5 border border-black/10 dark:border-white/10"
                aria-label="Close chat"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div ref={listRef} className="px-3 py-3 max-h-80 overflow-y-auto space-y-2">
              {messages.map((m, i) => {
                const isUser = m.role === "user";
                return (
                  <div
                    key={i}
                    className={"flex items-start gap-2 " + (isUser ? "justify-end" : "justify-start")}
                  >
                    {!isUser && (
                      <div className="mt-1 shrink-0 h-6 w-6 rounded-full bg-[color:var(--pink-500)]/90 text-white grid place-items-center"> 
                        <Bot size={14} />
                      </div>
                    )}
                    <div
                      className={
                        "max-w-[75%] rounded-xl px-3 py-2 text-sm whitespace-pre-wrap " +
                        (isUser
                          ? "bg-[color:var(--mint-200)]/60"
                          : "bg-black/5 dark:bg-white/10")
                      }
                    >
                      {m.content}
                    </div>
                    {isUser && (
                      <div className="mt-1 shrink-0 h-6 w-6 rounded-full bg-[color:var(--mint-600)]/90 text-white grid place-items-center">
                        <User size={14} />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex items-start gap-2 justify-start">
                  <div className="mt-1 shrink-0 h-6 w-6 rounded-full bg-[color:var(--pink-500)]/90 text-white grid place-items-center">
                    <Loader2 className="animate-spin" size={14} />
                  </div>
                  <div className="max-w-[75%] rounded-xl px-3 py-2 text-sm bg-black/5 dark:bg-white/10 text-gray-500">
                    입력 중...
                  </div>
                </div>
              )}
            </div>

            {/* Composer */}
            <form onSubmit={send} className="flex items-center gap-2 px-3 pb-3 pt-1">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="메시지를 입력하세요 :)"
                disabled={isLoading}
                className="w-full rounded-lg px-3 py-2 bg-transparent border border-black/10 dark:border-white/10 text-sm disabled:opacity-50"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}