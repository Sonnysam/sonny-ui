# SonnyCountriesSearch

A customizable search input component for countries with real-time filtering. Provides a text input with dropdown results showing matching countries based on name, country code, or dial code.

## Features

- ✅ Real-time search filtering
- ✅ Dropdown results with smooth animations
- ✅ Country flags, codes, and dial codes display
- ✅ Customizable styling for all elements
- ✅ Maximum results limiting
- ✅ Custom render functions for items
- ✅ Search history tracking
- ✅ Keyboard-friendly interactions
- ✅ TypeScript support

## Basic Usage

```tsx
import { SonnyCountriesSearch } from "sonny-ui";

function MyComponent() {
  const handleCountrySelect = (country) => {
    console.log("Selected:", country);
  };

  return (
    <SonnyCountriesSearch
      onCountrySelect={handleCountrySelect}
      placeholder="Search countries..."
      showFlags
      maxResults={10}
    />
  );
}
```

## Props

| Prop                | Type                                                       | Default                 | Description                                |
| ------------------- | ---------------------------------------------------------- | ----------------------- | ------------------------------------------ |
| `onCountrySelect`   | `(country: Country) => void`                               | **Required**            | Callback when a country is selected        |
| `placeholder`       | `string`                                                   | `"Search countries..."` | Placeholder text for the search input      |
| `initialValue`      | `string`                                                   | `""`                    | Initial search value (uncontrolled mode)   |
| `value`             | `string`                                                   | `undefined`             | Current search value (controlled mode)     |
| `maxResults`        | `number`                                                   | `10`                    | Maximum number of results to show          |
| `containerStyle`    | `ViewStyle`                                                | `undefined`             | Custom styles for the container            |
| `inputStyle`        | `TextStyle`                                                | `undefined`             | Custom styles for the search input         |
| `listStyle`         | `ViewStyle`                                                | `undefined`             | Custom styles for the results list         |
| `itemStyle`         | `ViewStyle`                                                | `undefined`             | Custom styles for each result item         |
| `showFlags`         | `boolean`                                                  | `true`                  | Whether to show country flags              |
| `showCodes`         | `boolean`                                                  | `false`                 | Whether to show country codes (e.g., "US") |
| `showDialCodes`     | `boolean`                                                  | `false`                 | Whether to show dial codes (e.g., "+1")    |
| `clearOnSelect`     | `boolean`                                                  | `false`                 | Whether to clear search after selection    |
| `renderCountryItem` | `(country: Country, onSelect: () => void) => ReactElement` | `undefined`             | Custom render function for country items   |
| `disabled`          | `boolean`                                                  | `false`                 | Whether the search input is disabled       |
| `onSearchChange`    | `(text: string) => void`                                   | `undefined`             | Callback when search text changes          |

## Country Object

The `Country` object has the following structure:

```tsx
interface Country {
  name: string; // "United States"
  code: string; // "US"
  dialCode: string; // "+1"
  flag: string; // "🇺🇸"
}
```

## Examples

### Basic Search

```tsx
<SonnyCountriesSearch
  onCountrySelect={(country) => console.log(country)}
  placeholder="Search countries..."
  showFlags
  maxResults={8}
/>
```

### With Country Codes and Dial Codes

```tsx
<SonnyCountriesSearch
  onCountrySelect={(country) => setSelectedCountry(country)}
  placeholder="Search by name, code, or dial code..."
  showFlags
  showCodes
  showDialCodes
  maxResults={6}
  clearOnSelect
/>
```

### Custom Styling

```tsx
<SonnyCountriesSearch
  onCountrySelect={(country) => handleSelect(country)}
  placeholder="Custom styled search..."
  showFlags={false}
  showCodes
  inputStyle={{
    borderColor: "#007AFF",
    borderWidth: 2,
    backgroundColor: "#f8f9ff",
  }}
  listStyle={{
    borderColor: "#007AFF",
  }}
  itemStyle={{
    backgroundColor: "#f8f9ff",
  }}
/>
```

### Custom Item Renderer

```tsx
<SonnyCountriesSearch
  onCountrySelect={(country) => handleSelect(country)}
  renderCountryItem={(country, onSelect) => (
    <TouchableOpacity onPress={onSelect} style={customItemStyle}>
      <Text>
        {country.flag} {country.name}
      </Text>
      <Text style={codeStyle}>{country.dialCode}</Text>
    </TouchableOpacity>
  )}
/>
```

### With Search Change Handler

```tsx
const [searchText, setSearchText] = useState("");

<SonnyCountriesSearch
  onCountrySelect={(country) => handleSelect(country)}
  onSearchChange={(text) => {
    setSearchText(text);
    // Track search analytics, etc.
  }}
  placeholder="Search countries..."
/>;
```

## Search Functionality

The search component filters countries based on:

1. **Country name** (case-insensitive): "united states", "canada"
2. **Country code** (case-insensitive): "us", "ca"
3. **Dial code**: "+1", "+44"

### Search Examples

- Typing "uni" → Shows "United States", "United Kingdom", "United Arab Emirates"
- Typing "+44" → Shows "United Kingdom"
- Typing "gb" → Shows "United Kingdom"

## Styling Guide

### Container Styling

```tsx
containerStyle={{
  zIndex: 2000,      // Adjust z-index if needed
  marginBottom: 20,  // Add spacing
}}
```

### Input Styling

```tsx
inputStyle={{
  borderColor: '#007AFF',
  borderWidth: 2,
  borderRadius: 12,
  fontSize: 18,
  paddingHorizontal: 20,
  backgroundColor: '#f8f9ff',
}}
```

### Results List Styling

```tsx
listStyle={{
  maxHeight: 300,           // Adjust dropdown height
  borderColor: '#007AFF',
  borderRadius: 12,
  backgroundColor: 'white',
}}
```

### Item Styling

```tsx
itemStyle={{
  paddingVertical: 16,
  paddingHorizontal: 20,
  backgroundColor: '#f8f9ff',
  borderBottomColor: '#e0e0e0',
}}
```

## Common Use Cases

### 1. Address Forms

```tsx
<SonnyCountriesSearch
  onCountrySelect={(country) => setShippingCountry(country)}
  placeholder="Select shipping country..."
  showFlags
  showCodes
  maxResults={8}
/>
```

### 2. User Registration

```tsx
<SonnyCountriesSearch
  onCountrySelect={(country) => setUserCountry(country)}
  placeholder="Where are you from?"
  showFlags
  clearOnSelect={false}
  maxResults={12}
/>
```

### 3. Travel Apps

```tsx
<SonnyCountriesSearch
  onCountrySelect={(country) => setDestination(country)}
  placeholder="Search destination..."
  showFlags
  showDialCodes
  maxResults={15}
/>
```

## Performance Tips

1. **Limit Results**: Use `maxResults` to limit the number of displayed results for better performance
2. **Custom Rendering**: Use `renderCountryItem` for complex item layouts
3. **Search Debouncing**: Implement debouncing in `onSearchChange` for expensive operations

## Accessibility

The component includes:

- Proper keyboard navigation
- Screen reader support
- Focus management
- Touch-friendly tap targets

## Related Components

- [`SonnyCountryCodePicker`](./SonnyCountryCodePicker.md) - Modal-based country code picker
- [`Text`](./Text.md) - Text component used internally

## Notes

- The dropdown appears above other content using z-index
- Search is case-insensitive and supports partial matches
- Results are automatically sorted by relevance
- The component handles keyboard dismissal automatically
