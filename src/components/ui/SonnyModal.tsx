import React from 'react';
import {
    View,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Platform,
    ViewStyle,
    Dimensions,
    ColorValue
} from 'react-native';
import { Colors } from '../../constants/colors';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface SonnyModalProps {
    /**
     * Controls the visibility of the modal
     */
    visible: boolean;
    /**
     * Callback when the modal is closed
     */
    onClose: () => void;
    /**
     * Custom content to render inside the modal
     */
    children: React.ReactNode;
    /**
     * Whether to show the close button
     * @default true
     */
    showCloseButton?: boolean;
    /**
     * Custom background gradient colors
     * @default ['#1a1a1a', '#121212']
     */
    gradientColors?: readonly string[];
    /**
     * Custom styles for the modal content container
     */
    contentContainerStyle?: ViewStyle;
    /**
     * Width of the modal as a percentage of screen width
     * @default 90
     */
    widthPercentage?: number;
}

/**
 * A customizable modal component with a clean design
 */
export const SonnyModal: React.FC<SonnyModalProps> = ({
    visible,
    onClose,
    children,
    showCloseButton = true,
    gradientColors = ['#ffffff', '#f8f9fa'],
    contentContainerStyle,
    widthPercentage = 90,
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <View style={styles.modalRoot}>
                <View style={styles.overlay}>
                    <TouchableOpacity
                        style={styles.overlayTouchable}
                        activeOpacity={1}
                        onPress={onClose}
                    />
                    <View style={[
                        styles.modalContainer,
                        { width: (SCREEN_WIDTH * widthPercentage) / 100 }
                    ]}>
                        <LinearGradient
                            colors={gradientColors}
                            style={[styles.modalContent, contentContainerStyle]}
                        >
                            {showCloseButton && (
                                <View style={styles.modalHeader}>
                                    <TouchableOpacity
                                        style={styles.closeButton}
                                        onPress={onClose}
                                    >
                                        <AntDesign name="close" size={20} color={Colors.black} />
                                    </TouchableOpacity>
                                </View>
                            )}
                            <View style={styles.contentContainer}>
                                {children}
                            </View>
                        </LinearGradient>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalRoot: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayTouchable: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    modalContainer: {
        backgroundColor: 'transparent',
    },
    modalContent: {
        borderRadius: 24,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: Colors.white,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    modalHeader: {
        alignItems: 'flex-end',
        padding: 16,
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        padding: 24,
    },
}); 