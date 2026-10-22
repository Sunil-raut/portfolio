"use client";

import { useState } from "react";
import { copyText } from "../lib/copy";

export default function CopyButton({ text, label, className = "btn" }: { text: string; label: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function onClick() {
    if (await copyText(text)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1900);
    }
  }

  return (
    <button className={`${className}${copied ? " ok" : ""}`} onClick={onClick}>
      {copied ? "✓ Copied" : label}
    </button>
  );
}
