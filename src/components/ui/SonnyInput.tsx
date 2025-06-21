import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    TextStyle,
    ViewStyle,
    TextInputProps as RNTextInputProps,
} from 'react-native';
import { Text } from './Text';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

export interface SonnyInputProps extends Omit<RNTextInputProps, 'style'> {
    /** Label text displayed above the input */
    label?: string;
    /** Placeholder text for the input */
    placeholder?: string;
    /** Current value of the input */
    value: string;
    /** Callback when text changes */
    onChangeText: (text: string) => void;
    /** Whether this is a password input */
    isPassword?: boolean;
    /** Required field indicator text */
    required?: string;
    /** Error message to display */
    error?: string;
    /** Helper text displayed below the input */
    helperText?: string;
    /** Whether the input is disabled */
    disabled?: boolean;
    /** Icon name from Ionicons to display on the left */
    leftIcon?: keyof typeof Ionicons.glyphMap;
    /** Icon name from Ionicons to display on the right (excluding password toggle) */
    rightIcon?: keyof typeof Ionicons.glyphMap;
    /** Callback when right icon is pressed */
    onRightIconPress?: () => void;
    /** Custom color for the left icon */
    leftIconColor?: string;
    /** Custom color for the right icon */
    rightIconColor?: string;
    /** Size for the icons */
    iconSize?: number;
    /** Custom styles for the container */
    containerStyle?: ViewStyle;
    /** Custom styles for the label */
    labelStyle?: TextStyle;
    /** Custom styles for the input field */
    inputStyle?: TextStyle;
    /** Custom styles for the input container */
    inputContainerStyle?: ViewStyle;
    /** Custom styles for error text */
    errorStyle?: TextStyle;
    /** Custom styles for helper text */
    helperTextStyle?: TextStyle;
    /** Custom border color */
    borderColor?: string;
    /** Custom border color when focused */
    focusedBorderColor?: string;
    /** Custom border color when there's an error */
    errorBorderColor?: string;
    /** Custom background color */
    backgroundColor?: string;
    /** Border radius for the input container */
    borderRadius?: number;
    /** Height of the input container */
    height?: number;
}

/**
 * A fully customizable text input component with icon support, validation states,
 * and password toggle functionality.
 * 
 * @example
 * ```tsx
 * <SonnyInput
 *   label="Email"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChangeText={setEmail}
 *   leftIcon="mail"
 *   keyboardType="email-address"
 *   required="*"
 * />
 * 
 * <SonnyInput
 *   label="Password"
 *   placeholder="Enter your password"
 *   value={password}
 *   onChangeText={setPassword}
 *   isPassword
 *   leftIcon="lock-closed"
 *   required="*"
 * />
 * ```
 */
export const SonnyInput: React.FC<SonnyInputProps> = ({
    label,
    placeholder,
    value,
    onChangeText,
    isPassword = false,
    required,
    error,
    helperText,
    disabled = false,
    leftIcon,
    rightIcon,
    onRightIconPress,
    leftIconColor,
    rightIconColor,
    iconSize = 20,
    containerStyle,
    labelStyle,
    inputStyle,
    inputContainerStyle,
    errorStyle,
    helperTextStyle,
    borderColor,
    focusedBorderColor,
    errorBorderColor,
    backgroundColor,
    borderRadius = 8,
    height = 50,
    secureTextEntry,
    keyboardType = 'default',
    autoCapitalize = 'none',
    autoCorrect = false,
    multiline = false,
    numberOfLines = 1,
    ...textInputProps
}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    // Determine border color based on state
    const getBorderColor = () => {
        if (error) {
            return errorBorderColor || Colors.error;
        }
        if (isFocused) {
            return focusedBorderColor || Colors.info;
        }
        return borderColor || '#dee2e6';
    };

    // Determine if we should show secure text entry
    const shouldSecureText = isPassword ? !showPassword : secureTextEntry;

    return (
        <View style={[styles.container, containerStyle]}>
            {/* Label */}
            {label && (
                <Text style={[styles.label, labelStyle] as any}>
                    {label}
                    {required && (
                        <Text style={[styles.required, { color: Colors.error }] as any}>
                            {' '}{required}
                        </Text>
                    )}
                </Text>
            )}

            {/* Input Container */}
            <View
                style={[
                    styles.inputContainer,
                    {
                        borderColor: getBorderColor(),
                        backgroundColor: backgroundColor || (disabled ? '#f8f9fa' : Colors.white),
                        borderRadius,
                        height: multiline ? undefined : height,
                        minHeight: multiline ? height : undefined,
                        opacity: disabled ? 0.6 : 1,
                    },
                    inputContainerStyle,
                ]}
            >
                {/* Left Icon */}
                {leftIcon && (
                    <View style={styles.leftIconContainer}>
                        <Ionicons
                            name={leftIcon}
                            size={iconSize}
                            color={leftIconColor || Colors.grey}
                        />
                    </View>
                )}

                {/* Text Input */}
                <TextInput
                    style={[
                        styles.input,
                        {
                            color: disabled ? Colors.grey : Colors.black,
                            textAlignVertical: multiline ? 'top' : 'center',
                        },
                        inputStyle,
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.grey}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    secureTextEntry={shouldSecureText}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    autoCorrect={autoCorrect}
                    editable={!disabled}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    {...textInputProps}
                />

                {/* Right Icon or Password Toggle */}
                {(isPassword || rightIcon) && (
                    <TouchableOpacity
                        style={styles.rightIconContainer}
                        onPress={isPassword ? togglePasswordVisibility : onRightIconPress}
                        disabled={disabled}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name={
                                isPassword
                                    ? (showPassword ? 'eye-off' : 'eye')
                                    : rightIcon!
                            }
                            size={iconSize}
                            color={
                                isPassword
                                    ? (isFocused ? Colors.info : Colors.grey)
                                    : (rightIconColor || Colors.grey)
                            }
                        />
                    </TouchableOpacity>
                )}
            </View>

            {/* Error Message */}
            {error && (
                <Text style={[styles.errorText, errorStyle] as any}>
                    {error}
                </Text>
            )}

            {/* Helper Text */}
            {helperText && !error && (
                <Text style={[styles.helperText, helperTextStyle] as any}>
                    {helperText}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '600',
        color: Colors.black,
    },
    required: {
        fontSize: 14,
        fontWeight: '600',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        paddingHorizontal: 12,
    },
    leftIconContainer: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 12,
    },
    rightIconContainer: {
        marginLeft: 12,
        padding: 4,
    },
    errorText: {
        fontSize: 12,
        color: Colors.error,
        marginTop: 4,
        fontWeight: '500',
    },
    helperText: {
        fontSize: 12,
        color: Colors.grey,
        marginTop: 4,
    },
});

export default SonnyInput; 