import { Router } from 'express';
import {
  getDoorState,
  updateDoorState,
  getTargetTemperature,
  updateTargetTemperature,
  turnOffOven,
  getOvenState,
  updateOvenState,
  getTimer,
  updateTimer,
  getTargetTimer,
  updateTargetTimer
} from '@/controllers/ovenController.js';

const router: Router = Router();

/**
 * @swagger
 * /api/oven/door-state:
 *   get:
 *     summary: Get the current door state
 *     responses:
 *       200:
 *         description: The current door state
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 doorState:
 *                   type: string
 *                   enum: [open, closed]
 */
router.get('/door-state', getDoorState);

/**
 * @swagger
 * /api/oven/door-state:
 *   post:
 *     summary: Update the door state
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doorState:
 *                 type: string
 *                 enum: [open, closed]
 *     responses:
 *       200:
 *         description: The updated door state
 */
router.post('/door-state', updateDoorState);

/**
 * @swagger
 * /api/oven/temperature:
 *   get:
 *     summary: Get the target temperature
 *     responses:
 *       200:
 *         description: The current target temperature
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 targetTemperature:
 *                   type: number
 */
router.get('/temperature', getTargetTemperature);

/**
 * @swagger
 * /api/oven/temperature:
 *   post:
 *     summary: Update the target temperature
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               targetTemperature:
 *                 type: number
 *     responses:
 *       200:
 *         description: The updated target temperature
 */
router.post('/temperature', updateTargetTemperature);

/**
 * @swagger
 * /api/oven/off:
 *   post:
 *     summary: Turn off the oven
 *     responses:
 *       200:
 *         description: The oven has been turned off
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 targetTemperature:
 *                   type: number
 *                 ovenState:
 *                   type: string
 *                   enum: [off]
 */
router.post('/off', turnOffOven);

/**
 * @swagger
 * /api/oven/state:
 *   get:
 *     summary: Get the current oven state
 *     responses:
 *       200:
 *         description: The current oven state
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ovenState:
 *                   type: string
 *                   enum: [on, off]
 */
router.get('/state', getOvenState);

/**
 * @swagger
 * /api/oven/state:
 *   post:
 *     summary: Update the oven state
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ovenState:
 *                 type: string
 *                 enum: [on, off]
 *     responses:
 *       200:
 *         description: The updated oven state
 */
router.post('/state', updateOvenState);

/**
 * @swagger
 * /api/oven/timer:
 *   get:
 *     summary: Get the current timer value
 *     responses:
 *       200:
 *         description: The current timer value
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 timer:
 *                   type: number
 */
router.get('/timer', getTimer);

/**
 * @swagger
 * /api/oven/timer:
 *   post:
 *     summary: Update the timer value
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               timer:
 *                 type: number
 *     responses:
 *       200:
 *         description: The updated timer value
 */
router.post('/timer', updateTimer);

/**
 * @swagger
 * /api/oven/target-timer:
 *   get:
 *     summary: Get the current target timer value
 *     responses:
 *       200:
 *         description: The current target timer value
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 targetTimer:
 *                   type: number
 */
router.get('/target-timer', getTargetTimer);

/**
 * @swagger
 * /api/oven/target-timer:
 *   post:
 *     summary: Update the target timer value
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               targetTimer:
 *                 type: number
 *     responses:
 *       200:
 *         description: The updated target timer value
 */
router.post('/target-timer', updateTargetTimer);

export default router; 
