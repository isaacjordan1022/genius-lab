import type { Metadata } from "next";
import LearningApp from "@/components/learning-app";
export const metadata: Metadata = { title: "Prize Room · Learning Club" };
export default function PrizeRoomPage() {
  return <LearningApp initialScreen="prizes" />;
}
