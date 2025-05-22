import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_OVEN_API_URL ?? "http://localhost:3000/api/oven";

export interface OvenStatus {
  doorState: "open" | "closed";
  ovenState: "on" | "off";
  targetTemperature: number;
  timer: number;
  targetTimer: number;
}

export const ovenApi = {
  async getDoorState() {
    const res = await axios.get<{ doorState: "open" | "closed" }>(`${API_BASE_URL}/door-state`);
    return res.data;
  },

  async updateDoorState(doorState: "open" | "closed") {
    const res = await axios.post<{ doorState: "open" | "closed" }>(`${API_BASE_URL}/door-state`, { doorState });
    return res.data;
  },

  async getTargetTemperature() {
    const res = await axios.get<{ targetTemperature: number }>(`${API_BASE_URL}/temperature`);
    return res.data;
  },

  async updateTargetTemperature(targetTemperature: number) {
    const res = await axios.post<{ targetTemperature: number }>(`${API_BASE_URL}/temperature`, { targetTemperature });
    return res.data;
  },

  async getOvenState() {
    const res = await axios.get<{ ovenState: "on" | "off" }>(`${API_BASE_URL}/state`);
    return res.data;
  },

  async updateOvenState(ovenState: "on" | "off") {
    const res = await axios.post<{ ovenState: "on" | "off" }>(`${API_BASE_URL}/state`, { ovenState });
    return res.data;
  },

  async turnOffOven() {
    const res = await axios.post<OvenStatus>(`${API_BASE_URL}/off`);
    return res.data;
  },

  async getTimer() {
    const res = await axios.get<{ timer: number }>(`${API_BASE_URL}/timer`);
    return res.data;
  },

  async updateTimer(timer: number) {
    const res = await axios.post<{ timer: number }>(`${API_BASE_URL}/timer`, { timer });
    return res.data;
  },

  async getTargetTimer() {
    const res = await axios.get<{ targetTimer: number }>(`${API_BASE_URL}/target-timer`);
    return res.data;
  },

  async updateTargetTimer(targetTimer: number) {
    const res = await axios.post<{ targetTimer: number }>(`${API_BASE_URL}/target-timer`, { targetTimer });
    return res.data;
  },
}; 
