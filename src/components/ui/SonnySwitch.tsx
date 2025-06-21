import React, { useRef, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Animated,
    StyleSheet,
    ViewStyle,
    TextStyle,
    TouchableOpacityProps,
    Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from './Text';
import { Colors } from '../../constants/colors';

export interface SonnySwitchProps extends Omit<TouchableOpacityProps, 'style'> {
    /** Current switch state */
    value: boolean;
    /** Callback when switch is toggled */
    onValueChange: (value: boolean) => void;
    /** Whether the switch is disabled */
    disabled?: boolean;
    /** Size of the switch */
    size?: 'small' | 'medium' | 'large';
    /** Switch variant style */
    variant?: 'default' | 'ios' | 'material' | 'rounded' | 'square' | 'outline';
    /** Custom track color when switch is on */
    trackColorOn?: string;
    /** Custom track color when switch is off */
    trackColorOff?: string;
    /** Custom thumb color when switch is on */
    thumbColorOn?: string;
    /** Custom thumb color when switch is off */
    thumbColorOff?: string;
    /** Icon to show when switch is on */
    iconOn?: keyof typeof Ionicons.glyphMap;
    /** Icon to show when switch is off */
    iconOff?: keyof typeof Ionicons.glyphMap;
    /** Color of the icon when on */
    iconColorOn?: string;
    /** Color of the icon when off */
    iconColorOff?: string;
    /** Size of the icons */
    iconSize?: number;
    /** Label text for the switch */
    label?: string;
    /** Position of the label relative to switch */
    labelPosition?: 'left' | 'right' | 'top' | 'bottom';
    /** Custom styles for the label */
    labelStyle?: TextStyle;
    /** Custom styles for the switch container */
    containerStyle?: ViewStyle;
    /** Custom styles for the track */
    trackStyle?: ViewStyle;
    /** Custom styles for the thumb */
    thumbStyle?: ViewStyle;
    /** Animation duration in milliseconds */
    animationDuration?: number;
    /** Custom border width */
    borderWidth?: number;
    /** Custom border color when on */
    borderColorOn?: string;
    /** Custom border color when off */
    borderColorOff?: string;
    /** Whether to show shadow */
    shadow?: boolean;
    /** Custom shadow style */
    shadowStyle?: ViewStyle;
    /** Custom track width */
    trackWidth?: number;
    /** Custom track height */
    trackHeight?: number;
    /** Custom thumb size */
    thumbSize?: number;
    /** Padding around the thumb */
    thumbPadding?: number;
}

/**
 * A fully customizable switch component with multiple variants, icon support,
 * labels, and extensive styling options. Built for React Native/Expo apps.
 */
export const SonnySwitch: React.FC<SonnySwitchProps> = ({
    value,
    onValueChange,
    disabled = false,
    size = 'medium',
    variant = 'default',
    trackColorOn,
    trackColorOff,
    thumbColorOn,
    thumbColorOff,
    iconOn,
    iconOff,
    iconColorOn,
    iconColorOff,
    iconSize,
    label,
    labelPosition = 'right',
    labelStyle,
    containerStyle,
    trackStyle,
    thumbStyle,
    animationDuration = 200,
    borderWidth,
    borderColorOn,
    borderColorOff,
    shadow = false,
    shadowStyle,
    trackWidth,
    trackHeight,
    thumbSize,
    thumbPadding,
    ...touchableProps
}) => {
    const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

    // Get variant and size styles
    const variantStyles = getVariantStyles(variant);
    const sizeStyles = getSizeStyles(size);

    // Calculate dimensions
    const finalTrackWidth = trackWidth || sizeStyles.trackWidth;
    const finalTrackHeight = trackHeight || sizeStyles.trackHeight;
    const finalThumbSize = thumbSize || sizeStyles.thumbSize;
    const finalThumbPadding = thumbPadding !== undefined ? thumbPadding : sizeStyles.thumbPadding;
    const finalIconSize = iconSize || sizeStyles.iconSize;

    // Calculate colors
    const finalTrackColorOn = trackColorOn || variantStyles.trackColorOn;
    const finalTrackColorOff = trackColorOff || variantStyles.trackColorOff;
    const finalThumbColorOn = thumbColorOn || variantStyles.thumbColorOn;
    const finalThumbColorOff = thumbColorOff || variantStyles.thumbColorOff;
    const finalBorderColorOn = borderColorOn || variantStyles.borderColorOn;
    const finalBorderColorOff = borderColorOff || variantStyles.borderColorOff;
    const finalBorderWidth = borderWidth !== undefined ? borderWidth : variantStyles.borderWidth;

    // Animation
    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: value ? 1 : 0,
            duration: animationDuration,
            easing: Easing.bezier(0.4, 0.0, 0.2, 1),
            useNativeDriver: false,
        }).start();
    }, [value, animationDuration]);

    // Interpolated values
    const thumbTranslateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [finalThumbPadding, finalTrackWidth - finalThumbSize - finalThumbPadding],
    });

    const trackBackgroundColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [finalTrackColorOff, finalTrackColorOn],
    });

    const thumbBackgroundColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [finalThumbColorOff, finalThumbColorOn],
    });

    const borderColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [finalBorderColorOff, finalBorderColorOn],
    });

    const handlePress = () => {
        if (!disabled) {
            onValueChange(!value);
        }
    };

    // Render icons
    const renderIcon = () => {
        if (!iconOn && !iconOff) return null;

        const currentIcon = value ? iconOn : iconOff;
        if (!currentIcon) return null;

        const currentIconColor = value
            ? (iconColorOn || variantStyles.iconColorOn)
            : (iconColorOff || variantStyles.iconColorOff);

        return (
            <Ionicons
                name={currentIcon}
                size={finalIconSize}
                color={currentIconColor}
                style={styles.icon}
            />
        );
    };

    // Render switch
    const renderSwitch = () => (
        <TouchableOpacity
            style={[
                styles.switchContainer,
                {
                    width: finalTrackWidth,
                    height: finalTrackHeight,
                    opacity: disabled ? 0.5 : 1,
                },
                containerStyle,
            ]}
            onPress={handlePress}
            disabled={disabled}
            activeOpacity={0.8}
            {...touchableProps}
        >
            <Animated.View
                style={[
                    styles.track,
                    variantStyles.trackStyle,
                    {
                        width: finalTrackWidth,
                        height: finalTrackHeight,
                        backgroundColor: trackBackgroundColor,
                        borderColor: borderColor,
                        borderWidth: finalBorderWidth,
                    },
                    shadow && (shadowStyle || styles.shadow),
                    trackStyle,
                ]}
            >
                <Animated.View
                    style={[
                        styles.thumb,
                        variantStyles.thumbStyle,
                        {
                            width: finalThumbSize,
                            height: finalThumbSize,
                            backgroundColor: thumbBackgroundColor,
                            transform: [{ translateX: thumbTranslateX }],
                        },
                        thumbStyle,
                    ]}
                >
                    {renderIcon()}
                </Animated.View>
            </Animated.View>
        </TouchableOpacity>
    );

    // Render with label
    if (label) {
        const switchElement = renderSwitch();
        const labelElement = (
            <Text style={[styles.label, sizeStyles.labelStyle, labelStyle] as any}>
                {label}
            </Text>
        );

        switch (labelPosition) {
            case 'left':
                return (
                    <View style={[styles.horizontalContainer, containerStyle]}>
                        {labelElement}
                        {switchElement}
                    </View>
                );
            case 'top':
                return (
                    <View style={[styles.verticalContainer, containerStyle]}>
                        {labelElement}
                        {switchElement}
                    </View>
                );
            case 'bottom':
                return (
                    <View style={[styles.verticalContainer, containerStyle]}>
                        {switchElement}
                        {labelElement}
                    </View>
                );
            case 'right':
            default:
                return (
                    <View style={[styles.horizontalContainer, containerStyle]}>
                        {switchElement}
                        {labelElement}
                    </View>
                );
        }
    }

    return renderSwitch();
};

// Helper functions
const getVariantStyles = (variant: SonnySwitchProps['variant']) => {
    switch (variant) {
        case 'ios':
            return {
                trackColorOn: Colors.success,
                trackColorOff: Colors.grey + '40',
                thumbColorOn: Colors.white,
                thumbColorOff: Colors.white,
                borderColorOn: Colors.success,
                borderColorOff: Colors.grey + '40',
                borderWidth: 0,
                iconColorOn: Colors.success,
                iconColorOff: Colors.grey,
                trackStyle: {
                    borderRadius: 50,
                },
                thumbStyle: {
                    borderRadius: 50,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                },
            };
        case 'material':
            return {
                trackColorOn: Colors.info + '80',
                trackColorOff: Colors.grey + '40',
                thumbColorOn: Colors.info,
                thumbColorOff: Colors.white,
                borderColorOn: Colors.info + '80',
                borderColorOff: Colors.grey + '40',
                borderWidth: 0,
                iconColorOn: Colors.white,
                iconColorOff: Colors.grey,
                trackStyle: {
                    borderRadius: 50,
                },
                thumbStyle: {
                    borderRadius: 50,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                },
            };
        case 'rounded':
            return {
                trackColorOn: Colors.info,
                trackColorOff: Colors.grey + '30',
                thumbColorOn: Colors.white,
                thumbColorOff: Colors.white,
                borderColorOn: Colors.info,
                borderColorOff: Colors.grey,
                borderWidth: 1,
                iconColorOn: Colors.info,
                iconColorOff: Colors.grey,
                trackStyle: {
                    borderRadius: 12,
                },
                thumbStyle: {
                    borderRadius: 8,
                },
            };
        case 'square':
            return {
                trackColorOn: Colors.info,
                trackColorOff: Colors.grey + '30',
                thumbColorOn: Colors.white,
                thumbColorOff: Colors.white,
                borderColorOn: Colors.info,
                borderColorOff: Colors.grey,
                borderWidth: 1,
                iconColorOn: Colors.info,
                iconColorOff: Colors.grey,
                trackStyle: {
                    borderRadius: 4,
                },
                thumbStyle: {
                    borderRadius: 2,
                },
            };
        case 'outline':
            return {
                trackColorOn: 'transparent',
                trackColorOff: 'transparent',
                thumbColorOn: Colors.info,
                thumbColorOff: Colors.grey,
                borderColorOn: Colors.info,
                borderColorOff: Colors.grey,
                borderWidth: 2,
                iconColorOn: Colors.white,
                iconColorOff: Colors.white,
                trackStyle: {
                    borderRadius: 50,
                },
                thumbStyle: {
                    borderRadius: 50,
                },
            };
        case 'default':
        default:
            return {
                trackColorOn: Colors.info,
                trackColorOff: Colors.grey + '40',
                thumbColorOn: Colors.white,
                thumbColorOff: Colors.white,
                borderColorOn: Colors.info,
                borderColorOff: Colors.grey,
                borderWidth: 0,
                iconColorOn: Colors.info,
                iconColorOff: Colors.grey,
                trackStyle: {
                    borderRadius: 50,
                },
                thumbStyle: {
                    borderRadius: 50,
                },
            };
    }
};

const getSizeStyles = (size: SonnySwitchProps['size']) => {
    switch (size) {
        case 'small':
            return {
                trackWidth: 40,
                trackHeight: 24,
                thumbSize: 18,
                thumbPadding: 3,
                iconSize: 12,
                labelStyle: {
                    fontSize: 14,
                    marginHorizontal: 8,
                    marginVertical: 4,
                },
            };
        case 'large':
            return {
                trackWidth: 64,
                trackHeight: 36,
                thumbSize: 28,
                thumbPadding: 4,
                iconSize: 18,
                labelStyle: {
                    fontSize: 18,
                    marginHorizontal: 12,
                    marginVertical: 6,
                },
            };
        case 'medium':
        default:
            return {
                trackWidth: 52,
                trackHeight: 30,
                thumbSize: 22,
                thumbPadding: 4,
                iconSize: 14,
                labelStyle: {
                    fontSize: 16,
                    marginHorizontal: 10,
                    marginVertical: 5,
                },
            };
    }
};

const styles = StyleSheet.create({
    switchContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    track: {
        justifyContent: 'center',
        position: 'relative',
    },
    thumb: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        textAlign: 'center',
    },
    label: {
        color: Colors.black,
        fontWeight: '500',
    },
    horizontalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    verticalContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default SonnySwitch;
