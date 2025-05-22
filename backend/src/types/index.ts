export type DoorState = 'open' | 'closed';
export type OvenState = 'on' | 'off';

export interface OvenStatus {
  doorState: DoorState;
  ovenState: OvenState;
  targetTemperature: number;
  timer: number;
  targetTimer: number;
}

export interface UpdateDoorStateRequest {
  doorState: DoorState;
}

export interface UpdateOvenStateRequest {
  ovenState: OvenState;
}

export interface UpdateTemperatureRequest {
  targetTemperature: number;
}

export interface UpdateTimerRequest {
  timer: number;
}

export interface UpdateTargetTimerRequest {
  targetTimer: number;
} 
