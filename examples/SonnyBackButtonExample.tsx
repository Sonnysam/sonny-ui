import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { SonnyBackButton, Text, MainContainer } from '../src';

/**
 * Example demonstrating all features of the SonnyBackButton component
 */
export const SonnyBackButtonExample = () => {
    const handleCustomBack = () => {
        Alert.alert('Custom Back', 'Custom back action triggered!');
    };

    const handleNavigation = () => {
        Alert.alert('Navigation', 'This would navigate to a specific screen');
    };

    return (
        <MainContainer>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>SonnyBackButton Examples</Text>

                {/* Basic Variants */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Button Variants</Text>
                    
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <SonnyBackButton
                                variant="default"
                                onPress={handleCustomBack}
                            />
                            <Text style={styles.label}>Default</Text>
                        </View>
                        
                        <View style={styles.buttonContainer}>
                            <SonnyBackButton
                                variant="circle"
                                onPress={handleCustomBack}
                            />
                            <Text style={styles.label}>Circle</Text>
                        </View>
                        
                        <View style={styles.buttonContainer}>
                            <SonnyBackButton
                                variant="square"
                                onPress={handleCustomBack}
                            />
                            <Text style={styles.label}>Square</Text>
                        </View>
                        
                        <View style={styles.buttonContainer}>
                            <SonnyBackButton
                                variant="rounded"
                                onPress={handleCustomBack}
                            />
                            <Text style={styles.label}>Rounded</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <SonnyBackButton
                                variant="minimal"
                                onPress={handleCustomBack}
                            />
                            <Text style={styles.label}>Minimal</Text>
                        </View>
                        
                        <View style={styles.buttonContainer}>
                            <SonnyBackButton
                                variant="ios"
                                onPress={handleCustomBack}
                            />
                            <Text style={styles.label}>iOS Style</Text>
                        </View>
                        
                        <View style={styles.buttonContainer}>
                            <SonnyBackButton
                                variant="android"
                                onPress={handleCustomBack}
                            />
                            <Text style={styles.label}>Android</Text>
                        </View>
                    </View>
                </View>

                {/* Button Sizes */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Button Sizes</Text>
                    
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <SonnyBackButton
                                size="small"
                                onPress={handleCustomBack}
                            />
                            <Text style={styles.label}>Small</Text>
                        </View>
                        
                        <View style={styles.buttonContainer}>
                            <SonnyBackButton
                                size="medium"
                                onPress={handleCustomBack}
                            />
                            <Text style={styles.label}>Medium</Text>
                        </View>
                        
                        <View style={styles.buttonContainer}>
                            <SonnyBackButton
                                size="large"
                                onPress={handleCustomBack}
                            />
                            <Text style={styles.label}>Large</Text>
                        </View>
                    </View>
                </View>

                {/* Custom Icons */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Custom Icons</Text>
                    
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <SonnyBackButton
                                icon="close"
                                variant="circle"
                                onPress={handleCustomBack}
                            />
                            <Text style={styles.label}>Close</Text>
                        </View>
                        
                        <View style={styles.buttonContainer}>
                            <SonnyBackButton
                                icon="home"
                                variant="rounded"
                                backgroundColor="#4CAF50"
                                onPress={handleNavigation}
                            />
                            <Text style={styles.label}>Home</Text>
                        </View>
                        
                        <View style={styles.buttonContainer}>
                            <SonnyBackButton
                                icon="menu"
                                variant="square"
                                backgroundColor="#FF9800"
                                onPress={handleCustomBack}
                            />
                            <Text style={styles.label}>Menu</Text>
                        </View>
                    </View>
                </View>

                {/* Custom Styling */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Custom Styling</Text>
                    
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <SonnyBackButton
                                backgroundColor="#9C27B0"
                                iconColor="#FFFFFF"
                                borderRadius={20}
                                onPress={handleCustomBack}
                            />
                            <Text style={styles.label}>Purple</Text>
                        </View>
                        
                        <View style={styles.buttonContainer}>
                            <SonnyBackButton
                                variant="circle"
                                backgroundColor="#FF5722"
                                iconColor="#FFFFFF"
                                shadow
                                onPress={handleCustomBack}
                            />
                            <Text style={styles.label}>Shadow</Text>
                        </View>
                        
                        <View style={styles.buttonContainer}>
                            <SonnyBackButton
                                backgroundColor="transparent"
                                iconColor="#E91E63"
                                borderColor="#E91E63"
                                borderWidth={2}
                                borderRadius={25}
                                onPress={handleCustomBack}
                            />
                            <Text style={styles.label}>Outline</Text>
                        </View>
                    </View>
                </View>

                {/* Positioned Buttons */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Positioned Example</Text>
                    
                    <View style={styles.positionedContainer}>
                        <Text style={styles.positionedText}>
                            This demonstrates how back buttons would appear when positioned absolutely in a screen header.
                        </Text>
                        
                        <SonnyBackButton
                            position="absolute"
                            top={10}
                            left={10}
                            variant="ios"
                            onPress={handleCustomBack}
                            zIndex={1}
                        />
                        
                        <SonnyBackButton
                            position="absolute"
                            top={10}
                            right={10}
                            variant="circle"
                            icon="close"
                            onPress={handleCustomBack}
                            zIndex={1}
                        />
                    </View>
                </View>

                {/* Disabled State */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Disabled State</Text>
                    
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <SonnyBackButton
                                disabled
                                onPress={handleCustomBack}
                            />
                            <Text style={styles.label}>Disabled</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
        color: '#333',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        alignItems: 'center',
        minWidth: 60,
    },
    label: {
        fontSize: 12,
        color: '#666',
        marginTop: 8,
        textAlign: 'center',
    },
    positionedContainer: {
        height: 120,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 60,
    },
    positionedText: {
        textAlign: 'center',
        color: '#666',
        fontSize: 14,
    },
});

export default SonnyBackButtonExample;
