import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { Text } from './Text';
import { SonnyModal } from './SonnyModal';
import { SonnyCountriesSearch } from './SonnyCountriesSearch';
import { Colors } from '../../constants/colors';
import { Country, findCountryByCode } from '../../data/countries';

export interface SonnyCountryCodePickerProps {
    /** Callback when a country is selected */
    onCountrySelect: (country: Country) => void;
    /** Selected country code (e.g., "US", "GB") */
    selectedCountryCode?: string;
    /** Selected country object (alternative to selectedCountryCode) */
    selectedCountry?: Country;
    /** Custom styles for the picker button */
    buttonStyle?: ViewStyle;
    /** Custom styles for the picker button text */
    buttonTextStyle?: TextStyle;
    /** Custom styles for the modal */
    modalStyle?: ViewStyle;
    /** Whether the picker is disabled */
    disabled?: boolean;
    /** Whether to show the country name in the button */
    showCountryName?: boolean;
    /** Whether to show the country flag in the button */
    showFlag?: boolean;
    /** Placeholder text when no country is selected */
    placeholder?: string;
    /** Maximum width for country name display */
    maxCountryNameWidth?: number;
}

/**
 * A country code picker component that opens a modal with searchable country list.
 * Displays the selected country's flag and dial code in a button format.
 * 
 * @example
 * ```tsx
 * <SonnyCountryCodePicker
 *   onCountrySelect={(country) => console.log(country)}
 *   selectedCountryCode="US"
 *   showCountryName
 *   showFlag
 * />
 * ```
 */
export const SonnyCountryCodePicker: React.FC<SonnyCountryCodePickerProps> = ({
    onCountrySelect,
    selectedCountryCode,
    selectedCountry,
    buttonStyle,
    buttonTextStyle,
    modalStyle,
    disabled = false,
    showCountryName = false,
    showFlag = true,
    placeholder = "Select country",
    maxCountryNameWidth = 120,
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [internalSelectedCountry, setInternalSelectedCountry] = useState<Country | null>(null);

    // Use provided selectedCountry prop or derive from selectedCountryCode
    const currentSelectedCountry = selectedCountry || internalSelectedCountry;

    useEffect(() => {
        if (!selectedCountry && selectedCountryCode) {
            const country = findCountryByCode(selectedCountryCode);
            setInternalSelectedCountry(country || null);
        } else if (!selectedCountry && !selectedCountryCode) {
            setInternalSelectedCountry(null);
        }
    }, [selectedCountryCode, selectedCountry]);

    const handleCountrySelect = (country: Country) => {
        if (!selectedCountry) {
            setInternalSelectedCountry(country);
        }
        onCountrySelect(country);
        setIsModalVisible(false);
    };

    const openPicker = () => {
        if (!disabled) {
            setIsModalVisible(true);
        }
    };

    const renderButtonContent = () => {
        if (!currentSelectedCountry) {
            return (
                <Text style={[styles.placeholderText, buttonTextStyle] as any}>
                    {placeholder}
                </Text>
            );
        }

        return (
            <View style={styles.buttonContent}>
                {showFlag && (
                    <Text style={styles.flagText}>{currentSelectedCountry.flag}</Text>
                )}
                <Text style={[styles.dialCodeText, buttonTextStyle] as any}>
                    {currentSelectedCountry.dialCode}
                </Text>
                {showCountryName && (
                    <Text
                        style={[
                            styles.countryNameText,
                            buttonTextStyle,
                            { maxWidth: maxCountryNameWidth }
                        ] as any}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {currentSelectedCountry.name}
                    </Text>
                )}
                <Text style={[styles.chevron, buttonTextStyle] as any}>▼</Text>
            </View>
        );
    };

    return (
        <>
            <TouchableOpacity
                style={[
                    styles.pickerButton,
                    disabled && styles.disabledButton,
                    buttonStyle,
                ]}
                onPress={openPicker}
                disabled={disabled}
                activeOpacity={0.7}
            >
                {renderButtonContent()}
            </TouchableOpacity>

            <SonnyModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                widthPercentage={90}
                contentContainerStyle={modalStyle}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Select Country</Text>
                    <SonnyCountriesSearch
                        onCountrySelect={handleCountrySelect}
                        placeholder="Search countries..."
                        showFlags
                        showDialCodes
                        maxResults={15}
                        clearOnSelect={false}
                        containerStyle={styles.searchContainer}
                    />
                </View>
            </SonnyModal>
        </>
    );
};

const styles = StyleSheet.create({
    pickerButton: {
        borderWidth: 1,
        borderColor: '#dee2e6',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: Colors.white,
        minHeight: 48,
        justifyContent: 'center',
    },
    disabledButton: {
        backgroundColor: '#f8f9fa',
        borderColor: '#e9ecef',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    flagText: {
        fontSize: 18,
        marginRight: 8,
    },
    dialCodeText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.black,
        marginRight: 8,
    },
    countryNameText: {
        fontSize: 14,
        color: Colors.grey,
        flex: 1,
        marginRight: 8,
    },
    chevron: {
        fontSize: 12,
        color: Colors.grey,
        marginLeft: 'auto',
    },
    placeholderText: {
        fontSize: 16,
        color: Colors.grey,
    },
    modalContent: {
        padding: 16,
    },
    searchContainer: {
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.white,
        marginBottom: 16,
        textAlign: 'center',
    },
});

export type { Country } from '../../data/countries'; 