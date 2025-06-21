import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Text, MainContainer } from '../src';
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
} from '../src/utils/stringUtils';
import { Colors } from '../src/constants/colors';

export const StringUtilsExample = () => {
    const [testName, setTestName] = useState('john doe smith');
    const [testText, setTestText] = useState('  this is a LONG text with   extra spaces  ');
    const [testPhone, setTestPhone] = useState('1234567890');
    const [testEmail, setTestEmail] = useState('John.Doe@EXAMPLE.COM');

    const examples = [
        {
            title: 'Name & Initials',
            items: [
                { label: 'getInitials("John Doe")', result: getInitials('John Doe') },
                { label: 'getInitials("John")', result: getInitials('John') },
                { label: 'getInitials("")', result: getInitials('') },
                { label: 'getInitials(null, "U")', result: getInitials(null, 'U') },
                { label: 'formatName("john doe")', result: formatName('john doe') },
                { label: 'formatName("JANE SMITH")', result: formatName('JANE SMITH') },
            ],
        },
        {
            title: 'Text Formatting',
            items: [
                { label: 'capitalize("hello world")', result: capitalize('hello world') },
                { label: 'toTitleCase("the quick brown fox")', result: toTitleCase('the quick brown fox') },
                { label: 'cleanText("  hello    world  ")', result: cleanText('  hello    world  ') },
                { label: 'truncateText("This is a long text", 10)', result: truncateText('This is a long text', 10) },
            ],
        },
        {
            title: 'Contact Information',
            items: [
                { label: 'formatPhoneNumber("1234567890")', result: formatPhoneNumber('1234567890') },
                { label: 'formatPhoneNumber("11234567890")', result: formatPhoneNumber('11234567890') },
                { label: 'formatEmail("John.Doe@EXAMPLE.COM")', result: formatEmail('John.Doe@EXAMPLE.COM') },
                { label: 'isValidEmail("test@example.com")', result: isValidEmail('test@example.com').toString() },
                { label: 'isValidEmail("invalid-email")', result: isValidEmail('invalid-email').toString() },
            ],
        },
        {
            title: 'Text Utilities',
            items: [
                { label: 'toSlug("Hello World!")', result: toSlug('Hello World!') },
                { label: 'maskText("1234567890123456")', result: maskText('1234567890123456') },
                { label: 'maskText("sensitive", 2, 2, "•")', result: maskText('sensitive', 2, 2, '•') },
                { label: 'getFileExtension("document.pdf")', result: getFileExtension('document.pdf') },
                { label: 'formatFileSize(1024)', result: formatFileSize(1024) },
                { label: 'formatFileSize(1048576)', result: formatFileSize(1048576) },
                { label: 'randomString(8)', result: randomString(8) },
            ],
        },
    ];

    const generateNewRandomString = () => {
        // This will re-render the component to show a new random string
        setTestName(testName + ' ');
        setTestName(testName.trim());
    };

    return (
        <MainContainer>
            <View style={styles.container}>
                <Text style={styles.title}>String Utils Examples</Text>
                <Text style={styles.description}>
                    Comprehensive string utility functions for React Native development
                </Text>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Interactive Examples */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Interactive Examples</Text>

                        <View style={styles.interactiveExample}>
                            <Text style={styles.inputLabel}>Test Name:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={testName}
                                onChangeText={setTestName}
                                placeholder="Enter a name"
                            />
                            <View style={styles.resultContainer}>
                                <Text style={styles.resultLabel}>getInitials:</Text>
                                <Text style={styles.resultValue}>{getInitials(testName)}</Text>
                            </View>
                            <View style={styles.resultContainer}>
                                <Text style={styles.resultLabel}>formatName:</Text>
                                <Text style={styles.resultValue}>{formatName(testName)}</Text>
                            </View>
                        </View>

                        <View style={styles.interactiveExample}>
                            <Text style={styles.inputLabel}>Test Text:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={testText}
                                onChangeText={setTestText}
                                placeholder="Enter text to format"
                                multiline
                            />
                            <View style={styles.resultContainer}>
                                <Text style={styles.resultLabel}>cleanText:</Text>
                                <Text style={styles.resultValue}>"{cleanText(testText)}"</Text>
                            </View>
                            <View style={styles.resultContainer}>
                                <Text style={styles.resultLabel}>toTitleCase:</Text>
                                <Text style={styles.resultValue}>{toTitleCase(testText)}</Text>
                            </View>
                        </View>

                        <View style={styles.interactiveExample}>
                            <Text style={styles.inputLabel}>Phone Number:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={testPhone}
                                onChangeText={setTestPhone}
                                placeholder="Enter phone number"
                                keyboardType="phone-pad"
                            />
                            <View style={styles.resultContainer}>
                                <Text style={styles.resultLabel}>formatPhoneNumber:</Text>
                                <Text style={styles.resultValue}>{formatPhoneNumber(testPhone)}</Text>
                            </View>
                        </View>

                        <View style={styles.interactiveExample}>
                            <Text style={styles.inputLabel}>Email:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={testEmail}
                                onChangeText={setTestEmail}
                                placeholder="Enter email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <View style={styles.resultContainer}>
                                <Text style={styles.resultLabel}>formatEmail:</Text>
                                <Text style={styles.resultValue}>{formatEmail(testEmail)}</Text>
                            </View>
                            <View style={styles.resultContainer}>
                                <Text style={styles.resultLabel}>isValidEmail:</Text>
                                <Text style={[
                                    styles.resultValue,
                                    { color: isValidEmail(testEmail) ? Colors.success : Colors.error }
                                ] as any}>
                                    {isValidEmail(testEmail) ? 'Valid ✓' : 'Invalid ✗'}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Static Examples */}
                    {examples.map((category, categoryIndex) => (
                        <View key={categoryIndex} style={styles.section}>
                            <Text style={styles.sectionTitle}>{category.title}</Text>
                            {category.items.map((item, itemIndex) => (
                                <View key={itemIndex} style={styles.exampleItem}>
                                    <Text style={styles.exampleLabel}>{item.label}</Text>
                                    <Text style={styles.exampleResult}>"{item.result}"</Text>
                                </View>
                            ))}
                        </View>
                    ))}

                    {/* Random String Generator */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Random String Generator</Text>
                        <TouchableOpacity
                            style={styles.generateButton}
                            onPress={generateNewRandomString}
                        >
                            <Text style={styles.generateButtonText}>Generate New Random String</Text>
                        </TouchableOpacity>
                        <View style={styles.randomResults}>
                            <View style={styles.resultContainer}>
                                <Text style={styles.resultLabel}>randomString(8):</Text>
                                <Text style={styles.resultValue}>{randomString(8)}</Text>
                            </View>
                            <View style={styles.resultContainer}>
                                <Text style={styles.resultLabel}>randomString(6, "0123456789"):</Text>
                                <Text style={styles.resultValue}>{randomString(6, "0123456789")}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Usage Guidelines */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Common Use Cases</Text>
                        <View style={styles.useCaseContainer}>
                            <View style={styles.useCase}>
                                <Text style={styles.useCaseIcon}>👤</Text>
                                <View style={styles.useCaseContent}>
                                    <Text style={styles.useCaseTitle}>User Profiles</Text>
                                    <Text style={styles.useCaseDescription}>
                                        Use getInitials() for avatar placeholders, formatName() for display names
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.useCase}>
                                <Text style={styles.useCaseIcon}>📱</Text>
                                <View style={styles.useCaseContent}>
                                    <Text style={styles.useCaseTitle}>Contact Information</Text>
                                    <Text style={styles.useCaseDescription}>
                                        formatPhoneNumber() and formatEmail() for consistent contact display
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.useCase}>
                                <Text style={styles.useCaseIcon}>🔒</Text>
                                <View style={styles.useCaseContent}>
                                    <Text style={styles.useCaseTitle}>Security & Privacy</Text>
                                    <Text style={styles.useCaseDescription}>
                                        maskText() for sensitive data like credit cards, SSNs
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.useCase}>
                                <Text style={styles.useCaseIcon}>📄</Text>
                                <View style={styles.useCaseContent}>
                                    <Text style={styles.useCaseTitle}>File Management</Text>
                                    <Text style={styles.useCaseDescription}>
                                        getFileExtension() and formatFileSize() for file handling
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
        marginBottom: 16,
        color: Colors.black,
    },
    interactiveExample: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
        color: Colors.black,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#dee2e6',
        borderRadius: 6,
        padding: 12,
        backgroundColor: Colors.white,
        fontSize: 16,
        marginBottom: 12,
        minHeight: 44,
    },
    resultContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
    },
    resultLabel: {
        fontSize: 14,
        color: Colors.grey,
        flex: 1,
    },
    resultValue: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.black,
        flex: 1,
        textAlign: 'right',
    },
    exampleItem: {
        backgroundColor: Colors.white,
        padding: 12,
        borderRadius: 6,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    exampleLabel: {
        fontSize: 13,
        fontFamily: 'monospace',
        color: Colors.grey,
        marginBottom: 4,
    },
    exampleResult: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.black,
    },
    generateButton: {
        backgroundColor: Colors.info,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignSelf: 'center',
        marginBottom: 16,
    },
    generateButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    randomResults: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
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