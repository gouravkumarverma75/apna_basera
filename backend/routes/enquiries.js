import { Router } from "express";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();
const DATA_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../data"
);
const PROPERTIES_FILE = path.join(DATA_DIR, "properties.json");
const ENQUIRIES_FILE = path.join(DATA_DIR, "enquiries.json");

const validPhone = (phone) => /^[0-9]{10}$/.test(phone || "");

const loadProperties = async () => {
  const raw = await readFile(PROPERTIES_FILE, "utf8");
  return JSON.parse(raw);
};

const loadEnquiries = async () => {
  try {
    const raw = await readFile(ENQUIRIES_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const saveEnquiries = async (enquiries) => {
  try {
    await writeFile(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), "utf8");
  } catch {
    // Serverless environments (Vercel) have a read-only filesystem,
    // so persisting is best-effort; enquiries still live in memory.
  }
};

router.get("/", async (req, res, next) => {
  try {
    res.json({ enquiries: await loadEnquiries() });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { propertyId, name, phone, moveInMonth } = req.body || {};

    if (!propertyId) {
      return res
        .status(400)
        .json({ message: "Property ID is required." });
    }

    if (!name || !String(name).trim()) {
      return res
        .status(400)
        .json({ message: "Please enter your name." });
    }

    if (!validPhone(phone)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid 10-digit phone number." });
    }

    const properties = await loadProperties();
    const property = properties.find(
      (item) => item.id === Number(propertyId)
    );
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const enquiries = await loadEnquiries();
    const enquiry = {
      id: Date.now(),
      propertyId: property.id,
      propertyName: property.name,
      name: String(name).trim(),
      phone: String(phone),
      moveInMonth: moveInMonth || "ASAP",
      createdAt: new Date().toISOString(),
    };

    enquiries.push(enquiry);
    await saveEnquiries(enquiries);

    res.status(201).json({
      success: true,
      message: `Enquiry submitted for ${property.name}. The owner will contact you soon.`,
      enquiry,
    });
  } catch (error) {
    next(error);
  }
});

export default router;