import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, MainContainer, SonnyCountriesSearch, SonnyCountryCodePicker } from '../src';
import { Country } from '../src/data/countries';
import { Colors } from '../src/constants/colors';

export const CountriesExample = () => {
    const [selectedCountry1, setSelectedCountry1] = useState<Country | null>(null);
    const [selectedCountry2, setSelectedCountry2] = useState<Country | null>(null);
    const [searchValue, setSearchValue] = useState('');

    const handleCountrySelect1 = (country: Country) => {
        console.log('Country selected 1:', country);
        setSelectedCountry1(country);
        Alert.alert('Country Selected', `You selected: ${country.name} (${country.code})`);
    };

    const handleCountrySelect2 = (country: Country) => {
        console.log('Country selected 2:', country);
        setSelectedCountry2(country);
        Alert.alert('Country Selected', `You selected: ${country.name} (${country.dialCode})`);
    };

    const handleSearchSelect = (country: Country) => {
        console.log('Search country selected:', country);
        Alert.alert('Search Selection', `You selected: ${country.name}`);
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
                                onCountrySelect={handleSearchSelect}
                                placeholder="Search countries..."
                                showFlags
                                showDialCodes
                                maxResults={10}
                            />
                        </View>

                        <View style={styles.exampleContainer}>
                            <Text style={styles.exampleLabel}>With Country Codes & Dial Codes</Text>
                            <SonnyCountriesSearch
                                onCountrySelect={handleSearchSelect}
                                placeholder="Search with codes..."
                                showFlags
                                showCodes
                                maxResults={8}
                            />
                        </View>

                        <View style={styles.exampleContainer}>
                            <Text style={styles.exampleLabel}>Custom Styled</Text>
                            <SonnyCountriesSearch
                                onCountrySelect={handleSearchSelect}
                                value={searchValue}
                                onSearchChange={setSearchValue}
                                placeholder="Controlled search..."
                                showFlags
                                showDialCodes
                                showCodes
                                maxResults={5}
                            />
                        </View>

                        {searchValue.length > 0 && (
                            <View style={styles.resultContainer}>
                                <Text style={styles.resultTitle}>Current Search:</Text>
                                <Text style={styles.searchInfo}>"{searchValue}"</Text>
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
                                onCountrySelect={handleCountrySelect1}
                                selectedCountry={selectedCountry1 || undefined}
                                showFlag
                                placeholder="Select country"
                            />
                        </View>

                        <View style={styles.exampleContainer}>
                            <Text style={styles.exampleLabel}>With Country Name</Text>
                            <SonnyCountryCodePicker
                                onCountrySelect={handleCountrySelect2}
                                selectedCountry={selectedCountry2 || undefined}
                                showFlag
                                showCountryName
                                placeholder="Select country with name"
                            />
                        </View>

                        <View style={styles.exampleContainer}>
                            <Text style={styles.exampleLabel}>Custom Styled</Text>
                            <SonnyCountryCodePicker
                                onCountrySelect={handleCountrySelect1}
                                selectedCountry={selectedCountry1 || undefined}
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

                        {selectedCountry1 && (
                            <View style={styles.resultContainer}>
                                <Text style={styles.resultTitle}>Selected Country:</Text>
                                <View style={styles.countryDisplay}>
                                    <Text style={styles.flagLarge}>{selectedCountry1.flag}</Text>
                                    <View style={styles.countryInfo}>
                                        <Text style={styles.countryName}>{selectedCountry1.name}</Text>
                                        <Text style={styles.countryDetails}>
                                            {selectedCountry1.code} • {selectedCountry1.dialCode}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}

                        {selectedCountry2 && (
                            <View style={styles.resultContainer}>
                                <Text style={styles.resultTitle}>Selected Country:</Text>
                                <View style={styles.countryDisplay}>
                                    <Text style={styles.flagLarge}>{selectedCountry2.flag}</Text>
                                    <View style={styles.countryInfo}>
                                        <Text style={styles.countryName}>{selectedCountry2.name}</Text>
                                        <Text style={styles.countryDetails}>
                                            {selectedCountry2.code} • {selectedCountry2.dialCode}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>

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
    searchInfo: {
        marginTop: 8,
        fontStyle: 'italic',
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