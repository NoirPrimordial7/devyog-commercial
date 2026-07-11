"use client";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { InvestmentDossierDesktop } from "./InvestmentDossierDesktop";
import { MobileInvestmentDossier } from "./MobileInvestmentDossier";
import "./investment-dossier.css";


function useMobileDossier() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 767px)").matches);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = (event) => setIsMobile(event.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isMobile;
}


export function InvestmentDossierSection() {
  const isMobile = useMobileDossier();
  const location = useLocation();

  useEffect(() => {
    const chapter = location.hash.replace("#dossier-", "");
    if (!chapter) return;
    requestAnimationFrame(() => document.getElementById(`dossier-${chapter}`)?.scrollIntoView({ block: "start" }));
  }, [isMobile, location.hash]);

  return isMobile ? <MobileInvestmentDossier /> : <InvestmentDossierDesktop />;
}
