"use client";

import { useEffect, useRef } from "react";

import {
  KONAMI_SEQUENCE,
  PARTY_MODE_DURATION_MS,
  SECRET_WORD,
  logConsoleEasterEgg,
  showSiteToast,
} from "@/lib/easter-eggs";

export function SiteEasterEggs() {
  const konamiIndex = useRef(0);
  const secretBuffer = useRef("");
  const partyTimeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    logConsoleEasterEgg();

    const activatePartyMode = () => {
      document.documentElement.classList.add("fx-party-mode");
      showSiteToast("Satellite mode activated — full send!");
      if (partyTimeout.current !== undefined) {
        window.clearTimeout(partyTimeout.current);
      }
      partyTimeout.current = window.setTimeout(() => {
        document.documentElement.classList.remove("fx-party-mode");
      }, PARTY_MODE_DURATION_MS);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      const expected = KONAMI_SEQUENCE[konamiIndex.current];
      if (event.code === expected) {
        konamiIndex.current += 1;
        if (konamiIndex.current === KONAMI_SEQUENCE.length) {
          konamiIndex.current = 0;
          activatePartyMode();
        }
        return;
      }
      konamiIndex.current = event.code === KONAMI_SEQUENCE[0] ? 1 : 0;

      if (event.key.length === 1 && /[a-z]/i.test(event.key)) {
        secretBuffer.current = (
          secretBuffer.current + event.key.toLowerCase()
        ).slice(-SECRET_WORD.length);
        if (secretBuffer.current === SECRET_WORD) {
          secretBuffer.current = "";
          showSiteToast("Hey — you typed my name. Welcome!");
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("fx-party-mode", activatePartyMode);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("fx-party-mode", activatePartyMode);
      if (partyTimeout.current !== undefined) {
        window.clearTimeout(partyTimeout.current);
      }
      document.documentElement.classList.remove("fx-party-mode");
    };
  }, []);

  return null;
}
