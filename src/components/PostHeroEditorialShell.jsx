"use client";

import React from "react";

export function PostHeroEditorialShell({ children }) {
  return (
    <div className="relative isolate bg-[#e7decf] text-[#171510]">
      <div
        aria-hidden="true"
        className="pointer-events-none sticky top-0 z-0 h-[100svh] overflow-hidden bg-[#e7decf]"
      >
        <div
          className="absolute inset-0 opacity-[0.54]"
          style={{
            background:
              "radial-gradient(circle at 52% 46%, rgba(176,130,62,0.24), transparent 25%), repeating-conic-gradient(from -12deg at 52% 46%, rgba(54,46,31,0.14) 0deg, rgba(54,46,31,0.14) 0.26deg, transparent 0.26deg, transparent 8.8deg)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_46%,rgba(255,237,194,0.18),transparent_34%),linear-gradient(180deg,rgba(231,222,207,0.86),rgba(222,210,190,0.98))]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#eee7d9] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#dbcfbb] to-transparent" />
      </div>

      <div className="relative z-10 -mt-[100svh]">{children}</div>
    </div>
  );
}
