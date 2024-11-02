"use client";

import { fetchSentiment } from "@/app/[topic]/actions";
import { Sentiment } from "@/lib/interfaces";
import { Tables } from "@/lib/supabase/database.types";
import { generateUsername } from "@/lib/utils";
import clsx from "clsx";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useActionState } from "react";

type TweetCardProps = {
  data: Tables<"tweets">;
};

const sentimentColorMap: Record<Sentiment | "neutral", string> = {
  positive: "#4d7c0f",
  neutral: "#a16207",
  negative: "#b91c1c",
};

// Initial state for action state hook
const initialState: { sentiment: Sentiment | null } = { sentiment: null };

export const TweetCard: React.FC<TweetCardProps> = ({ data }) => {
  const [isToggled, setIsToggled] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Using action state hook for fetching sentiment
  const [state, formAction] = useActionState(fetchSentiment, initialState);

  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { mass: prefersReducedMotion ? 0.5 : 1 });
  const mouseYSpring = useSpring(y, { mass: prefersReducedMotion ? 0.5 : 1 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isToggled) {
      const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - left) / width - 0.5);
      y.set((e.clientY - top) / height - 0.5);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  // Trigger sentiment fetch when toggling to "on" state
  useEffect(() => {
    if (isToggled) {
      formRef.current?.requestSubmit();
    }
  }, [isToggled]);

  const isAnalyzing = state.sentiment === null && isToggled;
  const analysisComplete = state.sentiment !== null && isToggled;

  const username = generateUsername()

  return (
    <motion.div
      onClick={handleToggle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        backgroundColor: isAnalyzing
          ? ["#4d7c0f", "#a16207", "#b91c1c"]
          : analysisComplete
            ? sentimentColorMap[state.sentiment || "neutral"]
            : "#ffffff",
      }}
      transition={{
        duration: 1,
        repeat: isAnalyzing ? Infinity : 0,
        repeatType: "reverse",
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={clsx(
        "cursor-pointer p-4 rounded-xl border max-w-md transition-all",
        isToggled ? "bg-gray-900 text-white border-gray-700" : "bg-white text-black border-gray-200",
        analysisComplete && "dark" // Adds dark mode styling conditionally
      )}
    >
      <form ref={formRef} action={formAction}>
        <input type="text" defaultValue={data.text} name="text" id="text" hidden />
      </form>

      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="ml-1.5 text-sm leading-tight">
            <span className="font-bold block text-black dark:text-white">{username}</span>
            <span className="font-normal block text-gray-500 dark:text-gray-200">@{username}</span>
          </div>
        </div>
        <svg
          className="text-blue-400 dark:text-white h-6 w-auto inline-block fill-current"
          viewBox="0 0 24 24"
        >
          <g>
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
          </g>
        </svg>
      </div>

      <p className={clsx("leading-snug mt-3 transition-all", isToggled ? "text-3xl" : "text-xl")}>
        {data.text}
      </p>
      <p className="text-gray-500 dark:text-gray-200 text-base py-1 my-0.5">{data.location}</p>
    </motion.div>
  );
};
