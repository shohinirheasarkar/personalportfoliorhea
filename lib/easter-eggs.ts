export const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
] as const;

export const SECRET_WORD = "rhea";

export const HEADSHOT_CAPTIONS = [
  "Hi — thanks for stopping by!",
  "Currently caffeinated and curious.",
  "Ask me about satellites or calcium traces.",
  "Sunday lilies are on the Art page.",
  "⌘K opens the command palette.",
] as const;

export const PARTY_MODE_DURATION_MS = 12_000;

export function triggerPartyMode() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("fx-party-mode"));
}

export function showSiteToast(message: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("site-toast", { detail: { message } }),
  );
}

export function logConsoleEasterEgg() {
  if (typeof window === "undefined") return;
  console.log(
    "%c✦ Rhea's portfolio %c\n%cTry ⌘K · type “rhea” · Konami code ↑↑↓↓←→→←BA",
    "font-size:14px;font-weight:700;color:#7b61ff",
    "font-size:11px",
    "font-size:11px;color:#666",
  );
}
