"use client";
import JSConfetti from "js-confetti";
import { useEffect } from "react";

export function Confetti({ message }: { message?:string }) {
  useEffect(() => {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti();
  }, []);

  return message || "Here you go 🎉!";
}
