import asyncHandler from "../middlewares/asyncHandler.js";
import Pet from "../models/petModel.js";
import Shelter from "../models/shelterModel.js";


export const addPet = asyncHandler(async (req, res) => {
  try {
    const shelter = req.shelter; // Use the shelter directly from middleware
    console.log('Shelter in addPet:', shelter); // Add this log

    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found" });
    }

    const requiredFields = [
      "name",
      "age",
      "breed",
      "size",
      "color",
      "gender",
      "location",
      "medicalHistory",
      "description",
      "adoptionStatus",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Missing fields: ${missingFields.join(", ")}` });
    }

    const {
      name,
      age,
      breed,
      size,
      color,
      gender,
      location,
      medicalHistory,
      description,
      photos,
      videos,
      adoptionStatus,
    } = req.body;

    const pet = new Pet({
      name,
      age,
      breed,
      size,
      color,
      gender,
      location,
      medicalHistory,
      description,
      photos,
      videos,
      adoptionStatus,
      createdBy: shelter._id, // Use the shelterId directly from the authenticated shelter
    });

    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    console.error("Error adding pet: ", error.stack); // Log error stack for more details
    res.status(500).json({ message: "Failed to add pet", error: error.message });
  }
});


export const getPets = asyncHandler(async (req, res) => {
  try {
    const { search } = req.query;
    let filter = {};

    if (search) { 
      filter = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { breed: { $regex: search, $options: "i" } },
          { size: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };
    }

    const pets = await Pet.find(filter);
    res.json(pets);
  } catch (error) {
    console.error("Error in getPets: ", error.message);
    res.status(500).json({ message: "Failed to get pets", error: error.message });
  }
});


export const getPetById = asyncHandler(async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
export const deletePet = asyncHandler(async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    } 

    // Check if the authenticated shelter is the one who created the pet
    if (pet.createdBy.toString() !== req.shelter._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this pet" });
    }

    // Delete the pet
    await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: "Pet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete pet", error: error.message });
  }
});

