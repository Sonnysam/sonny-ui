import React from 'react';
import {
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    ViewStyle,
    TextStyle,
    TouchableOpacityProps,
    View,
} from 'react-native';
import { Text } from './Text';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

export interface SonnyButtonProps extends Omit<TouchableOpacityProps, 'style'> {
    /** Button text or content */
    title?: string | React.ReactNode;
    /** Callback when button is pressed */
    onPress: () => void;
    /** Button variant style */
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning';
    /** Button size */
    size?: 'small' | 'medium' | 'large';
    /** Whether the button is in loading state */
    loading?: boolean;
    /** Whether the button is disabled */
    disabled?: boolean;
    /** Icon name from Ionicons to display */
    icon?: keyof typeof Ionicons.glyphMap;
    /** Icon position relative to text */
    iconPosition?: 'left' | 'right' | 'top' | 'bottom';
    /** Custom icon component */
    iconComponent?: React.ReactNode;
    /** Size of the icon */
    iconSize?: number;
    /** Color of the icon */
    iconColor?: string;
    /** Whether to show only icon (no text) */
    iconOnly?: boolean;
    /** Custom loading indicator */
    loadingIndicator?: React.ReactNode;
    /** Color of the loading indicator */
    loadingColor?: string;
    /** Custom styles for the button container */
    containerStyle?: ViewStyle;
    /** Custom styles for the button text */
    textStyle?: TextStyle;
    /** Custom background color */
    backgroundColor?: string;
    /** Custom text color */
    textColor?: string;
    /** Custom border color */
    borderColor?: string;
    /** Custom border width */
    borderWidth?: number;
    /** Custom border radius */
    borderRadius?: number;
    /** Custom padding */
    padding?: number;
    /** Custom margin */
    margin?: number;
    /** Whether button should take full width */
    fullWidth?: boolean;
    /** Minimum height of the button */
    minHeight?: number;
    /** Shadow configuration */
    shadow?: boolean;
    /** Custom shadow style */
    shadowStyle?: ViewStyle;
}

/**
 * A fully customizable button component with multiple variants, loading states,
 * icon support, and extensive styling options.
 */
export const SonnyButton: React.FC<SonnyButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    loading = false,
    disabled = false,
    icon,
    iconPosition = 'left',
    iconComponent,
    iconSize,
    iconColor,
    iconOnly = false,
    loadingIndicator,
    loadingColor,
    containerStyle,
    textStyle,
    backgroundColor,
    textColor,
    borderColor,
    borderWidth,
    borderRadius,
    padding,
    margin,
    fullWidth = false,
    minHeight,
    shadow = false,
    shadowStyle,
    ...touchableProps
}) => {
    // Get variant styles
    const variantStyles = getVariantStyles(variant);
    const sizeStyles = getSizeStyles(size);
    
    // Determine if button should be disabled
    const isDisabled = disabled || loading;
    
    // Get colors based on variant and state
    const buttonBackgroundColor = backgroundColor || 
        (isDisabled ? variantStyles.disabledBackgroundColor : variantStyles.backgroundColor);
    const buttonTextColor = textColor || 
        (isDisabled ? variantStyles.disabledTextColor : variantStyles.textColor);
    const buttonBorderColor = borderColor || variantStyles.borderColor;
    
    // Icon configuration
    const finalIconSize = iconSize || sizeStyles.iconSize;
    const finalIconColor = iconColor || buttonTextColor;
    
    // Loading indicator
    const renderLoadingIndicator = () => {
        if (loadingIndicator) {
            return loadingIndicator;
        }
        return (
            <ActivityIndicator
                size={sizeStyles.loadingSize}
                color={loadingColor || buttonTextColor}
            />
        );
    };
    
    // Icon rendering
    const renderIcon = () => {
        if (iconComponent) {
            return iconComponent;
        }
        if (icon) {
            return (
                <Ionicons
                    name={icon}
                    size={finalIconSize}
                    color={finalIconColor}
                />
            );
        }
        return null;
    };
    
    // Content rendering based on layout
    const renderContent = () => {
        if (loading) {
            return (
                <View style={styles.loadingContainer}>
                    {renderLoadingIndicator()}
                    {!iconOnly && (
                        <Text style={[
                            styles.loadingText,
                            sizeStyles.textStyle,
                            { color: buttonTextColor, marginLeft: 8 }
                        ] as any}>
                            Loading...
                        </Text>
                    )}
                </View>
            );
        }
        
        if (iconOnly) {
            return renderIcon();
        }
        
        const iconElement = renderIcon();
        const textElement = title && (
            <Text style={[
                sizeStyles.textStyle,
                { color: buttonTextColor },
                textStyle,
                iconElement && getIconSpacing(iconPosition)
            ] as any}>
                {title}
            </Text>
        );
        
        if (!iconElement) {
            return textElement;
        }
        
        // Arrange icon and text based on position
        switch (iconPosition) {
            case 'right':
                return (
                    <View style={styles.horizontalContent}>
                        {textElement}
                        {iconElement}
                    </View>
                );
            case 'top':
                return (
                    <View style={styles.verticalContent}>
                        {iconElement}
                        {textElement}
                    </View>
                );
            case 'bottom':
                return (
                    <View style={styles.verticalContent}>
                        {textElement}
                        {iconElement}
                    </View>
                );
            case 'left':
            default:
                return (
                    <View style={styles.horizontalContent}>
                        {iconElement}
                        {textElement}
                    </View>
                );
        }
    };
    
    return (
        <TouchableOpacity
            style={[
                styles.button,
                sizeStyles.containerStyle,
                {
                    backgroundColor: buttonBackgroundColor,
                    borderColor: buttonBorderColor,
                    borderWidth: borderWidth || variantStyles.borderWidth,
                    borderRadius: borderRadius || sizeStyles.borderRadius,
                    padding: padding || sizeStyles.padding,
                    margin: margin || 0,
                    minHeight: minHeight || sizeStyles.minHeight,
                    width: fullWidth ? '100%' : undefined,
                    opacity: isDisabled ? 0.6 : 1,
                },
                shadow && (shadowStyle || styles.shadow),
                containerStyle,
            ]}
            onPress={onPress}
            disabled={isDisabled}
            activeOpacity={0.7}
            {...touchableProps}
        >
            {renderContent()}
        </TouchableOpacity>
    );
};

// Helper functions
const getVariantStyles = (variant: SonnyButtonProps['variant']) => {
    switch (variant) {
        case 'secondary':
            return {
                backgroundColor: Colors.grey + '20',
                textColor: Colors.black,
                borderColor: Colors.grey,
                borderWidth: 1,
                disabledBackgroundColor: Colors.grey + '10',
                disabledTextColor: Colors.grey,
            };
        case 'outline':
            return {
                backgroundColor: 'transparent',
                textColor: Colors.info,
                borderColor: Colors.info,
                borderWidth: 1,
                disabledBackgroundColor: 'transparent',
                disabledTextColor: Colors.grey,
            };
        case 'ghost':
            return {
                backgroundColor: 'transparent',
                textColor: Colors.info,
                borderColor: 'transparent',
                borderWidth: 0,
                disabledBackgroundColor: 'transparent',
                disabledTextColor: Colors.grey,
            };
        case 'danger':
            return {
                backgroundColor: Colors.error,
                textColor: Colors.white,
                borderColor: Colors.error,
                borderWidth: 0,
                disabledBackgroundColor: Colors.error + '40',
                disabledTextColor: Colors.white,
            };
        case 'success':
            return {
                backgroundColor: Colors.success,
                textColor: Colors.white,
                borderColor: Colors.success,
                borderWidth: 0,
                disabledBackgroundColor: Colors.success + '40',
                disabledTextColor: Colors.white,
            };
        case 'warning':
            return {
                backgroundColor: Colors.warning,
                textColor: Colors.white,
                borderColor: Colors.warning,
                borderWidth: 0,
                disabledBackgroundColor: Colors.warning + '40',
                disabledTextColor: Colors.white,
            };
        case 'primary':
        default:
            return {
                backgroundColor: Colors.info,
                textColor: Colors.white,
                borderColor: Colors.info,
                borderWidth: 0,
                disabledBackgroundColor: Colors.info + '40',
                disabledTextColor: Colors.white,
            };
    }
};

const getSizeStyles = (size: SonnyButtonProps['size']) => {
    switch (size) {
        case 'small':
            return {
                containerStyle: {},
                textStyle: { fontSize: 14, fontWeight: '600' as const },
                padding: 8,
                borderRadius: 6,
                minHeight: 36,
                iconSize: 16,
                loadingSize: 'small' as const,
            };
        case 'large':
            return {
                containerStyle: {},
                textStyle: { fontSize: 18, fontWeight: '600' as const },
                padding: 16,
                borderRadius: 12,
                minHeight: 56,
                iconSize: 24,
                loadingSize: 'small' as const,
            };
        case 'medium':
        default:
            return {
                containerStyle: {},
                textStyle: { fontSize: 16, fontWeight: '600' as const },
                padding: 12,
                borderRadius: 8,
                minHeight: 44,
                iconSize: 20,
                loadingSize: 'small' as const,
            };
    }
};

const getIconSpacing = (position: SonnyButtonProps['iconPosition']) => {
    switch (position) {
        case 'right':
            return { marginRight: 8 };
        case 'top':
            return { marginBottom: 4 };
        case 'bottom':
            return { marginTop: 4 };
        case 'left':
        default:
            return { marginLeft: 8 };
    }
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    horizontalContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    verticalContent: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        fontWeight: '600',
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

export default SonnyButton;
