import React from "react";
import { motion } from "framer-motion";
import { Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";

export const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="flex flex-col items-center"
      >
        <div className="bg-primary rounded-xl p-3 mb-4">
          <Icon icon="lucide:video" className="text-white text-3xl" />
        </div>
        <h1 className="text-2xl font-bold mb-2">MeetPro Admin</h1>
        <p className="text-foreground-500 mb-6">Loading your dashboard...</p>
        <Spinner color="primary" size="lg" />
      </motion.div>
    </motion.div>
  );
};