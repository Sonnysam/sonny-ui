import React, { useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Platform,
    Animated,
    Dimensions,
    ViewStyle,
    ColorValue,
    DimensionValue,
    PanResponder
} from 'react-native';
import { Colors } from '../../constants/colors';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface SonnySheetModalProps {
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
     * @default ['#ffffff', '#f8f9fa']
     */
    gradientColors?: readonly string[];
    /**
     * Custom styles for the modal content container
     */
    contentContainerStyle?: ViewStyle;
    /**
     * Custom minimum height for the modal
     * @default 300
     */
    minHeight?: number;
    /**
     * Custom height for the modal. If provided, it will override minHeight
     * Can be a number (pixels) or a percentage string like '50%'
     */
    height?: DimensionValue;
    /**
     * Whether to show the drag handle at the top
     * @default true
     */
    showDragHandle?: boolean;
}

/**
 * A customizable bottom sheet modal component with smooth animations and drag gesture
 */
export const SonnySheetModal: React.FC<SonnySheetModalProps> = ({
    visible,
    onClose,
    children,
    showCloseButton = true,
    gradientColors = ['#ffffff', '#f8f9fa'],
    contentContainerStyle,
    minHeight = 300,
    height,
    showDragHandle = true,
}) => {
    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) {
                    translateY.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 100) {
                    handleClose();
                } else {
                    // Snap back to initial position
                    Animated.spring(translateY, {
                        toValue: 0,
                        useNativeDriver: true,
                        bounciness: 4,
                    }).start();
                }
            },
        })
    ).current;

    useEffect(() => {
        if (visible) {
            translateY.setValue(SCREEN_HEIGHT);
            opacity.setValue(0);

            Animated.parallel([
                Animated.spring(translateY, {
                    toValue: 0,
                    useNativeDriver: true,
                    bounciness: 8,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible]);

    const handleClose = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: SCREEN_HEIGHT,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onClose();
        });
    };

    // Calculate the height style
    const getHeightStyle = (): ViewStyle => {
        if (height !== undefined) {
            return { height };
        }
        return { minHeight };
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={handleClose}
            statusBarTranslucent
        >
            <View style={styles.modalRoot}>
                <Animated.View style={[styles.overlay, { opacity }]}>
                    <TouchableOpacity
                        style={styles.overlayTouchable}
                        activeOpacity={1}
                        onPress={handleClose}
                    />
                    <Animated.View
                        style={[
                            styles.modalContainer,
                            { transform: [{ translateY }] }
                        ]}
                    >
                        <LinearGradient
                            colors={gradientColors}
                            style={[
                                styles.modalContent,
                                getHeightStyle(),
                                contentContainerStyle
                            ]}
                            {...panResponder.panHandlers}
                        >
                            {showDragHandle && (
                                <View style={styles.dragHandle} />
                            )}
                            {showCloseButton && (
                                <View style={styles.modalHeader}>
                                    <TouchableOpacity
                                        style={styles.closeButton}
                                        onPress={handleClose}
                                    >
                                        <AntDesign name="close" size={20} color={Colors.black} />
                                    </TouchableOpacity>
                                </View>
                            )}
                            <View style={styles.contentContainer}>
                                {children}
                            </View>
                        </LinearGradient>
                    </Animated.View>
                </Animated.View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    overlayTouchable: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    modalContainer: {
        width: '100%',
        backgroundColor: 'transparent',
    },
    modalContent: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingBottom: Platform.OS === 'ios' ? 40 : 30,
        backgroundColor: Colors.white,
        ...Platform.select({
            ios: {
                shadowColor: Colors.black,
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    dragHandle: {
        width: 40,
        height: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 2,
        alignSelf: 'center',
        marginTop: 12,
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
        flex: 1,
        paddingHorizontal: 24,
    },
}); 