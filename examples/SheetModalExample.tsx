import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SonnySheetModal, Text } from '../src';
import { Colors } from '../src/constants/colors';

export const SheetModalExample = () => {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setVisible(true)}
            >
                <Text style={styles.buttonText}>Show Sheet Modal</Text>
            </TouchableOpacity>

            <SonnySheetModal
                visible={visible}
                onClose={() => setVisible(false)}
                minHeight={400}
            >
                <View style={styles.sheetContent}>
                    <Text style={styles.title}>Bottom Sheet</Text>
                    <Text style={styles.description}>
                        This is an example of the SonnySheetModal component.
                        It slides up from the bottom with smooth animations.
                    </Text>
                    <View style={styles.optionsList}>
                        <TouchableOpacity style={styles.option}>
                            <Text style={styles.optionText}>Option 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option}>
                            <Text style={styles.optionText}>Option 2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option}>
                            <Text style={styles.optionText}>Option 3</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SonnySheetModal>
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
    sheetContent: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 24,
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
        marginBottom: 32,
        color: Colors.grey,
        paddingHorizontal: 24,
    },
    optionsList: {
        width: '100%',
        paddingHorizontal: 16,
    },
    option: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    optionText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '500',
    },
}); 