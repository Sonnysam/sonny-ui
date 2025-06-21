import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MainContainer, Text } from '../src';
import { Colors } from '../src/constants/colors';

export const MainContainerExample = () => {
    return (
        <MainContainer>
            <View style={styles.content}>
                <Text style={styles.title}>Main Container Example</Text>
                <Text style={styles.description}>
                    This component handles safe area insets and scrolling behavior,
                    automatically adapting to iOS and Android platforms.
                </Text>

                {/* Example content to demonstrate scrolling */}
                {Array.from({ length: 20 }).map((_, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.cardTitle}>Card {index + 1}</Text>
                        <Text style={styles.cardText}>
                            This is an example card to demonstrate the scrolling
                            behavior of the MainContainer component.
                        </Text>
                    </View>
                ))}
            </View>
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 16,
        color: Colors.black,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 32,
        color: Colors.grey,
        paddingHorizontal: 24,
    },
    card: {
        backgroundColor: Colors.white,
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        width: '100%',
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        color: Colors.black,
    },
    cardText: {
        fontSize: 14,
        color: Colors.grey,
    },
}); 