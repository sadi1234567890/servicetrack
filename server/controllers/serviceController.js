const Service = require("../models/Service");

// GET all services for logged-in user
const getServices = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await Service.updateMany(
      {
        user: req.user._id,
        renewalDate: { $lt: today },
        status: { $ne: "Inactive" },
      },
      {
        $set: { status: "Inactive" },
      }
    );

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

    if (
      !name ||
      !category ||
      price === undefined ||
      !renewalDate ||
      !description
    ) {
      return res.status(400).json({
        message: "Please provide all required service fields.",
      });
    }

    const existingService = await Service.findOne({
      user: req.user._id,
      name: name.trim(),
    });

    if (existingService) {
      return res.status(400).json({
        message: "This service already exists in your account.",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const renewal = new Date(renewalDate);
    renewal.setHours(0, 0, 0, 0);

    const finalStatus = renewal < today ? "Inactive" : status || "Active";

    const service = await Service.create({
      user: req.user._id,
      name: name.trim(),
      category,
      price,
      renewalDate,
      status: finalStatus,
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

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const renewal = new Date(req.body.renewalDate || service.renewalDate);
    renewal.setHours(0, 0, 0, 0);

    let finalStatus = req.body.status || service.status;

    if (renewal < today) {
      finalStatus = "Inactive";
    }

    if (renewal >= today && service.status === "Inactive") {
      finalStatus = "Active";
    }

    const updatedService = await Service.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      {
        ...req.body,
        status: finalStatus,
      },
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

// TOGGLE Active/Paused status
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

    if (service.status === "Inactive") {
      return res.status(400).json({
        message:
          "Inactive services cannot be toggled. Please update the renewal date first.",
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