import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    TouchableOpacityProps,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

export interface SonnyBackButtonProps extends Omit<TouchableOpacityProps, 'style'> {
    /** Callback when button is pressed. If not provided, uses default navigation back */
    onPress?: () => void;
    /** Color of the icon */
    iconColor?: string;
    /** Size of the icon */
    iconSize?: number;
    /** Custom styles for the button container */
    containerStyle?: ViewStyle;
    /** Background color of the button */
    backgroundColor?: string;
    /** Button variant style */
    variant?: 'default' | 'circle' | 'square' | 'rounded' | 'minimal' | 'ios' | 'android';
    /** Size of the button */
    size?: 'small' | 'medium' | 'large';
    /** Icon to display */
    icon?: keyof typeof Ionicons.glyphMap;
    /** Whether to show shadow */
    shadow?: boolean;
    /** Custom shadow style */
    shadowStyle?: ViewStyle;
    /** Border color */
    borderColor?: string;
    /** Border width */
    borderWidth?: number;
    /** Custom border radius */
    borderRadius?: number;
    /** Whether button is disabled */
    disabled?: boolean;
    /** Padding inside the button */
    padding?: number;
    /** Margin around the button */
    margin?: number;
    /** Opacity when pressed */
    activeOpacity?: number;
    /** Position absolute styles */
    position?: 'absolute';
    /** Top position when absolute */
    top?: number;
    /** Left position when absolute */
    left?: number;
    /** Right position when absolute */
    right?: number;
    /** Bottom position when absolute */
    bottom?: number;
    /** z-index for absolute positioning */
    zIndex?: number;
}

/**
 * A fully customizable back button component with multiple variants, platform-specific
 * styling, and extensive customization options. Automatically handles navigation back
 * functionality while allowing custom onPress handlers.
 */
export const SonnyBackButton: React.FC<SonnyBackButtonProps> = ({
    onPress,
    iconColor,
    iconSize,
    containerStyle,
    backgroundColor,
    variant = 'default',
    size = 'medium',
    icon,
    shadow = false,
    shadowStyle,
    borderColor,
    borderWidth,
    borderRadius,
    disabled = false,
    padding,
    margin,
    activeOpacity = 0.7,
    position,
    top,
    left,
    right,
    bottom,
    zIndex,
    ...touchableProps
}) => {
    // Get variant and size styles
    const variantStyles = getVariantStyles(variant);
    const sizeStyles = getSizeStyles(size);

    // Determine colors and sizes
    const finalBackgroundColor = backgroundColor || variantStyles.backgroundColor;
    const finalIconColor = iconColor || variantStyles.iconColor;
    const finalIconSize = iconSize || sizeStyles.iconSize;
    const finalBorderRadius = borderRadius !== undefined ? borderRadius : variantStyles.borderRadius;
    const finalPadding = padding !== undefined ? padding : sizeStyles.padding;

    // Determine icon based on variant and platform
    const getIcon = (): keyof typeof Ionicons.glyphMap => {
        if (icon) return icon;

        switch (variant) {
            case 'ios':
                return 'chevron-back';
            case 'android':
                return 'arrow-back';
            case 'minimal':
                return 'chevron-back';
            default:
                return Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back';
        }
    };

    const handlePress = () => {
        if (disabled) return;

        if (onPress) {
            onPress();
        } else {
            // Default navigation back - can be customized based on navigation library
            console.warn('SonnyBackButton: No onPress handler provided. Please provide an onPress function for navigation.');
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                sizeStyles.containerStyle,
                variantStyles.containerStyle,
                {
                    backgroundColor: finalBackgroundColor,
                    borderColor: borderColor || variantStyles.borderColor,
                    borderWidth: borderWidth !== undefined ? borderWidth : variantStyles.borderWidth,
                    borderRadius: finalBorderRadius,
                    padding: finalPadding,
                    margin: margin || 0,
                    opacity: disabled ? 0.5 : 1,
                    position: position,
                    top: top,
                    left: left,
                    right: right,
                    bottom: bottom,
                    zIndex: zIndex,
                },
                shadow && (shadowStyle || styles.shadow),
                containerStyle,
            ]}
            onPress={handlePress}
            disabled={disabled}
            activeOpacity={activeOpacity}
            {...touchableProps}
        >
            <Ionicons
                name={getIcon()}
                size={finalIconSize}
                color={finalIconColor}
            />
        </TouchableOpacity>
    );
};

// Helper functions
const getVariantStyles = (variant: SonnyBackButtonProps['variant']) => {
    switch (variant) {
        case 'circle':
            return {
                backgroundColor: Colors.white,
                iconColor: Colors.black,
                borderColor: Colors.grey + '30',
                borderWidth: 1,
                borderRadius: 50,
                containerStyle: {},
            };
        case 'square':
            return {
                backgroundColor: Colors.white,
                iconColor: Colors.black,
                borderColor: Colors.grey + '30',
                borderWidth: 1,
                borderRadius: 0,
                containerStyle: {},
            };
        case 'rounded':
            return {
                backgroundColor: Colors.white,
                iconColor: Colors.black,
                borderColor: Colors.grey + '30',
                borderWidth: 1,
                borderRadius: 12,
                containerStyle: {},
            };
        case 'minimal':
            return {
                backgroundColor: 'transparent',
                iconColor: Colors.black,
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 8,
                containerStyle: {},
            };
        case 'ios':
            return {
                backgroundColor: 'transparent',
                iconColor: Colors.info,
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 8,
                containerStyle: {},
            };
        case 'android':
            return {
                backgroundColor: 'transparent',
                iconColor: Colors.black,
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 50,
                containerStyle: {},
            };
        case 'default':
        default:
            return {
                backgroundColor: Colors.info,
                iconColor: Colors.white,
                borderColor: Colors.info,
                borderWidth: 0,
                borderRadius: 8,
                containerStyle: {},
            };
    }
};

const getSizeStyles = (size: SonnyBackButtonProps['size']) => {
    switch (size) {
        case 'small':
            return {
                containerStyle: {
                    width: 32,
                    height: 32,
                },
                iconSize: 18,
                padding: 6,
            };
        case 'large':
            return {
                containerStyle: {
                    width: 48,
                    height: 48,
                },
                iconSize: 28,
                padding: 10,
            };
        case 'medium':
        default:
            return {
                containerStyle: {
                    width: 40,
                    height: 40,
                },
                iconSize: 24,
                padding: 8,
            };
    }
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
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

export default SonnyBackButton;
