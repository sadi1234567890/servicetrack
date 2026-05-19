const Service = require("../models/Service");

// GET all services for logged-in user
const getServices = async (req, res) => {
  try {
    const services = await Service.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching services.",
      error: error.message,
    });
  }
};

// GET single service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!service) {
      return res.status(404).json({
        message: "Service not found.",
      });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching service.",
      error: error.message,
    });
  }
};

// CREATE new service
const createService = async (req, res) => {
  try {
    const { name, category, price, renewalDate, status, description } = req.body;

    if (!name || !category || price === undefined || !renewalDate || !description) {
      return res.status(400).json({
        message: "Please provide all required service fields.",
      });
    }

    const service = await Service.create({
      user: req.user._id,
      name,
      category,
      price,
      renewalDate,
      status: status || "Active",
      description,
    });

    res.status(201).json({
      message: "Service created successfully.",
      service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while creating service.",
      error: error.message,
    });
  }
};

// UPDATE service
const updateService = async (req, res) => {
  try {
    const service = await Service.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!service) {
      return res.status(404).json({
        message: "Service not found.",
      });
    }

    const updatedService = await Service.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Service updated successfully.",
      service: updatedService,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while updating service.",
      error: error.message,
    });
  }
};

// DELETE service
const deleteService = async (req, res) => {
  try {
    const service = await Service.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!service) {
      return res.status(404).json({
        message: "Service not found.",
      });
    }

    await service.deleteOne();

    res.status(200).json({
      message: "Service deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while deleting service.",
      error: error.message,
    });
  }
};

// CHANGE Active/Paused status
const toggleServiceStatus = async (req, res) => {
  try {
    const service = await Service.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!service) {
      return res.status(404).json({
        message: "Service not found.",
      });
    }

    service.status = service.status === "Active" ? "Paused" : "Active";

    const updatedService = await service.save();

    res.status(200).json({
      message: "Service status updated successfully.",
      service: updatedService,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while changing service status.",
      error: error.message,
    });
  }
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  toggleServiceStatus,
};