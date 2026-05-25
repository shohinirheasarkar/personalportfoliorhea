"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  suggestedQuestions,
  type SuggestedQuestion,
} from "@/data/portfolio-chat";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (open) scrollToBottom();
  }, [open, messages, scrollToBottom]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      const fab = document.getElementById("portfolio-chat-fab");
      if (fab?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const askQuestion = useCallback((item: SuggestedQuestion) => {
    setMessages((prev) => [
      ...prev,
      { id: createId(), role: "user", text: item.question },
      {
        id: createId(),
        role: "assistant",
        text: item.placeholderAnswer,
      },
    ]);
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      const trimmed = input.trim();
      if (!trimmed) return;

      setMessages((prev) => [
        ...prev,
        { id: createId(), role: "user", text: trimmed },
        {
          id: createId(),
          role: "assistant",
          text: "Thanks for your question! A live portfolio assistant is coming soon — try a suggested prompt above or explore Projects, Research, and Resume in the meantime.",
        },
      ]);
      setInput("");
    },
    [input],
  );

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.96 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto mb-3 w-[min(100vw-2rem,22rem)] origin-bottom-right sm:w-[24rem]"
            id="portfolio-chat-panel"
            role="dialog"
            aria-label="Ask my portfolio"
          >
            <div className="fx-rainbow-border fx-rainbow-border--rounded fx-glimmer fx-glimmer--subtle overflow-hidden shadow-lg">
              <div className="fx-glass fx-glass--panel flex max-h-[min(32rem,70vh)] flex-col rounded-[calc(1rem-2px)]">
                <header className="flex items-start justify-between gap-3 border-b border-white/50 px-4 py-3 dark:border-white/10">
                  <div>
                    <p className="font-heading text-base tracking-tight text-neutral-900 dark:text-neutral-50">
                      Ask my portfolio
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                      UI preview — assistant coming soon
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-white/50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-neutral-50"
                    aria-label="Close chat"
                  >
                    <X className="size-4" aria-hidden />
                  </button>
                </header>

                <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
                  {messages.length === 0 ? (
                    <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                      Pick a question to explore Rhea&apos;s work — answers are
                      placeholders until the assistant is connected.
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {messages.map((message) => (
                        <li
                          key={message.id}
                          className={cn(
                            "flex",
                            message.role === "user" ? "justify-end" : "justify-start",
                          )}
                        >
                          <p
                            className={cn(
                              "max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                              message.role === "user"
                                ? "bg-neutral-900/90 text-white dark:bg-white/15 dark:text-neutral-50"
                                : "border border-white/60 bg-white/40 text-neutral-700 dark:border-white/10 dark:bg-white/8 dark:text-neutral-200",
                            )}
                          >
                            {message.text}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div ref={messagesEndRef} aria-hidden className="h-0" />
                </div>

                <div className="border-t border-white/50 px-4 py-3 dark:border-white/10">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                    Suggested
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {suggestedQuestions.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => askQuestion(item)}
                          className={cn(
                            "rounded-full border border-white/70 bg-white/45 px-2.5 py-1 text-left text-xs leading-snug text-neutral-700 transition-colors",
                            "hover:border-white hover:bg-white/70 hover:text-neutral-900",
                            "dark:border-white/12 dark:bg-white/8 dark:text-neutral-200 dark:hover:bg-white/14 dark:hover:text-neutral-50",
                          )}
                        >
                          {item.question}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="flex gap-2 border-t border-white/50 p-3 dark:border-white/10"
                >
                  <label htmlFor="portfolio-chat-input" className="sr-only">
                    Ask a question
                  </label>
                  <input
                    id="portfolio-chat-input"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Type a question…"
                    className={cn(
                      "h-9 min-w-0 flex-1 rounded-lg border border-white/60 bg-white/50 px-3 text-sm text-neutral-900 outline-none",
                      "placeholder:text-neutral-400 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
                      "dark:border-white/12 dark:bg-white/8 dark:text-neutral-50 dark:placeholder:text-neutral-500",
                    )}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className={cn(
                      buttonVariants({ size: "icon" }),
                      "shrink-0 disabled:opacity-40",
                    )}
                    aria-label="Send message"
                  >
                    <Send className="size-4" aria-hidden />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        id="portfolio-chat-fab"
        type="button"
        onClick={() => setOpen((current) => !current)}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={prefersReducedMotion ? undefined : { y: -2 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
        className={cn(
          "pointer-events-auto inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium shadow-lg",
          "fx-rainbow-border fx-rainbow-border--pill fx-glimmer fx-glimmer--subtle",
        )}
        aria-expanded={open}
        aria-controls="portfolio-chat-panel"
        aria-label={open ? "Close portfolio chat" : "Ask my portfolio"}
      >
        <span className="fx-glass fx-glass--pill flex items-center gap-2 px-1 py-0.5 text-neutral-800 dark:text-neutral-100">
          <MessageCircle className="size-4 shrink-0 opacity-80" aria-hidden />
          Ask my portfolio
        </span>
      </motion.button>
    </div>
  );
}
