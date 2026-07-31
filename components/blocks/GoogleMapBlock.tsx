"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import { resolveImageUrl } from "@/sanity/lib/image";
import type { GoogleMapBlock as GoogleMapBlockType } from "@/types/content";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M5 15 15 5M8 5h7v7" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export default function GoogleMapBlock({ block }: { block: GoogleMapBlockType }) {
  const [isActive, setIsActive] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const imageUrl =
    resolveImageUrl(block.previewImage, { width: 1800, height: 1050, quality: 90 }) ||
    "/images/lpbc-map-preview.png";
  const query = block.googleMapsQuery?.trim() || block.address;
  const zoom = Math.min(20, Math.max(12, block.zoom ?? 16));
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;

  useEffect(() => {
    if (isActive) iframeRef.current?.focus();
  }, [isActive]);

  return (
    <section className="privacy-map-block section-space page-gutter">
      <Reveal className="privacy-map-block__heading">
        <div>
          {block.eyebrow ? <p className="eyebrow">{block.eyebrow}</p> : null}
          <h2>{block.headline}</h2>
        </div>
        <div className="privacy-map-block__address">
          <p>{block.address}</p>
          <a href={directionsUrl} target="_blank" rel="noreferrer">
            <span>{block.directionsLabel || "Open directions in Google Maps"}</span>
            <ArrowIcon />
          </a>
        </div>
      </Reveal>

      <Reveal className="privacy-map-block__frame" delay={0.08}>
        {isActive ? (
          <iframe
            ref={iframeRef}
            className="privacy-map-block__iframe"
            src={embedUrl}
            title={`${block.headline} — Google Maps`}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer"
            tabIndex={0}
          />
        ) : (
          <>
            <Image
              className="privacy-map-block__preview"
              src={imageUrl}
              alt={block.imageAlt}
              fill
              sizes="(max-width: 1600px) 100vw, 1540px"
            />
            <div className="privacy-map-block__consent">
              <button type="button" onClick={() => setIsActive(true)}>
                <MapPinIcon />
                <span>{block.activationLabel || "Click to activate map"}</span>
              </button>
              <p>
                {block.privacyNotice ||
                  "Google Maps is loaded only after you activate it. Google may then process your data."}
              </p>
            </div>
          </>
        )}
      </Reveal>

      {!isActive ? (
        <p className="privacy-map-block__attribution">
          Map preview ©{" "}
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">
            OpenStreetMap contributors
          </a>{" "}
          ©{" "}
          <a href="https://carto.com/attributions" target="_blank" rel="noreferrer">
            CARTO
          </a>
        </p>
      ) : null}
    </section>
  );
}
