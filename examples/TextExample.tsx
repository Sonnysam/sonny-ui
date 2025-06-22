import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from '../src/components/ui/Text';

export const TextExample = () => {
    return (
        <ScrollView style={styles.container}>
            <Text fontWeight="700" fontSize={24} style={styles.title}>
                Google Fonts Examples
            </Text>

            <View style={styles.section}>
                <Text fontWeight="600" fontSize={18} style={styles.sectionTitle}>
                    Poppins Font Weights (Default)
                </Text>

                <Text fontFamily="poppins" fontWeight="300" fontSize={16} style={styles.fontExample}>
                    Poppins Light (300) - The quick brown fox jumps over the lazy dog
                </Text>

                <Text fontFamily="poppins" fontWeight="400" fontSize={16} style={styles.fontExample}>
                    Poppins Regular (400) - The quick brown fox jumps over the lazy dog
                </Text>

                <Text fontFamily="poppins" fontWeight="500" fontSize={16} style={styles.fontExample}>
                    Poppins Medium (500) - The quick brown fox jumps over the lazy dog
                </Text>

                <Text fontFamily="poppins" fontWeight="600" fontSize={16} style={styles.fontExample}>
                    Poppins SemiBold (600) - The quick brown fox jumps over the lazy dog
                </Text>

                <Text fontFamily="poppins" fontWeight="700" fontSize={16} style={styles.fontExample}>
                    Poppins Bold (700) - The quick brown fox jumps over the lazy dog
                </Text>

                <Text fontFamily="poppins" fontWeight="800" fontSize={16} style={styles.fontExample}>
                    Poppins ExtraBold (800) - The quick brown fox jumps over the lazy dog
                </Text>

                <Text fontFamily="poppins" fontWeight="900" fontSize={16} style={styles.fontExample}>
                    Poppins Black (900) - The quick brown fox jumps over the lazy dog
                </Text>
            </View>

            <View style={styles.section}>
                <Text fontWeight="600" fontSize={18} style={styles.sectionTitle}>
                    Inter Font Weights
                </Text>

                <Text fontFamily="inter" fontWeight="300" fontSize={16} style={styles.fontExample}>
                    Inter Light (300) - The quick brown fox jumps over the lazy dog
                </Text>

                <Text fontFamily="inter" fontWeight="400" fontSize={16} style={styles.fontExample}>
                    Inter Regular (400) - The quick brown fox jumps over the lazy dog
                </Text>

                <Text fontFamily="inter" fontWeight="500" fontSize={16} style={styles.fontExample}>
                    Inter Medium (500) - The quick brown fox jumps over the lazy dog
                </Text>

                <Text fontFamily="inter" fontWeight="600" fontSize={16} style={styles.fontExample}>
                    Inter SemiBold (600) - The quick brown fox jumps over the lazy dog
                </Text>

                <Text fontFamily="inter" fontWeight="700" fontSize={16} style={styles.fontExample}>
                    Inter Bold (700) - The quick brown fox jumps over the lazy dog
                </Text>

                <Text fontFamily="inter" fontWeight="800" fontSize={16} style={styles.fontExample}>
                    Inter ExtraBold (800) - The quick brown fox jumps over the lazy dog
                </Text>

                <Text fontFamily="inter" fontWeight="900" fontSize={16} style={styles.fontExample}>
                    Inter Black (900) - The quick brown fox jumps over the lazy dog
                </Text>
            </View>

            <View style={styles.section}>
                <Text fontWeight="600" fontSize={18} style={styles.sectionTitle}>
                    Font Comparison
                </Text>

                <Text fontFamily="poppins" fontWeight="600" fontSize={18} style={styles.fontExample}>
                    Poppins SemiBold - Modern & Friendly
                </Text>

                <Text fontFamily="inter" fontWeight="600" fontSize={18} style={styles.fontExample}>
                    Inter SemiBold - Clean & Professional
                </Text>

                <Text fontFamily="system" fontSize={18} style={styles.fontExample}>
                    System Font - Platform Default
                </Text>
            </View>

            <View style={styles.section}>
                <Text fontWeight="600" fontSize={18} style={styles.sectionTitle}>
                    Font Sizes
                </Text>

                <Text fontSize={12} fontWeight="400" style={styles.fontExample}>
                    Small text (12px) - Perfect for captions and fine print
                </Text>

                <Text fontSize={14} fontWeight="400" style={styles.fontExample}>
                    Body text (14px) - Ideal for secondary content
                </Text>

                <Text fontSize={16} fontWeight="400" style={styles.fontExample}>
                    Default text (16px) - Standard reading size
                </Text>

                <Text fontSize={18} fontWeight="500" style={styles.fontExample}>
                    Large text (18px) - Great for subheadings
                </Text>

                <Text fontSize={20} fontWeight="600" style={styles.fontExample}>
                    Extra large (20px) - Perfect for headings
                </Text>

                <Text fontSize={24} fontWeight="700" style={styles.fontExample}>
                    Title (24px) - Eye-catching titles
                </Text>

                <Text fontSize={32} fontWeight="800" style={styles.fontExample}>
                    Display (32px) - Hero text
                </Text>
            </View>

            <View style={styles.section}>
                <Text fontWeight="600" fontSize={18} style={styles.sectionTitle}>
                    Colors
                </Text>

                <Text color="#000000" fontSize={16} style={styles.fontExample}>
                    Black text (default)
                </Text>

                <Text color="#6B7280" fontSize={16} style={styles.fontExample}>
                    Gray text for secondary content
                </Text>

                <Text color="#007AFF" fontSize={16} style={styles.fontExample}>
                    Blue text for links and actions
                </Text>

                <Text color="#10B981" fontSize={16} style={styles.fontExample}>
                    Green text for success messages
                </Text>

                <Text color="#EF4444" fontSize={16} style={styles.fontExample}>
                    Red text for errors and warnings
                </Text>

                <Text color="#8B5CF6" fontSize={16} style={styles.fontExample}>
                    Purple text for special content
                </Text>
            </View>

            <View style={styles.section}>
                <Text fontWeight="600" fontSize={18} style={styles.sectionTitle}>
                    Custom Styling
                </Text>

                <Text
                    fontFamily="inter"
                    fontWeight="700"
                    fontSize={20}
                    color="#007AFF"
                    style={styles.customText}
                >
                    Custom Inter text with additional styles
                </Text>

                <Text
                    fontFamily="poppins"
                    fontWeight="500"
                    fontSize={16}
                    style={styles.centeredText}
                >
                    Centered Poppins text with custom styling
                </Text>

                <Text
                    fontWeight="400"
                    fontSize={14}
                    color="#6B7280"
                    style={{ fontStyle: 'italic', marginVertical: 4 }}
                >
                    Italic text for emphasis
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    title: {
        textAlign: 'center',
        marginBottom: 30,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        marginBottom: 15,
        color: '#1F2937',
    },
    fontExample: {
        marginVertical: 4,
    },
    customText: {
        marginVertical: 8,
        textDecorationLine: 'underline',
    },
    centeredText: {
        marginVertical: 8,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
}); 