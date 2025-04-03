/**
 * Author: Inreet Kaur
 * Last Modified: March 7th
 * Purpose: Test the helper functions
 */
import { validateField, calculateAge } from "../helpers/helper";

// Test the validate field functionality
describe("validateField function", () => {
  test("should return appropriate error for invalid field input", () => {
    expect(validateField("email", "invalid-email")).toBe(
      "Invalid email format"
    );
    expect(validateField("email", "invalid@email")).toBe(
      "Invalid email format"
    );
    expect(validateField("email", "test@.com")).toBe("Invalid email format");
    expect(validateField("email", "@example.com")).toBe("Invalid email format");
    expect(validateField("email", "test@com")).toBe("Invalid email format");
    expect(validateField("email", 123)).toBe("Invalid email format");

    expect(validateField("phone", "abc")).toBe("Invalid phone number format");
    expect(validateField("phone", "345634-4?35634")).toBe(
      "Invalid phone number format"
    );
    expect(validateField("phone", "12345678901234567890")).toBe(
      "Invalid phone number format"
    );
    expect(validateField("phone", 123456)).toBe("Invalid phone number format");

    expect(validateField("dateOfBirth", "2024/01/01")).toBe(
      "Invalid date format (YYYY-MM-DD)"
    );
    expect(validateField("dateOfBirth", "2003-1-17")).toBe(
      "Invalid date format (YYYY-MM-DD)"
    );
    expect(validateField("dateOfBirth", 2003117)).toBe(
      "Invalid date format (YYYY-MM-DD)"
    );

    expect(validateField("age", -1)).toBe("Age must be a positive number");
    expect(validateField("age", 0)).toBe("Age must be a positive number");

    expect(validateField("weight", -1)).toBe(
      "Weight must be a positive number"
    );
    expect(validateField("weight", 0)).toBe("Weight must be a positive number");

    expect(validateField("height", -1)).toBe(
      "Height must be a positive number"
    );
    expect(validateField("height", 0)).toBe("Height must be a positive number");
  });

  test("should return an empty string for valid field input", () => {
    expect(validateField("email", "test@example.com")).toBe("");
    expect(validateField("phone", "+1234567890")).toBe("");
    expect(validateField("phone", "1234567890")).toBe("");
    expect(validateField("dateOfBirth", "2003-01-17")).toBe("");
    expect(validateField("age", 25)).toBe("");
    expect(validateField("weight", 70)).toBe("");
    expect(validateField("height", 175)).toBe("");
    expect(validateField("InvalidField", "invalid")).toBe("");
  });
});

// Test the calculate age function
describe("calculateAge function", () => {
  test("should correctly calculate age", () => {
    expect(calculateAge("2000-01-01")).toBeGreaterThan(20);
  });

  test("should return 0 for future dates", () => {
    expect(calculateAge("2100-01-01")).toBe(0);
  });

  test("should return 0 for today's date", () => {
    const today = new Date().toISOString().split("T")[0];
    expect(calculateAge(today)).toBe(0);
  });
});
