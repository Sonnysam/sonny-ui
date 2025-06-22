import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import { Colors } from '../../constants/colors';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface ToastConfig {
    /** The main message to display */
    message: string;
    /** Optional title for the toast */
    title?: string;
    /** Type of toast which determines color and icon */
    type?: 'success' | 'error' | 'warning' | 'info';
    /** Duration in milliseconds */
    duration?: number;
    /** Position of the toast */
    position?: 'top' | 'bottom';
    /** Custom icon name from AntDesign or MaterialIcons */
    icon?: string;
    /** Custom background color */
    backgroundColor?: string;
    /** Custom text color */
    textColor?: string;
    /** Callback when toast is hidden */
    onHide?: () => void;
}

interface ToastProps extends ToastConfig {
    visible: boolean;
}

const Toast: React.FC<ToastProps> = ({
    message,
    title,
    type = 'info',
    duration = 3000,
    position = 'bottom',
    icon,
    backgroundColor,
    textColor,
    onHide,
    visible
}) => {
    const [fadeAnim] = useState(new Animated.Value(0));
    const [slideAnim] = useState(new Animated.Value(position === 'top' ? -100 : 100));
    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (visible) {
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

            const timer = setTimeout(() => {
                hideToast();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [visible, duration]);

    const hideToast = () => {
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
    };

    const getTypeConfig = () => {
        switch (type) {
            case 'success':
                return {
                    borderColor: Colors.success,
                    iconColor: Colors.success,
                    icon: icon || 'check-circle',
                    iconSet: 'AntDesign' as const
                };
            case 'error':
                return {
                    borderColor: Colors.error,
                    iconColor: Colors.error,
                    icon: icon || 'close-circle',
                    iconSet: 'AntDesign' as const
                };
            case 'warning':
                return {
                    borderColor: Colors.warning,
                    iconColor: Colors.warning,
                    icon: icon || 'warning',
                    iconSet: 'AntDesign' as const
                };
            case 'info':
            default:
                return {
                    borderColor: Colors.info,
                    iconColor: Colors.info,
                    icon: icon || 'info-circle',
                    iconSet: 'AntDesign' as const
                };
        }
    };

    const config = getTypeConfig();
    const finalTextColor = textColor || Colors.black;
    const finalBackgroundColor = backgroundColor || Colors.white;

    if (!visible) return null;

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                    backgroundColor: finalBackgroundColor,
                    borderColor: config.borderColor,
                    [position]: position === 'top'
                        ? insets.top + 10
                        : insets.bottom + 10,
                }
            ]}
        >
            <View style={styles.content}>
                {config.iconSet === 'AntDesign' ? (
                    <AntDesign
                        name={config.icon as any}
                        size={18}
                        color={config.iconColor}
                        style={styles.icon}
                    />
                ) : (
                    <MaterialIcons
                        name={config.icon as any}
                        size={18}
                        color={config.iconColor}
                        style={styles.icon}
                    />
                )}
                <View style={styles.textContainer}>
                    {title && (
                        <Text style={[styles.title, { color: finalTextColor }]}>
                            {title}
                        </Text>
                    )}
                    <Text style={[styles.message, { color: finalTextColor }]}>
                        {message}
                    </Text>
                </View>
            </View>
        </Animated.View>
    );
};

// Toast manager
class ToastManager {
    private static instance: ToastManager;
    private toastComponent: React.ComponentType<any> | null = null;
    private showToastCallback: ((config: ToastConfig) => void) | null = null;

    static getInstance(): ToastManager {
        if (!ToastManager.instance) {
            ToastManager.instance = new ToastManager();
        }
        return ToastManager.instance;
    }

    setShowToastCallback(callback: (config: ToastConfig) => void) {
        this.showToastCallback = callback;
    }

    show(config: ToastConfig) {
        if (this.showToastCallback) {
            this.showToastCallback(config);
        }
    }
}

const toastManager = ToastManager.getInstance();

/**
 * Show a toast notification
 * @param config Toast configuration
 */
export const showToast = (config: ToastConfig) => {
    toastManager.show(config);
};

/**
 * Toast Provider Component - Add this to your app root or screen
 */
export const SonnyToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toastConfig, setToastConfig] = useState<ToastConfig | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        toastManager.setShowToastCallback((config: ToastConfig) => {
            setToastConfig(config);
            setVisible(true);
        });
    }, []);

    const handleHide = () => {
        setVisible(false);
        if (toastConfig?.onHide) {
            toastConfig.onHide();
        }
    };

    return (
        <>
            {children}
            {toastConfig && (
                <Toast
                    {...toastConfig}
                    visible={visible}
                    onHide={handleHide}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 16,
        right: 16,
        borderRadius: 8,
        borderWidth: 1,
        zIndex: 9999,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 14,
    },
    icon: {
        marginRight: 10,
        marginTop: 1,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2,
        lineHeight: 18,
    },
    message: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 18,
    },
}); 