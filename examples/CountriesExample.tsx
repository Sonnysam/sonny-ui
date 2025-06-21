import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, MainContainer, SonnyCountriesSearch, SonnyCountryCodePicker } from '../src';
import { Country } from '../src/data/countries';
import { Colors } from '../src/constants/colors';

export const CountriesExample = () => {
    const [selectedSearchCountry, setSelectedSearchCountry] = useState<Country | null>(null);
    const [selectedPickerCountry, setSelectedPickerCountry] = useState<Country | null>(null);
    const [searchHistory, setSearchHistory] = useState<Country[]>([]);

    const handleSearchCountrySelect = (country: Country) => {
        setSelectedSearchCountry(country);
        // Add to history if not already present
        if (!searchHistory.find(c => c.code === country.code)) {
            setSearchHistory(prev => [country, ...prev.slice(0, 4)]); // Keep last 5
        }
    };

    const handlePickerCountrySelect = (country: Country) => {
        setSelectedPickerCountry(country);
    };

    return (
        <MainContainer>
            <View style={styles.container}>
                <Text style={styles.title}>Countries Components</Text>
                <Text style={styles.description}>
                    Search and select countries with customizable components
                </Text>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Countries Search */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Countries Search</Text>
                        <Text style={styles.sectionDescription}>
                            Real-time search with dropdown results
                        </Text>

                        <View style={styles.exampleContainer}>
                            <Text style={styles.exampleLabel}>Basic Search</Text>
                            <SonnyCountriesSearch
                                onCountrySelect={handleSearchCountrySelect}
                                placeholder="Search countries..."
                                showFlags
                                maxResults={8}
                            />
                        </View>

                        <View style={styles.exampleContainer}>
                            <Text style={styles.exampleLabel}>With Country Codes & Dial Codes</Text>
                            <SonnyCountriesSearch
                                onCountrySelect={handleSearchCountrySelect}
                                placeholder="Search by name, code, or dial code..."
                                showFlags
                                showCodes
                                showDialCodes
                                maxResults={6}
                                clearOnSelect
                            />
                        </View>

                        <View style={styles.exampleContainer}>
                            <Text style={styles.exampleLabel}>Custom Styled</Text>
                            <SonnyCountriesSearch
                                onCountrySelect={handleSearchCountrySelect}
                                placeholder="Custom styled search..."
                                showFlags={false}
                                showCodes
                                maxResults={5}
                                inputStyle={styles.customInput}
                                listStyle={styles.customList}
                                itemStyle={styles.customItem}
                            />
                        </View>

                        {selectedSearchCountry && (
                            <View style={styles.resultContainer}>
                                <Text style={styles.resultTitle}>Selected Country:</Text>
                                <View style={styles.countryDisplay}>
                                    <Text style={styles.flagLarge}>{selectedSearchCountry.flag}</Text>
                                    <View style={styles.countryInfo}>
                                        <Text style={styles.countryName}>{selectedSearchCountry.name}</Text>
                                        <Text style={styles.countryDetails}>
                                            {selectedSearchCountry.code} • {selectedSearchCountry.dialCode}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>

                    {/* Country Code Picker */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Country Code Picker</Text>
                        <Text style={styles.sectionDescription}>
                            Modal-based picker for country dial codes
                        </Text>

                        <View style={styles.exampleContainer}>
                            <Text style={styles.exampleLabel}>Basic Picker</Text>
                            <SonnyCountryCodePicker
                                onCountrySelect={handlePickerCountrySelect}
                                selectedCountryCode={selectedPickerCountry?.code}
                                placeholder="Select country code"
                            />
                        </View>

                        <View style={styles.exampleContainer}>
                            <Text style={styles.exampleLabel}>With Country Name</Text>
                            <SonnyCountryCodePicker
                                onCountrySelect={handlePickerCountrySelect}
                                selectedCountryCode={selectedPickerCountry?.code}
                                showCountryName
                                showFlag
                                placeholder="Select country"
                                maxCountryNameWidth={100}
                            />
                        </View>

                        <View style={styles.exampleContainer}>
                            <Text style={styles.exampleLabel}>Custom Styled</Text>
                            <SonnyCountryCodePicker
                                onCountrySelect={handlePickerCountrySelect}
                                selectedCountryCode={selectedPickerCountry?.code}
                                showCountryName
                                buttonStyle={styles.customButton}
                                buttonTextStyle={styles.customButtonText}
                                placeholder="Custom picker"
                            />
                        </View>

                        <View style={styles.exampleContainer}>
                            <Text style={styles.exampleLabel}>Disabled State</Text>
                            <SonnyCountryCodePicker
                                onCountrySelect={() => { }}
                                selectedCountryCode="US"
                                disabled
                                showCountryName
                                placeholder="Disabled picker"
                            />
                        </View>

                        {selectedPickerCountry && (
                            <View style={styles.resultContainer}>
                                <Text style={styles.resultTitle}>Selected Country Code:</Text>
                                <View style={styles.countryDisplay}>
                                    <Text style={styles.flagLarge}>{selectedPickerCountry.flag}</Text>
                                    <View style={styles.countryInfo}>
                                        <Text style={styles.countryName}>{selectedPickerCountry.name}</Text>
                                        <Text style={styles.countryDetails}>
                                            {selectedPickerCountry.code} • {selectedPickerCountry.dialCode}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>

                    {/* Search History */}
                    {searchHistory.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Recent Searches</Text>
                            <View style={styles.historyContainer}>
                                {searchHistory.map((country, index) => (
                                    <View key={country.code} style={styles.historyItem}>
                                        <Text style={styles.historyFlag}>{country.flag}</Text>
                                        <Text style={styles.historyName}>{country.name}</Text>
                                        <Text style={styles.historyCode}>{country.code}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Usage Examples */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Common Use Cases</Text>
                        <View style={styles.useCaseContainer}>
                            <View style={styles.useCase}>
                                <Text style={styles.useCaseIcon}>📱</Text>
                                <View style={styles.useCaseContent}>
                                    <Text style={styles.useCaseTitle}>Phone Number Input</Text>
                                    <Text style={styles.useCaseDescription}>
                                        Use CountryCodePicker for international phone number forms
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.useCase}>
                                <Text style={styles.useCaseIcon}>📍</Text>
                                <View style={styles.useCaseContent}>
                                    <Text style={styles.useCaseTitle}>Address Forms</Text>
                                    <Text style={styles.useCaseDescription}>
                                        Use CountriesSearch for shipping and billing addresses
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.useCase}>
                                <Text style={styles.useCaseIcon}>👤</Text>
                                <View style={styles.useCaseContent}>
                                    <Text style={styles.useCaseTitle}>User Registration</Text>
                                    <Text style={styles.useCaseDescription}>
                                        Collect user location during account setup
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.useCase}>
                                <Text style={styles.useCaseIcon}>🌍</Text>
                                <View style={styles.useCaseContent}>
                                    <Text style={styles.useCaseTitle}>Localization</Text>
                                    <Text style={styles.useCaseDescription}>
                                        Set app language and regional preferences
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 16,
        color: Colors.black,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: Colors.grey,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 22,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
        color: Colors.black,
    },
    sectionDescription: {
        fontSize: 14,
        color: Colors.grey,
        marginBottom: 20,
        fontStyle: 'italic',
    },
    exampleContainer: {
        marginBottom: 20,
    },
    exampleLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
        color: Colors.black,
    },
    customInput: {
        borderColor: Colors.info,
        borderWidth: 2,
        backgroundColor: '#f8f9ff',
    },
    customList: {
        borderColor: Colors.info,
    },
    customItem: {
        backgroundColor: '#f8f9ff',
    },
    customButton: {
        borderColor: Colors.success,
        borderWidth: 2,
        backgroundColor: '#f8fff8',
    },
    customButtonText: {
        color: Colors.success,
    },
    resultContainer: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    resultTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 12,
    },
    countryDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flagLarge: {
        fontSize: 32,
        marginRight: 16,
    },
    countryInfo: {
        flex: 1,
    },
    countryName: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 4,
    },
    countryDetails: {
        fontSize: 14,
        color: Colors.grey,
    },
    historyContainer: {
        gap: 8,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        padding: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    historyFlag: {
        fontSize: 16,
        marginRight: 12,
    },
    historyName: {
        flex: 1,
        fontSize: 14,
        color: Colors.black,
        fontWeight: '500',
    },
    historyCode: {
        fontSize: 12,
        color: Colors.grey,
        fontWeight: '500',
    },
    useCaseContainer: {
        gap: 16,
    },
    useCase: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: Colors.white,
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    useCaseIcon: {
        fontSize: 24,
        marginRight: 12,
        marginTop: 2,
    },
    useCaseContent: {
        flex: 1,
    },
    useCaseTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 4,
    },
    useCaseDescription: {
        fontSize: 14,
        color: Colors.grey,
        lineHeight: 20,
    },
});