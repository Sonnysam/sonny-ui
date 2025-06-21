import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { SonnyButton, Text, MainContainer } from '../src';

/**
 * Example demonstrating all features of the SonnyButton component
 */
export const SonnyButtonExample = () => {
    const [loading, setLoading] = useState(false);

    const handleBasicPress = () => {
        Alert.alert('Button Pressed', 'Basic button was pressed!');
    };

    const handleLoadingPress = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            Alert.alert('Success', 'Operation completed!');
        }, 2000);
    };

    return (
        <MainContainer>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>SonnyButton Examples</Text>

                {/* Basic Variants */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Button Variants</Text>
                    
                    <SonnyButton
                        title="Primary Button"
                        onPress={handleBasicPress}
                        variant="primary"
                        containerStyle={styles.buttonSpacing}
                    />
                    
                    <SonnyButton
                        title="Secondary Button"
                        onPress={handleBasicPress}
                        variant="secondary"
                        containerStyle={styles.buttonSpacing}
                    />
                    
                    <SonnyButton
                        title="Outline Button"
                        onPress={handleBasicPress}
                        variant="outline"
                        containerStyle={styles.buttonSpacing}
                    />
                    
                    <SonnyButton
                        title="Danger Button"
                        onPress={handleBasicPress}
                        variant="danger"
                        containerStyle={styles.buttonSpacing}
                    />
                </View>

                {/* Button Sizes */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Button Sizes</Text>
                    
                    <SonnyButton
                        title="Small Button"
                        onPress={handleBasicPress}
                        size="small"
                        containerStyle={styles.buttonSpacing}
                    />
                    
                    <SonnyButton
                        title="Large Button"
                        onPress={handleBasicPress}
                        size="large"
                        containerStyle={styles.buttonSpacing}
                    />
                </View>

                {/* Loading States */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Loading States</Text>
                    
                    <SonnyButton
                        title="Loading Button"
                        onPress={handleLoadingPress}
                        loading={loading}
                        containerStyle={styles.buttonSpacing}
                    />
                </View>

                {/* Icons */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Buttons with Icons</Text>
                    
                    <SonnyButton
                        title="Save"
                        onPress={handleBasicPress}
                        icon="save"
                        iconPosition="left"
                        containerStyle={styles.buttonSpacing}
                    />
                    
                    <SonnyButton
                        title="Delete"
                        onPress={handleBasicPress}
                        icon="trash"
                        iconPosition="left"
                        variant="danger"
                        containerStyle={styles.buttonSpacing}
                    />
                </View>

                {/* Full Width */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Full Width Button</Text>
                    
                    <SonnyButton
                        title="Full Width Primary"
                        onPress={handleBasicPress}
                        fullWidth
                        containerStyle={styles.buttonSpacing}
                    />
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
    buttonSpacing: {
        marginBottom: 12,
    },
});

export default SonnyButtonExample;
