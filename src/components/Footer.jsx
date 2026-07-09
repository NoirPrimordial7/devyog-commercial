"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="bg-[#07111f] px-5 py-12 text-[#F8F4EE] sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-[1500px] gap-10 border-t border-[#E4B86A]/18 pt-10 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <a href="#exterior" aria-label="DEVYOG home" className="inline-flex">
            <img
              src="/assets/brand/devyog-logo.svg"
              alt="DEVYOG Builders & Developers"
              className="h-14 w-auto opacity-95"
            />
          </a>
          <p className="mt-7 text-[0.7rem] font-bold uppercase tracking-[0.36em] text-[#E4B86A]">
            DEVYOG · Builders & Developers
          </p>
        </div>

        <address className="not-italic text-sm leading-8 text-[#F8F4EE]/62 lg:text-right">
          <a className="transition-colors hover:text-[#E4B86A]" href="mailto:info@devyogprojects.co.in">
            info@devyogprojects.co.in
          </a>
          <br />
          <a className="transition-colors hover:text-[#E4B86A]" href="tel:+919921391412">
            +91 99213 91412
          </a>
          <br />
          <a
            className="transition-colors hover:text-[#E4B86A]"
            href="https://www.devyogprojects.co.in"
            target="_blank"
            rel="noreferrer"
          >
            www.devyogprojects.co.in
          </a>
          <br />
          Solapur-Pune Hwy, Loni Kalbhor, Pune 412201
        </address>
      </div>

      <div className="mx-auto mt-10 max-w-[1500px] border-t border-[#E4B86A]/10 pt-6">
        <p className="max-w-4xl text-xs leading-relaxed text-[#F8F4EE]/36">
          Confidential investor teaser for select institutional buyers,
          operators, and REITs. All parameters are indicative and subject to
          change based on tenant commitments and market conditions.
        </p>
      </div>
    </footer>
  );
}
