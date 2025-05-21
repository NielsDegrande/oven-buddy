import React from "react";
import { OvenProvider } from "@/components/OvenContext";
import OvenTwin from "@/components/OvenTwin";
import OvenControlPanel from "@/components/OvenControlPanel";
import TempChart from "@/components/TempChart";

const Index = () => {
  return (
    <OvenProvider>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#011E41]/10 via-[#011E41]/20 to-[#011E41]/30 py-14">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-[#011E41] mb-8 animate-fade-in drop-shadow">
          Oven Digital Twin
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-14 border-2 shadow-2xl rounded-3xl bg-white/70 px-9 py-12 max-w-4xl w-full animate-scale-in">
          <div>
            <OvenTwin />
            <div className="mt-6">
              <TempChart />
            </div>
          </div>
          <div>
            <OvenControlPanel />
          </div>
        </div>
      </main>
    </OvenProvider>
  );
};

export default Index;
