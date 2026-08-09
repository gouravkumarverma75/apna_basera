import { mockProperties } from "./mockProperties.js";

const API = "http://localhost:5000/api";

async function tryFetch(url, options) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1800);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeout);
    if (!response.ok) throw new Error("Request failed");
    return await response.json();
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
}

export async function getProperties() {
  try {
    return await tryFetch(`${API}/properties`);
  } catch {
    // Demo fallback: lets the frontend work even when backend is not running.
    return mockProperties;
  }
}

export async function getProperty(id) {
  try {
    return await tryFetch(`${API}/properties/${id}`);
  } catch {
    const property = mockProperties.find((item) => item.id === Number(id));
    if (!property) throw new Error("Property not found");
    return property;
  }
}

export async function sendEnquiry(data) {
  try {
    return await tryFetch(`${API}/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    // Demo-only fallback: pretend the enquiry was submitted.
    return {
      success: true,
      message: "Demo enquiry submitted successfully.",
      demo: true,
      enquiry: data,
    };
  }
}
