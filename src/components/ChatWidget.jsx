import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Bot, User, ExternalLink } from "lucide-react";

export default function ChatWidget() {
  // 🔗 Replace with your GPT model/chat URL
  const gptUrl = "https://chatgpt.com/g/g-z87veQAZR-mitogseu-keulrinig";

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", content: "안녕하세요! 미톡스 도우미입니다. 무엇을 도와드릴까요?" },
  ]);

  const listRef = useRef(null);
  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [open, messages]);

  const openFullChat = (prefill = "") => {
    // Try to pass the first message along as a query param (adjust param name as your link supports)
    const url =
      prefill.trim().length > 0
        ? `${gptUrl}?q=${encodeURIComponent(prefill)}`
        : gptUrl;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const send = (e) => {
    e?.preventDefault?.();
    const text = input.trim();
    if (!text) return;

    // Local chat-like preview
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");

    // Optional: small hint that the full chat will open
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          content: "자세한 상담을 위해 전체 챗으로 이동합니다…",
        },
      ]);
      openFullChat(text);
    }, 150);
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
            미톡스 GPT와 상담하기
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
            <div
              ref={listRef}
              className="px-3 py-3 max-h-80 overflow-y-auto space-y-2"
            >
              {messages.map((m, i) => {
                const isUser = m.role === "user";
                return (
                  <div
                    key={i}
                    className={
                      "flex items-start gap-2 " +
                      (isUser ? "justify-end" : "justify-start")
                    }
                  >
                    {!isUser && (
                      <div className="mt-1 shrink-0 h-6 w-6 rounded-full bg-[color:var(--pink-500)]/90 text-white grid place-items-center">
                        <Bot size={14} />
                      </div>
                    )}
                    <div
                      className={
                        "max-w-[75%] rounded-xl px-3 py-2 text-sm " +
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
            </div>

            {/* Composer */}
            <form
              onSubmit={send}
              className="flex items-center gap-2 px-3 pb-3 pt-1"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="메시지를 입력하세요…"
                className="w-full rounded-lg px-3 py-2 bg-transparent border border-black/10 dark:border-white/10 text-sm"
              />
              <button
                type="submit"
                className="diag-hover rounded-none px-3 py-2 border border-black/10 dark:border-white/10"
                title="Send"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
              <button
                type="button"
                onClick={() => openFullChat("")}
                className="diag-hover rounded-none px-3 py-2 border border-black/10 dark:border-white/10"
                title="Open full chat"
              >
                <ExternalLink size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
