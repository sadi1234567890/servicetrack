const express = require("express");

const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  toggleServiceStatus,
} = require("../controllers/serviceController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getServices).post(protect, createService);

router
  .route("/:id")
  .get(protect, getServiceById)
  .put(protect, updateService)
  .delete(protect, deleteService);

router.patch("/:id/status", protect, toggleServiceStatus);

module.exports = router;