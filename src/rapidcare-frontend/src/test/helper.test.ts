import { validateField, calculateAge } from "../helpers/helper";

describe("validateField function", () => {
    // Email tests
    test("should return error for invalid email formats", () => {
        expect(validateField("email", "invalid-email")).toBe("Invalid email format");
        expect(validateField("email", "invalid@email")).toBe("Invalid email format");
        expect(validateField("email", "test@.com")).toBe("Invalid email format");
        expect(validateField("email", "@example.com")).toBe("Invalid email format");
        expect(validateField("email", "test@com")).toBe("Invalid email format");
    });

    test("should return an empty string for valid email", () => {
        expect(validateField("email", "test@example.com")).toBe("");
    });

    // Phone tests
    test("should return error for invalid phone number formats", () => {
        expect(validateField("phone", "abc")).toBe("Invalid phone number format");
        expect(validateField("phone", "345634-4?35634")).toBe("Invalid phone number format");
        expect(validateField("phone", "12345678901234567890")).toBe("Invalid phone number format");
    });

    test("should return an empty string for valid phone number", () => {
        expect(validateField("phone", "+1234567890")).toBe("");
        expect(validateField("phone", "1234567890")).toBe("");
    });

    // Date of Birth tests
    test("should return error for invalid date formats", () => {
        expect(validateField("dateOfBirth", "2024/01/01")).toBe("Invalid date format (YYYY-MM-DD)");
        expect(validateField("dateOfBirth", "2003-1-17")).toBe("Invalid date format (YYYY-MM-DD)");
    });

    test("should return an empty string for valid date format", () => {
        expect(validateField("dateOfBirth", "2003-01-17")).toBe("");
    });

    // Age tests
    test("should return error for negative age", () => {
        expect(validateField("age", -1)).toBe("Age must be a positive number");
        expect(validateField("age", 0)).toBe("Age must be a positive number");
    });

    test("should return an empty string for valid age", () => {
        expect(validateField("age", 25)).toBe("");
    });

    // Weight tests
    test("should return error for negative weight", () => {
        expect(validateField("weight", -1)).toBe("Weight must be a positive number");
        expect(validateField("weight", 0)).toBe("Weight must be a positive number");
    });

    test("should return an empty string for valid weight", () => {
        expect(validateField("weight", 70)).toBe("");
    });

    // Height tests
    test("should return error for negative height", () => {
        expect(validateField("height", -1)).toBe("Height must be a positive number");
        expect(validateField("height", 0)).toBe("Height must be a positive number");
    });

    test("should return an empty string for valid height", () => {
        expect(validateField("height", 175)).toBe("");
    });
});

describe("calculateAge function", () => {
    test("should correctly calculate age", () => {
        expect(calculateAge("2000-01-01")).toBeGreaterThan(20);
    });

    test("should return 0 for future dates", () => {
        expect(calculateAge("2100-01-01")).toBe(0);
    });
});
