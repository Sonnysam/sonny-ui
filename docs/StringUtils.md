# String Utils

A comprehensive collection of string utility functions for React Native development. These utilities help with common text formatting, validation, and manipulation tasks.

## Installation

```bash
npm install sonny-ui
```

## Usage

```tsx
import {
  getInitials,
  formatName,
  truncateText,
  capitalize,
  toTitleCase,
  cleanText,
  formatPhoneNumber,
  formatEmail,
  toSlug,
  maskText,
  getFileExtension,
  formatFileSize,
  isValidEmail,
  randomString,
} from "sonny-ui";
```

## Functions

### Name & Identity Functions

#### `getInitials(name, defaultChar?)`

Generates initials from a name.

```tsx
getInitials("John Doe"); // "JD"
getInitials("John"); // "J"
getInitials(""); // "?"
getInitials(null, "U"); // "U"
```

**Parameters:**

- `name: string | undefined | null` - The name to generate initials from
- `defaultChar: string` - Character to return if no valid name (default: "?")

#### `formatName(name)`

Formats a name for display by capitalizing each word.

```tsx
formatName("john doe"); // "John Doe"
formatName("JANE SMITH"); // "Jane Smith"
formatName(""); // ""
```

**Parameters:**

- `name: string | undefined | null` - The name to format

### Text Formatting Functions

#### `capitalize(text)`

Capitalizes the first letter of a string.

```tsx
capitalize("hello world"); // "Hello world"
capitalize("HELLO"); // "Hello"
```

#### `toTitleCase(text)`

Converts text to title case (capitalizes first letter of each word).

```tsx
toTitleCase("hello world"); // "Hello World"
toTitleCase("the quick brown fox"); // "The Quick Brown Fox"
```

#### `cleanText(text)`

Removes extra whitespace and trims the string.

```tsx
cleanText("  hello    world  "); // "hello world"
cleanText("multiple   spaces"); // "multiple spaces"
```

#### `truncateText(text, maxLength)`

Truncates text to a specified length and adds ellipsis if needed.

```tsx
truncateText("This is a long text", 10); // "This is a..."
truncateText("Short", 10); // "Short"
```

**Parameters:**

- `text: string | undefined | null` - The text to truncate
- `maxLength: number` - Maximum length before truncation

### Contact Information Functions

#### `formatPhoneNumber(phoneNumber)`

Formats a phone number for display (US format).

```tsx
formatPhoneNumber("1234567890"); // "(123) 456-7890"
formatPhoneNumber("11234567890"); // "+1 (123) 456-7890"
formatPhoneNumber("123-456-7890"); // "(123) 456-7890"
```

#### `formatEmail(email)`

Formats an email address (lowercase and trimmed).

```tsx
formatEmail("John.Doe@EXAMPLE.COM"); // "john.doe@example.com"
formatEmail("  test@email.com  "); // "test@email.com"
```

#### `isValidEmail(email)`

Validates if a string is a valid email format.

```tsx
isValidEmail("test@example.com"); // true
isValidEmail("invalid-email"); // false
```

### Utility Functions

#### `toSlug(text)`

Generates a URL-friendly slug from text.

```tsx
toSlug("Hello World!"); // "hello-world"
toSlug("React Native App"); // "react-native-app"
```

#### `maskText(text, visibleStart?, visibleEnd?, maskChar?)`

Masks sensitive text (like credit card numbers, SSN, etc.).

```tsx
maskText("1234567890123456"); // "1234********3456"
maskText("sensitive-data", 2, 2, "•"); // "se••••••••••ta"
```

**Parameters:**

- `text: string | undefined | null` - The text to mask
- `visibleStart: number` - Characters to show at start (default: 4)
- `visibleEnd: number` - Characters to show at end (default: 4)
- `maskChar: string` - Character to use for masking (default: "\*")

### File Functions

#### `getFileExtension(filename)`

Extracts file extension from filename.

```tsx
getFileExtension("document.pdf"); // "pdf"
getFileExtension("image.png"); // "png"
getFileExtension("noextension"); // ""
```

#### `formatFileSize(bytes, decimals?)`

Formats file size in human readable format.

```tsx
formatFileSize(1024); // "1.00 KB"
formatFileSize(1048576); // "1.00 MB"
formatFileSize(1234, 1); // "1.2 KB"
```

**Parameters:**

- `bytes: number` - Size in bytes
- `decimals: number` - Number of decimal places (default: 2)

### Random Functions

#### `randomString(length, charset?)`

Generates a random string of specified length.

```tsx
randomString(8); // "aB3dE7gH"
randomString(6, "0123456789"); // "847392"
```

**Parameters:**

- `length: number` - Length of the random string
- `charset: string` - Character set to use (default: alphanumeric)

## Common Use Cases

### User Profiles

```tsx
// Avatar with initials
const UserAvatar = ({ name }) => (
  <View style={styles.avatar}>
    <Text>{getInitials(name)}</Text>
  </View>
);

// Display formatted name
const UserName = ({ name }) => <Text>{formatName(name)}</Text>;
```

### Contact Information

```tsx
// Format contact details
const ContactCard = ({ phone, email }) => (
  <View>
    <Text>{formatPhoneNumber(phone)}</Text>
    <Text>{formatEmail(email)}</Text>
    {isValidEmail(email) && <Text>✓ Valid</Text>}
  </View>
);
```

### Text Display

```tsx
// Truncate long descriptions
const Description = ({ text }) => <Text>{truncateText(text, 100)}</Text>;

// Clean and format user input
const CleanInput = ({ userInput }) => (
  <Text>{toTitleCase(cleanText(userInput))}</Text>
);
```

### Security & Privacy

```tsx
// Mask sensitive data
const CreditCard = ({ number }) => <Text>{maskText(number, 4, 4, "•")}</Text>;

// Generate secure IDs
const generateUserId = () => randomString(12);
```

### File Management

```tsx
// Display file info
const FileInfo = ({ filename, size }) => (
  <View>
    <Text>
      {filename} ({getFileExtension(filename)})
    </Text>
    <Text>{formatFileSize(size)}</Text>
  </View>
);
```

## Example

See the [StringUtilsExample.tsx](../examples/StringUtilsExample.tsx) for a complete interactive example with all functions.
