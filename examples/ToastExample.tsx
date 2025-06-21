import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SonnyToastProvider, showToast } from '../src/components/ui/SonnyToast';
import { Text } from '../src';
import { Colors } from '../src/constants/colors';

export const ToastExample = () => {
    const showSuccessToast = () => {
        showToast({
            message: 'Operation completed successfully!',
            title: 'Success',
            type: 'success',
            position: 'top',
            duration: 3000,
        });
    };

    const showErrorToast = () => {
        showToast({
            message: 'Something went wrong. Please try again.',
            title: 'Error',
            type: 'error',
            position: 'bottom',
            duration: 4000,
        });
    };

    const showWarningToast = () => {
        showToast({
            message: 'Please check your internet connection.',
            type: 'warning',
            position: 'top',
            duration: 3500,
        });
    };

    const showInfoToast = () => {
        showToast({
            message: 'New update available in the app store.',
            title: 'Info',
            type: 'info',
            position: 'bottom',
            duration: 5000,
        });
    };

    const showCustomToast = () => {
        showToast({
            message: 'This is a custom styled toast!',
            title: 'Custom',
            backgroundColor: '#8B5CF6',
            textColor: Colors.white,
            icon: 'star',
            position: 'top',
            duration: 3000,
        });
    };

    return (
        <SonnyToastProvider>
            <View style={styles.container}>
                <Text style={styles.title}>Toast Examples</Text>
                <Text style={styles.description}>
                    Tap the buttons below to see different toast types
                </Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: Colors.success }]} onPress={showSuccessToast}>
                        <Text style={styles.buttonText}>Success Toast (Top)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, { backgroundColor: Colors.error }]} onPress={showErrorToast}>
                        <Text style={styles.buttonText}>Error Toast (Bottom)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, { backgroundColor: Colors.warning }]} onPress={showWarningToast}>
                        <Text style={styles.buttonText}>Warning Toast (Top)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, { backgroundColor: Colors.info }]} onPress={showInfoToast}>
                        <Text style={styles.buttonText}>Info Toast (Bottom)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, { backgroundColor: '#8B5CF6' }]} onPress={showCustomToast}>
                        <Text style={styles.buttonText}>Custom Toast</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SonnyToastProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: Colors.white,
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
    buttonContainer: {
        width: '100%',
        gap: 16,
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
}); 