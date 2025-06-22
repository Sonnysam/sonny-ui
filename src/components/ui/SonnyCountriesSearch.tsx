import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { Text } from './Text';
import { Colors } from '../../constants/colors';
import { Country, searchCountries } from '../../data/countries';

export interface SonnyCountriesSearchProps {
    /** Callback when a country is selected */
    onCountrySelect: (country: Country) => void;
    /** Placeholder text for the search input */
    placeholder?: string;
    /** Initial search value (uncontrolled) */
    initialValue?: string;
    /** Current search value (controlled) */
    value?: string;
    /** Maximum number of results to show */
    maxResults?: number;
    /** Custom styles for the container */
    containerStyle?: ViewStyle;
    /** Custom styles for the search input */
    inputStyle?: TextStyle;
    /** Custom styles for the results list */
    listStyle?: ViewStyle;
    /** Custom styles for each result item */
    itemStyle?: ViewStyle;
    /** Whether to show country flags */
    showFlags?: boolean;
    /** Whether to show country codes */
    showCodes?: boolean;
    /** Whether to show dial codes */
    showDialCodes?: boolean;
    /** Whether to clear search after selection */
    clearOnSelect?: boolean;
    /** Custom render function for country items */
    renderCountryItem?: (country: Country, onSelect: () => void) => React.ReactElement;
    /** Whether the search input is disabled */
    disabled?: boolean;
    /** Callback when search text changes */
    onSearchChange?: (text: string) => void;
}

/**
 * A customizable search input component for countries with real-time filtering.
 * Provides a text input with dropdown results showing matching countries.
 * 
 * @example
 * ```tsx
 * <SonnyCountriesSearch
 *   onCountrySelect={(country) => console.log(country)}
 *   placeholder="Search countries..."
 *   showFlags
 *   showCodes
 *   maxResults={10}
 * />
 * ```
 */
export const SonnyCountriesSearch: React.FC<SonnyCountriesSearchProps> = ({
    onCountrySelect,
    placeholder = "Search countries...",
    initialValue = "",
    value,
    maxResults = 10,
    containerStyle,
    inputStyle,
    listStyle,
    itemStyle,
    showFlags = true,
    showCodes = false,
    showDialCodes = false,
    clearOnSelect = false,
    renderCountryItem,
    disabled = false,
    onSearchChange,
}) => {
    const [internalSearchText, setInternalSearchText] = useState(initialValue);
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
    const [showResults, setShowResults] = useState(false);

    // Validate required props
    if (!onCountrySelect || typeof onCountrySelect !== 'function') {
        console.error('SonnyCountriesSearch: onCountrySelect prop is required and must be a function');
        return null;
    }

    // Use controlled value if provided, otherwise use internal state
    const searchText = value !== undefined ? value : internalSearchText;
    const isControlled = value !== undefined;

    useEffect(() => {
        if (searchText.trim()) {
            const results = searchCountries(searchText).slice(0, maxResults);
            setFilteredCountries(results);
            setShowResults(true);
        } else {
            setFilteredCountries([]);
            setShowResults(false);
        }
    }, [searchText, maxResults]);

    const handleSearchChange = (text: string) => {
        if (!isControlled) {
            setInternalSearchText(text);
        }
        onSearchChange?.(text);
    };

    const handleCountrySelect = (country: Country) => {
        onCountrySelect(country);
        if (clearOnSelect) {
            if (!isControlled) {
                setInternalSearchText("");
            }
            // Note: In controlled mode, parent should handle clearing via onSearchChange
        }
        setShowResults(false);
    };

    const renderDefaultCountryItem = (country: Country) => (
        <TouchableOpacity
            style={[styles.countryItem, itemStyle]}
            onPress={() => handleCountrySelect(country)}
            activeOpacity={0.7}
        >
            <View style={styles.countryInfo}>
                {showFlags && (
                    <Text style={styles.flag}>{country.flag}</Text>
                )}
                <View style={styles.countryText}>
                    <Text
                        style={styles.countryName}
                        fontFamily="inter"
                        fontSize={16}
                        fontWeight="500"
                        color={Colors.black}
                    >
                        {country.name}
                    </Text>
                    {(showCodes || showDialCodes) && (
                        <View style={styles.countryMeta}>
                            {showCodes && (
                                <Text
                                    style={styles.countryCode}
                                    fontFamily="inter"
                                    fontSize={12}
                                    fontWeight="500"
                                    color={Colors.grey}
                                >
                                    {country.code}
                                </Text>
                            )}
                            {showDialCodes && (
                                <Text
                                    style={styles.dialCode}
                                    fontFamily="inter"
                                    fontSize={12}
                                    fontWeight="500"
                                    color={Colors.info}
                                >
                                    {country.dialCode}
                                </Text>
                            )}
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderCountryItemWrapper = ({ item }: { item: Country }) => {
        if (renderCountryItem) {
            return renderCountryItem(item, () => handleCountrySelect(item));
        }
        return renderDefaultCountryItem(item);
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <TextInput
                style={[styles.searchInput, inputStyle]}
                value={searchText}
                onChangeText={handleSearchChange}
                placeholder={placeholder}
                placeholderTextColor={Colors.grey}
                editable={!disabled}
                onFocus={() => {
                    if (searchText.trim() && filteredCountries.length > 0) {
                        setShowResults(true);
                    }
                }}
            />

            {showResults && filteredCountries.length > 0 && (
                <View style={[styles.resultsContainer, listStyle]}>
                    <FlatList
                        data={filteredCountries}
                        renderItem={renderCountryItemWrapper}
                        keyExtractor={(item) => item.code}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        style={styles.resultsList}
                    />
                </View>
            )}

            {showResults && searchText.trim() && filteredCountries.length === 0 && (
                <View style={[styles.resultsContainer, styles.noResults, listStyle]}>
                    <Text
                        style={styles.noResultsText}
                        fontFamily="inter"
                        fontSize={14}
                        color={Colors.grey}
                    >
                        No countries found
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        zIndex: 1000,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#dee2e6',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: Colors.white,
        color: Colors.black,
    },
    resultsContainer: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: '#dee2e6',
        borderTopWidth: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        maxHeight: 200,
        zIndex: 1000,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
    },
    resultsList: {
        flexGrow: 0,
    },
    countryItem: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f3f4',
    },
    countryInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flag: {
        fontSize: 20,
        marginRight: 12,
    },
    countryText: {
        flex: 1,
    },
    countryName: {
        // Font styles now handled by Text component props
    },
    countryMeta: {
        flexDirection: 'row',
        marginTop: 2,
        gap: 8,
    },
    countryCode: {
        // Font styles now handled by Text component props
    },
    dialCode: {
        // Font styles now handled by Text component props
    },
    noResults: {
        padding: 16,
        alignItems: 'center',
    },
    noResultsText: {
        fontStyle: 'italic',
    },
});

export type { Country } from '../../data/countries'; 