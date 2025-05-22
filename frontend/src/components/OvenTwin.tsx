import { useOven } from "@/hooks/useOven";
import { AnimatePresence, motion } from "framer-motion";
import { DoorClosed, DoorOpen, Thermometer } from "lucide-react";
import React from "react";

export default function OvenTwin() {
  const { temp, targetTemp, doorOpen, hasTurkey } = useOven();

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative w-64 h-80 sm:w-80 sm:h-[410px]">
        {/* Oven body */}
        <div className="absolute w-full h-full rounded-3xl bg-gradient-to-br from-[#011E41]/70 via-[#011E41]/60 to-[#011E41]/50 border-4 border-[#011E41]/60 shadow-[0_8px_32px_0_rgba(1,30,65,0.15)] z-0" />

        {/* Top control panel */}
        <div className="absolute left-[16%] top-3 w-2/3 h-8 rounded-lg bg-gradient-to-br from-white via-[#011E41]/5 to-gray-200 shadow-inner border border-gray-200 flex items-center justify-between z-10 px-4">
          {/* Left dial */}
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-white via-gray-200 to-gray-700 border-2 border-gray-100 flex items-center justify-center shadow">
            <div className="w-2 h-2 bg-[#011E41]/60 rounded-full" />
          </div>
          {/* Screen */}
          <div className="bg-black/50 rounded-md px-3 py-1 text-teal-100 font-mono text-xs border border-gray-300 tracking-widest shadow min-h-[24px] min-w-[120px] flex items-center justify-center">
            {doorOpen ? "DOOR OPEN" : Math.round(temp) + 1 < targetTemp ? `HEATING ${Math.round(temp)}°C` : `READY ${Math.round(temp)}°C`}
          </div>
          {/* Right dial */}
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-white via-gray-200 to-gray-700 border-2 border-gray-100 flex items-center justify-center shadow">
            <div className="w-2 h-2 bg-[#011E41]/60 rounded-full" />
          </div>
        </div>

        {/* Oven cavity */}
        <div className="absolute top-14 bottom-[20%] left-6 right-6 bg-gradient-to-b from-black/50 via-black/60 to-[#011E41]/60 rounded-b-xl z-10 flex items-end justify-center overflow-hidden">
          <AnimatePresence>
            {hasTurkey && doorOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.7 }}
                transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.25 }}
                className="mb-10 flex items-center justify-center"
              >
                {/* Turkey visual inside the oven */}
                <span
                  style={{
                    fontSize: 60,
                    display: "inline-block",
                    filter: "drop-shadow(0 0 10px orange)",
                  }}
                  aria-label="Turkey"
                  role="img"
                  className="select-none"
                >
                  🦃
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Oven rack for realism */}
          <div className="absolute bottom-5 left-6 right-6 h-2.5 mx-auto pointer-events-none">
            <div className="w-full h-0.5 bg-gray-400 opacity-60 rounded-full" />
            <div className="w-full h-0.5 bg-gray-300 opacity-30 rounded-full mt-1" />
          </div>
        </div>

        {/* Oven door glass, animates open */}
        <motion.div
          className="absolute top-14 bottom-0 left-0 w-full"
          initial={false}
          animate={{
            rotateX: doorOpen ? -70 : 0,
            y: doorOpen ? 0 : 0,
            boxShadow: doorOpen
              ? "16px 40px 50px 0px rgba(1,30,65,0.16)"
              : "0px 8px 24px 0px rgba(1,30,65,0.13)",
            zIndex: 30,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 170, 
            damping: 16,
            rotateX: { duration: 0.5 }
          }}
          style={{
            perspective: 1200,
            transformStyle: "preserve-3d",
            transformOrigin: "bottom center",
          }}
        >
          <div className="relative w-full h-full">
            {/* Door glassy panel */}
            <div className="absolute w-full h-full rounded-b-[24px] bg-gradient-to-tr from-[#011E41]/60 via-black/55 to-[#011E41]/50 border-x-[6px] border-b-[10px] border-[#011E41]/60 flex flex-col items-center justify-end overflow-hidden" />
          </div>
        </motion.div>

        {/* Outer frame shadow */}
        <div className="absolute -bottom-5 left-8 right-8 h-5 bg-black/20 rounded-b-2xl blur pointer-events-none" />
      </div>

      {/* Live temperature and status */}
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center text-3xl font-black text-[#011E41] drop-shadow-sm">
          <Thermometer className="mr-1" size={32} />
          {Math.round(temp)}°C
        </div>
        {Math.abs(temp - targetTemp) > 2 && (
          <span className="text-sm text-[#011E41]/70 animate-pulse font-semibold">
            Target: {Math.round(targetTemp)}°C
          </span>
        )}
      </div>
    </div>
  );
}
