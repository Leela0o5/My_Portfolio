"use client";
import dynamic from "next/dynamic";
const VantaBackground = dynamic(() => import("./VantaBackground"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black" />,
});
export default function VantaLoader() {
  return <VantaBackground />;
}
