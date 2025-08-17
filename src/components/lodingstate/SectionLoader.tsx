"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function SectionLoader() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-center items-center w-full h-[200px]"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <Loader2 className="w-8 h-8 text-gray-500" />
      </motion.div>
    </motion.div>
  );
}
