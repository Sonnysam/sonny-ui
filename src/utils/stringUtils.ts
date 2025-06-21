/**
 * String utility functions for React Native development
 * Common formatters and text manipulation functions
 */

/**
 * Generates initials from a name
 * For single names: returns the first letter
 * For multiple names: returns the first letter of the first and second names
 * Falls back to a default character if no valid name is provided
 *
 * @param name - The name to generate initials from
 * @param defaultChar - Character to return if no valid name (default: "?")
 * @returns The generated initials
 *
 * @example
 * ```tsx
 * getInitials("John Doe") // "JD"
 * getInitials("John") // "J"
 * getInitials("") // "?"
 * getInitials(null, "U") // "U"
 * ```
 */
export const getInitials = (
  name: string | undefined | null,
  defaultChar: string = "?"
): string => {
  if (!name) return defaultChar;

  // Split the name into parts and filter out empty parts
  const nameParts = name.split(" ").filter((part) => part.length > 0);

  // If no valid parts, return default
  if (nameParts.length === 0) return defaultChar;

  // If single name, return first letter
  if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();

  // If multiple names, return first letter of first and second name
  return (
    nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
  ).toUpperCase();
};

/**
 * Formats a name for display
 * Capitalizes the first letter of each word
 *
 * @param name - The name to format
 * @returns The formatted name
 *
 * @example
 * ```tsx
 * formatName("john doe") // "John Doe"
 * formatName("JANE SMITH") // "Jane Smith"
 * formatName("") // ""
 * ```
 */
export const formatName = (name: string | undefined | null): string => {
  if (!name) return "";

  return name
    .split(" ")
    .filter((part) => part.length > 0)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
};

/**
 * Truncates text to a specified length and adds ellipsis if needed
 *
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns The truncated text with ellipsis if needed
 *
 * @example
 * ```tsx
 * truncateText("This is a long text", 10) // "This is a..."
 * truncateText("Short", 10) // "Short"
 * ```
 */
export const truncateText = (
  text: string | undefined | null,
  maxLength: number
): string => {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength) + "...";
};

/**
 * Capitalizes the first letter of a string
 *
 * @param text - The text to capitalize
 * @returns The text with first letter capitalized
 *
 * @example
 * ```tsx
 * capitalize("hello world") // "Hello world"
 * capitalize("HELLO") // "Hello"
 * ```
 */
export const capitalize = (text: string | undefined | null): string => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Converts text to title case (capitalizes first letter of each word)
 *
 * @param text - The text to convert
 * @returns The text in title case
 *
 * @example
 * ```tsx
 * toTitleCase("hello world") // "Hello World"
 * toTitleCase("the quick brown fox") // "The Quick Brown Fox"
 * ```
 */
export const toTitleCase = (text: string | undefined | null): string => {
  if (!text) return "";

  return text
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

/**
 * Removes extra whitespace and trims the string
 *
 * @param text - The text to clean
 * @returns The cleaned text
 *
 * @example
 * ```tsx
 * cleanText("  hello    world  ") // "hello world"
 * cleanText("multiple   spaces") // "multiple spaces"
 * ```
 */
export const cleanText = (text: string | undefined | null): string => {
  if (!text) return "";
  return text.replace(/\s+/g, " ").trim();
};

/**
 * Formats a phone number for display
 * Supports US phone number format
 *
 * @param phoneNumber - The phone number to format
 * @returns The formatted phone number
 *
 * @example
 * ```tsx
 * formatPhoneNumber("1234567890") // "(123) 456-7890"
 * formatPhoneNumber("123-456-7890") // "(123) 456-7890"
 * formatPhoneNumber("invalid") // "invalid"
 * ```
 */
export const formatPhoneNumber = (
  phoneNumber: string | undefined | null
): string => {
  if (!phoneNumber) return "";

  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, "");

  // Check if it's a valid US phone number length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6
    )}`;
  } else if (cleaned.length === 11 && cleaned.startsWith("1")) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(
      7
    )}`;
  }

  // Return original if not a standard format
  return phoneNumber;
};

/**
 * Formats an email address (basic validation and lowercase)
 *
 * @param email - The email to format
 * @returns The formatted email
 *
 * @example
 * ```tsx
 * formatEmail("John.Doe@EXAMPLE.COM") // "john.doe@example.com"
 * formatEmail("  test@email.com  ") // "test@email.com"
 * ```
 */
export const formatEmail = (email: string | undefined | null): string => {
  if (!email) return "";
  return email.trim().toLowerCase();
};

/**
 * Generates a slug from text (URL-friendly string)
 *
 * @param text - The text to convert to slug
 * @returns The slug string
 *
 * @example
 * ```tsx
 * toSlug("Hello World!") // "hello-world"
 * toSlug("React Native App") // "react-native-app"
 * ```
 */
export const toSlug = (text: string | undefined | null): string => {
  if (!text) return "";

  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
};

/**
 * Masks sensitive text (like credit card numbers, SSN, etc.)
 *
 * @param text - The text to mask
 * @param visibleStart - Number of characters to show at start (default: 4)
 * @param visibleEnd - Number of characters to show at end (default: 4)
 * @param maskChar - Character to use for masking (default: "*")
 * @returns The masked text
 *
 * @example
 * ```tsx
 * maskText("1234567890123456") // "1234********3456"
 * maskText("sensitive-data", 2, 2, "•") // "se••••••••••ta"
 * ```
 */
export const maskText = (
  text: string | undefined | null,
  visibleStart: number = 4,
  visibleEnd: number = 4,
  maskChar: string = "*"
): string => {
  if (!text) return "";

  if (text.length <= visibleStart + visibleEnd) {
    return text;
  }

  const start = text.slice(0, visibleStart);
  const end = text.slice(-visibleEnd);
  const maskLength = text.length - visibleStart - visibleEnd;
  const mask = maskChar.repeat(maskLength);

  return start + mask + end;
};

/**
 * Extracts file extension from filename
 *
 * @param filename - The filename to extract extension from
 * @returns The file extension (without dot)
 *
 * @example
 * ```tsx
 * getFileExtension("document.pdf") // "pdf"
 * getFileExtension("image.png") // "png"
 * getFileExtension("noextension") // ""
 * ```
 */
export const getFileExtension = (
  filename: string | undefined | null
): string => {
  if (!filename) return "";

  const lastDot = filename.lastIndexOf(".");
  if (lastDot === -1 || lastDot === filename.length - 1) return "";

  return filename.slice(lastDot + 1).toLowerCase();
};

/**
 * Formats file size in human readable format
 *
 * @param bytes - Size in bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted file size string
 *
 * @example
 * ```tsx
 * formatFileSize(1024) // "1.00 KB"
 * formatFileSize(1048576) // "1.00 MB"
 * formatFileSize(1234, 1) // "1.2 KB"
 * ```
 */
export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

/**
 * Validates if a string is a valid email format
 *
 * @param email - The email to validate
 * @returns True if valid email format
 *
 * @example
 * ```tsx
 * isValidEmail("test@example.com") // true
 * isValidEmail("invalid-email") // false
 * ```
 */
export const isValidEmail = (email: string | undefined | null): boolean => {
  if (!email) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generates a random string of specified length
 *
 * @param length - Length of the random string
 * @param charset - Character set to use (default: alphanumeric)
 * @returns Random string
 *
 * @example
 * ```tsx
 * randomString(8) // "aB3dE7gH"
 * randomString(6, "0123456789") // "847392"
 * ```
 */
export const randomString = (
  length: number,
  charset: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
): string => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
};
