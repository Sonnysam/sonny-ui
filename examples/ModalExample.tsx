import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SonnyModal, Text } from '../src';
import { Colors } from '../src/constants/colors';

export const ModalExample = () => {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setVisible(true)}
            >
                <Text style={styles.buttonText}>Show Modal</Text>
            </TouchableOpacity>

            <SonnyModal
                visible={visible}
                onClose={() => setVisible(false)}
                widthPercentage={90}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Welcome!</Text>
                    <Text style={styles.description}>
                        This is an example of the SonnyModal component.
                        It's a customizable modal with a clean design.
                    </Text>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setVisible(false)}
                    >
                        <Text style={styles.closeButtonText}>Close Modal</Text>
                    </TouchableOpacity>
                </View>
            </SonnyModal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    button: {
        backgroundColor: Colors.black,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    modalContent: {
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 16,
        color: Colors.white,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
        color: Colors.grey,
    },
    closeButton: {
        backgroundColor: Colors.error,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
    },
    closeButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
}); 