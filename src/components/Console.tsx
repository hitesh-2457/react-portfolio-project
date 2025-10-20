import React, { useEffect, useRef, useState } from "react";
import ByteRobot, { type ByteMode } from "./ByteRobot";
import "./Console.css";
import { CONSOLE_COMMANDS } from "../constants";
import { setGlobalByteConsoleLogger } from "../utils/consoleLogger";

// Tone/theme for each log type
const TONE_CLASS: Record<string, string> = {
  muted: "log-line log-muted show",
  warn: "log-line log-warn show",
  error: "log-line log-error show",
  ok: "log-line log-ok show",
};

// Fun lines for simulated boot/log
const FUN_LINES = [
  "Compiling coffee ☕…",
  "Warming up servers…",
  "Allocating extra vibes…",
  "Optimizing pixels…",
  "Spinning up tiny hamsters…",
  "Hydrating UI…",
];

const COMMANDS_HELP = CONSOLE_COMMANDS;

const MAX_LINES = 10;


// React version of Console
function Console({ autoToggleDelay = 1500 }: { autoToggleDelay?: number }) {
  const [lines, setLines] = useState<
    Array<{ html: string; tone: string; key: string }>
  >([]);
  const [inputVal, setInputVal] = useState("");
  const [hint, setHint] = useState(
    'type a command or try <span class="c-cmd">"help"</span>'
  );
  const [byteMode, setByteMode] = useState<ByteMode>("idle");
  const [byteTip, setByteTip] = useState("");
  const logLinesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showPanel, setShowPanel] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false); // Start expanded for splash screen
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const didBoot = useRef(false);

  // Append a log line
  function appendLine(
    html: string,
    tone: string = "muted"
  ) {
    setLines((prev) => {
      let next = [...prev, { html, tone, key: Math.random().toString(36) }];
      if (next.length > MAX_LINES) next = next.slice(next.length - MAX_LINES);
      return next;
    });
    // Byte reacts to content too!
    if (html.includes("200 OK")) chibiState("ok", "Success!");
    if (html.toLowerCase().includes("error")) chibiState("error", "Oops!");
  }

  // Set up global logging so other components can log to Byte Console
  useEffect(() => {
    setGlobalByteConsoleLogger(appendLine);
    return () => setGlobalByteConsoleLogger(() => {});
  }, []);

  // Byte robot mood handler
  const stateTimer = useRef<NodeJS.Timeout | null>(null);

  function chibiState(mode: ByteMode, tip = "") {
    setByteTip(tip);
    setByteMode(mode);
    if (stateTimer.current) clearTimeout(stateTimer.current);
    if (!mode || mode === "idle") {
      stateTimer.current = setTimeout(() => {
        setByteMode("idle");
        setByteTip("");
      }, 1800);
    } else {
      stateTimer.current = setTimeout(() => {
        setByteMode("idle");
        setByteTip("");
      }, 1800);
    }
  }

  // Helper: update command hint
  function updateHint(value: string) {
    const v = (value || "").trim().toLowerCase();
    if (!v) {
      setHint(
        'type a command or try <span class="c-cmd">"help"</span>'
      );
      return;
    }
    const key = v.startsWith("/") ? v.slice(1) : v;
    if ((Object.prototype.hasOwnProperty.call(COMMANDS_HELP, key))) {
      setHint(
        `<span class="c-cmd">${key}</span> — <span class="c-note">${COMMANDS_HELP[key as keyof typeof COMMANDS_HELP]}</span>`
      );
      return;
    }
    const match = (Object.keys(COMMANDS_HELP) as Array<keyof typeof COMMANDS_HELP>).find((k) => k.startsWith(key));
    if (match) {
      setHint(
        `<span class="c-cmd">${match}</span> — <span class="c-note">${COMMANDS_HELP[match]}</span>`
      );
      return;
    }
    setHint(
      '<span class="c-note">Unknown so far… press Enter to try or type</span> <span class="c-cmd">"help"</span>'
    );
  }

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // React-side effect: focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
    // Show boot lines only once, even with React StrictMode double-call
    if (!didBoot.current) {
      didBoot.current = true;
      setShowPanel(!isSmallScreen); // Show on large, hide on small initially
      appendLine(
        '<span class="c-verb">Booting</span> <span class="c-sec">client</span>…',
        "muted"
      );
      setTimeout(
        () =>
          appendLine(
            '<span class="c-verb">Prefetch</span> <span class="c-sec">assets</span>',
            "warn"
          ),
        220
      );
      setTimeout(
        () =>
          appendLine(
            '<span class="c-verb">GET</span> <span class="c-path">/</span> <span class="log-ok">200 OK</span>',
            "muted"
          ),
        520
      );
      setTimeout(() => {
        appendLine(FUN_LINES[Math.floor(Math.random() * FUN_LINES.length)]);
      }, 900);
    }
    // Keyboard shortcut: focus on '/' pressed
    function handleGlobalKeydown(e: KeyboardEvent) {
      if (
        e.key === "/" &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey &&
        document.activeElement !== inputRef.current
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleGlobalKeydown);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeydown);
      if (stateTimer.current) clearTimeout(stateTimer.current);
    };
    // eslint-disable-next-line
  }, [isSmallScreen]);

  // Scroll to bottom of logs when a new log appears
  useEffect(() => {
    if (logLinesRef.current)
      logLinesRef.current.scrollTop = logLinesRef.current.scrollHeight;
  }, [lines]);

  // Auto-toggle console after specified delay
  useEffect(() => {
    if (isSmallScreen) return;

    const toggleTimeout = setTimeout(() => {
      setIsMinimized(true);
    }, autoToggleDelay);

    return () => clearTimeout(toggleTimeout);
  }, [autoToggleDelay, isSmallScreen]);



  // Command handling logic
  function handleCommand(cmdRaw: string) {
    const cmd = cmdRaw.trim();
    if (!cmd) return;
    const lower = cmd.toLowerCase();
    appendLine(`> <span class="c-cmd">${cmd}</span>`, "muted");
    // respond to hello/wave
    if (lower === "hello" || lower === "wave") {
      chibiState("wave", "Hello 👋");
      appendLine(
        '<span class="c-sec">Byte</span>: <span class="c-note">Waving at you 👋</span>',
        "muted"
      );
      setInputVal("");
      updateHint("");
      return;
    }
    // clear command
    if (lower === "clear") {
      setLines([]);
      appendLine('<span class="c-note">Console cleared</span>', "ok");
      setInputVal("");
      updateHint("");
      return;
    }
    // show help
    if (lower === "help") {
      appendLine('<span class="c-sec">Commands</span>:', "warn");
      Object.entries(COMMANDS_HELP).forEach(([k, v]) => {
        appendLine(
          `- <span class="c-cmd">${k}</span>: <span class="c-note">${v}</span>`,
          "muted"
        );
      });
      setInputVal("");
      updateHint("");
      return;
    }
    // download command
    if (lower === "download") {
      appendLine(
        '<span class="c-note">Download triggered (not implemented)</span>',
        "muted"
      );
      // TODO: Implement download
      setInputVal("");
      updateHint("");
      return;
    }
    // (github command removed)
    // navigation commands
    if (["about", "projects", "contact", "home"].includes(lower)) {
      const target = document.getElementById(lower);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        appendLine(`<span class="c-note">Scrolling to ${lower}...</span>`, "muted");
      } else {
        appendLine(`<span class="c-note">Section ${lower} not found</span>`, "error");
      }
      setInputVal("");
      updateHint("");
      return;
    }

    appendLine(
      `<span class="c-note">Unknown command:</span> <span class="c-cmd">${cmd}</span>`,
      "warn"
    );
    setInputVal("");
    updateHint("");
  }



  // Byte robot interactive handlers
  const handleByte = {
    mouseEnter: () => chibiState("typing", "Hi!"),
    mouseLeave: () => chibiState("idle", ""),
    click: () => {
      chibiState("wave", "Hello 👋");
      appendLine(
        '<span class="c-sec">Byte</span>: <span class="c-note">Hello there!</span>',
        "warn"
      );
    },
    doubleClick: () => {
      chibiState("fun", "Boop ✨");
      appendLine(
        '<span class="c-sec">Byte</span>: <span class="c-note">Boop!</span>',
        "muted"
      );
    },
    keyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        chibiState("wave", "Hello 👋");
      }
      if (e.key.toLowerCase() === "f") {
        chibiState("fun", "Sparkle ✨");
      }
    },
  };

  // Don't render console on small screens for better performance
  if (isSmallScreen) {
    return null;
  }

  return (
    <>
      {/* Console with Byte the Robot */}
      <div
        id="log-console"
        className={`log-panel${showPanel ? " show" : ""}${isMinimized ? " minimized" : ""}`}
        aria-live="polite"
        aria-atomic="false"
        role="region"
        aria-label="Simulated console"
      >
      {/* Minimize/Maximize button */}
      <button
        onClick={() => setIsMinimized(!isMinimized)}
        className="absolute top-2 right-2 z-10 w-6 h-6 rounded bg-slate-700 hover:bg-slate-600 text-white text-xs flex items-center justify-center"
        aria-label={isMinimized ? "Show logs" : "Hide logs"}
      >
        {isMinimized ? "+" : "−"}
      </button>
      {/* Left: Byte (Robot) */}
      <div className="byte-wrap" aria-hidden="true">
        <ByteRobot
          mode={byteMode}
          tip={byteTip}
          eventHandlers={{
            onMouseEnter: handleByte.mouseEnter,
            onMouseLeave: handleByte.mouseLeave,
            onClick: handleByte.click,
            onDoubleClick: handleByte.doubleClick,
            onKeyDown: handleByte.keyDown,
          }}
        />
      </div>
      {/* Right: Console body */}
      {!isMinimized && (
        <div className="log-body">
          <div id="log-live" className="sr-only" aria-live="polite" aria-atomic="false">
            {lines.length > 0 ? lines[lines.length - 1].html.replace(/<[^>]+>/g, "") : ""}
          </div>
          <div
            id="log-lines"
            className="log-lines"
            ref={logLinesRef}
          >
            {lines.map((line) => (
              <div
                key={line.key}
                className={TONE_CLASS[line.tone] || TONE_CLASS.muted}
                dangerouslySetInnerHTML={{ __html: `<span class="log-dot"></span><span>${line.html}</span>` }}
              />
            ))}
          </div>
          <div id="log-prompt" className="log-prompt">
            <span>{">"}</span>
            <div className="relative flex-1">
              <textarea
                id="log-input"
                className="log-input"
                aria-label="Console input"
                placeholder=""
                ref={inputRef}
                value={inputVal}
                autoComplete="off"
                style={{ border: "none", outline: "none", boxShadow: "none", width: "100%", resize: "none", fontFamily: "inherit", fontSize: "12px" }}
                rows={1}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  updateHint(e.target.value);
                  chibiState("typing", "Typing…");
                }}
                onFocus={() => chibiState("typing", "Typing…")}
                onBlur={() => chibiState("idle", "")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleCommand(inputVal);
                  }
                }}
              />
            </div>
          </div>
          <div
            id="log-hint"
            className="log-hint"
            dangerouslySetInnerHTML={{ __html: hint }}
          />
        </div>
      )}
    </div>
    </>
  );
}

export default Console;
