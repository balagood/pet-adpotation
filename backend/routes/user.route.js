import {Router} from "express"
import{registerUser,loginUser,refreshToken,updateUser,getUserProfile} from "../controllers/user.controller.js"
import {authMiddleware} from "../middlewares/auth.js"
import {validateObjectId} from "../middlewares/validObjectIds.js"


const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management APIs
 */
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               location:
 *                 type: string
 *               contactInfo:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */

router.post('/register',registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user and get tokens
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns access and refresh tokens
 */
router.post('/login',loginUser);

/**
 * @swagger
 * /users/refreshToken:
 *   post:
 *     summary: Refresh access token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: New access token issued
 */
router.post('/refreshToken',refreshToken);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: User profile updated
 */
router.get('/:id',authMiddleware,validateObjectId,getUserProfile);


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved
 */
router.put('/:id',authMiddleware,updateUser);



export default router;

