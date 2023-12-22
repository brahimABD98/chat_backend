const express = require('express');
const { getRoom, addRoom, getUserRooms } = require('../Controllers/RoomController');

const router = express.Router();

router.post("/", addRoom);
router.get("/:id", getRoom);
router.get("/user/:id", getUserRooms);

module.exports = router