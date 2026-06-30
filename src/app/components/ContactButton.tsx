"use client";

import React from "react";

export default function ContactButton() {
  return (
    <button
      className="inline-flex justify-center group px-8 py-4 bg-electric-indigo text-platinum font-button text-button rounded-full items-center gap-2 hover:bg-shock-pink transition-colors duration-300 shadow-[0_0_20px_rgba(106,40,255,0.4)]"
      onClick={() => window.dispatchEvent(new Event("open-contact-modal"))}
    >
      Start a Project
      <span
        className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform duration-300"
        data-icon="arrow_forward"
      >
        arrow_forward
      </span>
    </button>
  );
}
