import { Router } from "express";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();
const PROPERTIES_FILE = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../data/properties.json"
);

const loadProperties = async () => {
  const raw = await readFile(PROPERTIES_FILE, "utf8");
  return JSON.parse(raw);
};

const VALID_ROOM_TYPES = ["Single", "Double", "Triple", "Shared"];

router.get("/", async (req, res, next) => {
  try {
    let properties = await loadProperties();
    const {
      location,
      maxRent,
      verified,
      roomType,
      minTrustScore,
      amenities,
    } = req.query;

    if (location) {
      const term = String(location).toLowerCase();
      properties = properties.filter((property) =>
        `${property.location} ${property.city}`
          .toLowerCase()
          .includes(term)
      );
    }

    if (maxRent) {
      const budget = Number(maxRent);
      if (!Number.isNaN(budget)) {
        properties = properties.filter((property) => property.rent <= budget);
      }
    }

    if (verified === "true") {
      properties = properties.filter((property) => property.verified);
    }

    if (roomType && VALID_ROOM_TYPES.includes(roomType)) {
      properties = properties.filter((property) =>
        property.roomType.includes(roomType)
      );
    }

    if (minTrustScore) {
      const minimum = Number(minTrustScore);
      if (!Number.isNaN(minimum)) {
        properties = properties.filter(
          (property) => property.trustScore >= minimum
        );
      }
    }

    if (amenities) {
      const wanted = String(amenities)
        .split(",")
        .map((amenity) => amenity.trim())
        .filter(Boolean);
      if (wanted.length) {
        properties = properties.filter((property) =>
          wanted.every((amenity) => property.amenities.includes(amenity))
        );
      }
    }

    properties.sort((a, b) => b.trustScore - a.trustScore);

    res.json(properties);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const properties = await loadProperties();
    const property = properties.find(
      (item) => item.id === Number(req.params.id)
    );
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    next(error);
  }
});

export default router;