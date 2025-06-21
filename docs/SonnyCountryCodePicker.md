# SonnyCountryCodePicker

A country code picker component that opens a modal with searchable country list. Displays the selected country's flag and dial code in a button format. Perfect for international phone number inputs and country selection forms.

## Features

- ✅ Modal-based picker with search functionality
- ✅ Country flags and dial codes display
- ✅ Customizable button styling
- ✅ Disabled state support
- ✅ Country name display option
- ✅ Controlled and uncontrolled modes
- ✅ Responsive design
- ✅ TypeScript support
- ✅ Keyboard-friendly interactions

## Basic Usage

```tsx
import { SonnyCountryCodePicker } from "sonny-ui";

function MyComponent() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    console.log("Selected:", country);
  };

  return (
    <SonnyCountryCodePicker
      onCountrySelect={handleCountrySelect}
      selectedCountry={selectedCountry}
      placeholder="Select country code"
    />
  );
}
```

## Props

| Prop                  | Type                         | Default            | Description                                          |
| --------------------- | ---------------------------- | ------------------ | ---------------------------------------------------- |
| `onCountrySelect`     | `(country: Country) => void` | **Required**       | Callback when a country is selected                  |
| `selectedCountryCode` | `string`                     | `undefined`        | Selected country code (e.g., "US", "GB")             |
| `selectedCountry`     | `Country`                    | `undefined`        | Selected country object (preferred for full control) |
| `buttonStyle`         | `ViewStyle`                  | `undefined`        | Custom styles for the picker button                  |
| `buttonTextStyle`     | `TextStyle`                  | `undefined`        | Custom styles for the picker button text             |
| `modalStyle`          | `ViewStyle`                  | `undefined`        | Custom styles for the modal                          |
| `disabled`            | `boolean`                    | `false`            | Whether the picker is disabled                       |
| `showCountryName`     | `boolean`                    | `false`            | Whether to show the country name in the button       |
| `showFlag`            | `boolean`                    | `true`             | Whether to show the country flag in the button       |
| `placeholder`         | `string`                     | `"Select country"` | Placeholder text when no country is selected         |
| `maxCountryNameWidth` | `number`                     | `120`              | Maximum width for country name display               |

## State Management

The component supports both controlled and uncontrolled usage patterns:

### Controlled (Recommended)

```tsx
const [selectedCountry, setSelectedCountry] = useState(null);

<SonnyCountryCodePicker
  onCountrySelect={setSelectedCountry}
  selectedCountry={selectedCountry}
  showCountryName
/>;
```

### Using Country Code

```tsx
const [countryCode, setCountryCode] = useState("US");

<SonnyCountryCodePicker
  onCountrySelect={(country) => setCountryCode(country.code)}
  selectedCountryCode={countryCode}
  showCountryName
/>;
```

### Uncontrolled

```tsx
<SonnyCountryCodePicker
  onCountrySelect={(country) => console.log(country)}
  placeholder="Select country code"
/>
```

## Examples

### Basic Picker

```tsx
<SonnyCountryCodePicker
  onCountrySelect={(country) => console.log(country)}
  selectedCountryCode="US"
  placeholder="Select country code"
/>
```

### With Country Name

```tsx
<SonnyCountryCodePicker
  onCountrySelect={(country) => setSelectedCountry(country)}
  selectedCountry={selectedCountry}
  showCountryName
  showFlag
  placeholder="Select country"
  maxCountryNameWidth={100}
/>
```

### For Phone Number Input

```tsx
const [phoneNumber, setPhoneNumber] = useState("");
const [selectedCountry, setSelectedCountry] = useState(null);

return (
  <View style={styles.phoneInputContainer}>
    <SonnyCountryCodePicker
      onCountrySelect={setSelectedCountry}
      selectedCountry={selectedCountry}
      showFlag
      buttonStyle={styles.countryPicker}
    />
    <TextInput
      style={styles.phoneInput}
      value={phoneNumber}
      onChangeText={setPhoneNumber}
      placeholder="Phone number"
      keyboardType="phone-pad"
    />
  </View>
);
```

## Related Components

- [`SonnyCountriesSearch`](./SonnyCountriesSearch.md) - Search input for countries
- [`SonnyModal`](./SonnyModal.md) - Modal component used internally
