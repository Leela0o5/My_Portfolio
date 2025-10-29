"use client";

import { useState, useEffect, useRef } from "react";
import NET from "vanta/dist/vanta.net.min";

export default function VantaBackground() {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      import("three")
        .then((THREE) => {
          setVantaEffect(
            NET({
              el: vantaRef.current,
              THREE: THREE,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              scale: 1.0,
              scaleMobile: 1.0,
              color: 0xeae865,
              backgroundColor: 0x0,
              points: 20.0,
              maxDistance: 0.0,
              spacing: 10.0,
            })
          );
        })
        .catch((e) => console.error("error", e));
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    />
  );
}
