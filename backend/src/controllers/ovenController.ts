import { Request, Response } from 'express';
import { OvenStatus, UpdateDoorStateRequest, UpdateOvenStateRequest, UpdateTemperatureRequest } from '@/types/index.js';
import { broadcastOvenUpdate } from '@/websocket.js';

// In-memory state (in a real application, this would be persisted).
let ovenStatus: OvenStatus = {
  doorState: 'closed',
  ovenState: 'off',
  targetTemperature: 25,
  timer: 0,
  targetTimer: 0
};

export const getDoorState = (_req: Request, res: Response) => {
  res.json({ doorState: ovenStatus.doorState });
};

export const updateDoorState = (req: Request<{}, {}, UpdateDoorStateRequest>, res: Response) => {
  const { doorState } = req.body;
  ovenStatus.doorState = doorState;
  broadcastOvenUpdate({ doorState });
  res.json({ doorState: ovenStatus.doorState });
};

export const getTargetTemperature = (_req: Request, res: Response) => {
  res.json({ targetTemperature: ovenStatus.targetTemperature });
};

export const updateTargetTemperature = (req: Request<{}, {}, UpdateTemperatureRequest>, res: Response) => {
  const { targetTemperature } = req.body;
  ovenStatus.targetTemperature = targetTemperature;
  ovenStatus.ovenState = 'on';
  broadcastOvenUpdate({ targetTemperature, ovenState: 'on' });
  res.json({ targetTemperature: ovenStatus.targetTemperature, ovenState: 'on' });
};

export const turnOffOven = (_req: Request, res: Response) => {
  ovenStatus.targetTemperature = 25;
  ovenStatus.ovenState = 'off';
  broadcastOvenUpdate({ targetTemperature: 25, ovenState: 'off' });
  res.json({ targetTemperature: 25, ovenState: 'off' });
};

export const getOvenState = (_req: Request, res: Response) => {
  res.json({ ovenState: ovenStatus.ovenState });
};

export const updateOvenState = (req: Request<{}, {}, UpdateOvenStateRequest>, res: Response) => {
  const { ovenState } = req.body;
  ovenStatus.ovenState = ovenState;
  if (ovenState === 'off') {
    ovenStatus.targetTemperature = 25;
  }
  broadcastOvenUpdate({ ...ovenStatus });
  res.json({ ovenState: ovenStatus.ovenState });
};

export const getTimer = (_req: Request, res: Response) => {
  res.json({ timer: ovenStatus.timer });
};

export const updateTimer = (req: Request<{}, {}, { timer: number }>, res: Response) => {
  const { timer } = req.body;
  ovenStatus.timer = timer;
  broadcastOvenUpdate({ timer });
  res.json({ timer: ovenStatus.timer });
};

export const getTargetTimer = (_req: Request, res: Response) => {
  res.json({ targetTimer: ovenStatus.targetTimer });
};

export const updateTargetTimer = (req: Request<{}, {}, { targetTimer: number }>, res: Response) => {
  const { targetTimer } = req.body;
  ovenStatus.targetTimer = targetTimer;
  ovenStatus.timer = targetTimer;
  broadcastOvenUpdate({ targetTimer: targetTimer, timer: targetTimer });
  res.json({ targetTimer: targetTimer, timer: targetTimer });
}; 
