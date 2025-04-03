/**
 * Author: Inreet Kaur
 * Last Modified: March 7th
 * Purpose: Provide helper functionality for helper
 */

/**
 * 
 * @param {string} field
 * @param {string | number | boolean} value
 * @returns {string} 
 */
export const validateField = (
  field: string,
  value: string | number | boolean
): string => {
  let errorMessage = "";

  switch (field) {
    case "email":
      if (typeof value === "string") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMessage = "Invalid email format";
        }
      } else {
        errorMessage = "Invalid email format";
      }
      break;

    case "phone":
      if (typeof value === "string") {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        if (!phoneRegex.test(value)) {
          errorMessage = "Invalid phone number format";
        }
      } else {
        errorMessage = "Invalid phone number format";
      }
      break;

    case "dateOfBirth":
      if (typeof value === "string") {
        const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dobRegex.test(value)) {
          errorMessage = "Invalid date format (YYYY-MM-DD)";
        }
      } else {
        errorMessage = "Invalid date format (YYYY-MM-DD)";
      }
      break;

    case "age":
    case "weight":
    case "height":
      const numericValue = Number(value);
      if (isNaN(numericValue) || numericValue <= 0) {
        errorMessage = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } must be a positive number`;
      }
      break;

    default:
      break;
  }
  return errorMessage;
};

/** 
 * @param {string} dob 
 * @returns {number} 
 */
export const calculateAge = (dob: string) => {
  const birthDate = new Date(dob);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const month = currentDate.getMonth();

  if (
    month < birthDate.getMonth() ||
    (month === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  if (age < 0) {
    return 0;
  }

  return age;
};
