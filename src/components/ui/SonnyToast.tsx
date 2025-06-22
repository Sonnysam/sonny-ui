import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import { Colors } from '../../constants/colors';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Simple ID generator for React Native
const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export interface ToastConfig {
    type?: 'success' | 'error' | 'info' | 'warning';
    title?: string;
    message: string;
    duration?: number;
    position?: 'top' | 'bottom';
    icon?: React.ReactNode;
    backgroundColor?: string;
    textColor?: string;
    onHide?: () => void;
}

interface ToastItem extends ToastConfig {
    id: string;
}

// Event system for showing toasts
let toastSubscribers: ((config: ToastConfig) => void)[] = [];

export const showToast = (config: ToastConfig) => {
    toastSubscribers.forEach(subscriber => subscriber(config));
};

const addToastListener = (callback: (config: ToastConfig) => void) => {
    toastSubscribers.push(callback);
    return {
        remove: () => {
            toastSubscribers = toastSubscribers.filter(sub => sub !== callback);
        }
    };
};

const Toast: React.FC<ToastConfig> = ({
    message,
    title,
    type = 'info',
    duration = 3000,
    position = 'bottom',
    icon,
    backgroundColor,
    textColor,
    onHide
}) => {
    const [fadeAnim] = useState(new Animated.Value(0));
    const [slideAnim] = useState(new Animated.Value(position === 'top' ? -100 : 100));

    useEffect(() => {
        // Show animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();

        // Hide after duration
        const timer = setTimeout(() => {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: position === 'top' ? -100 : 100,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                if (onHide) onHide();
            });
        }, duration);

        return () => clearTimeout(timer);
    }, []);

    const getIcon = () => {
        if (icon) return icon;
        switch (type) {
            case 'success':
                return <MaterialIcons name="check-circle" size={24} color={Colors.white} />;
            case 'error':
                return <MaterialIcons name="error" size={24} color={Colors.white} />;
            case 'warning':
                return <MaterialIcons name="warning" size={24} color={Colors.white} />;
            default:
                return <AntDesign name="infocirlce" size={24} color={Colors.white} />;
        }
    };

    const getBackgroundColor = () => {
        if (backgroundColor) return backgroundColor;
        switch (type) {
            case 'success':
                return Colors.success;
            case 'error':
                return Colors.error;
            case 'warning':
                return Colors.warning;
            default:
                return Colors.info;
        }
    };

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                    backgroundColor: getBackgroundColor(),
                },
            ]}
        >
            <View style={styles.iconContainer}>{getIcon()}</View>
            <View style={styles.textContainer}>
                {title && <Text style={[styles.title, textColor ? { color: textColor } : null]}>{title}</Text>}
                <Text style={[styles.message, textColor ? { color: textColor } : null]}>{message}</Text>
            </View>
        </Animated.View>
    );
};

export const SonnyToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    // Safe way to get insets with fallback
    let insets = { top: 0, bottom: 0, left: 0, right: 0 };
    try {
        insets = useSafeAreaInsets();
    } catch (error) {
        console.warn('SonnyToast: Safe area context not available, using fallback values');
        // Use platform-specific fallbacks
        insets = {
            top: Platform.OS === 'ios' ? 44 : 24,
            bottom: Platform.OS === 'ios' ? 34 : 0,
            left: 0,
            right: 0
        };
    }

    useEffect(() => {
        // Subscribe to toast events
        const showSubscription = addToastListener((toast) => {
            setToasts((currentToasts) => [...currentToasts, { ...toast, id: generateId() }]);
        });

        return () => {
            showSubscription.remove();
        };
    }, []);

    const handleHide = (id: string) => {
        setToasts((currentToasts) => currentToasts.filter(toast => toast.id !== id));
    };

    return (
        <>
            {children}
            <View style={[styles.toastContainer, { top: insets.top + 10 }]}>
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        {...toast}
                        onHide={() => handleHide(toast.id)}
                    />
                ))}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 16,
        borderRadius: 12,
        ...Platform.select({
            ios: {
                shadowColor: Colors.black,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    iconContainer: {
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    message: {
        color: Colors.white,
        fontSize: 14,
        lineHeight: 18,
    },
    toastContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 9999,
    },
}); 