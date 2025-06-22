import React from 'react';
import { Text as RNText, TextStyle, TextProps as RNTextProps } from 'react-native';
import { Colors } from '../../constants/colors';

export type FontWeight = '300' | '400' | '500' | '600' | '700' | '800' | '900';
export type FontFamily = 'system' | 'poppins' | 'inter';

export interface TextProps extends RNTextProps {
    /**
     * Custom style overrides for the text
     */
    style?: TextStyle;
    /**
     * The text content
     */
    children?: React.ReactNode;
    /**
     * Font family to use
     * @default 'poppins'
     */
    fontFamily?: FontFamily;
    /**
     * Font weight for the selected font family
     * @default '400'
     */
    fontWeight?: FontWeight;
    /**
     * Font size
     * @default 16
     */
    fontSize?: number;
    /**
     * Text color
     * @default Colors.black
     */
    color?: string;
}

/**
 * Get the Poppins font family name based on weight
 * These names match the exports from @expo-google-fonts/poppins
 */
const getPoppinsFontFamily = (weight: FontWeight): string => {
    switch (weight) {
        case '300':
            return 'Poppins_300Light';
        case '400':
            return 'Poppins_400Regular';
        case '500':
            return 'Poppins_500Medium';
        case '600':
            return 'Poppins_600SemiBold';
        case '700':
            return 'Poppins_700Bold';
        case '800':
            return 'Poppins_800ExtraBold';
        case '900':
            return 'Poppins_900Black';
        default:
            return 'Poppins_400Regular';
    }
};

/**
 * Get the Inter font family name based on weight
 * These names match the exports from @expo-google-fonts/inter
 */
const getInterFontFamily = (weight: FontWeight): string => {
    switch (weight) {
        case '300':
            return 'Inter_300Light';
        case '400':
            return 'Inter_400Regular';
        case '500':
            return 'Inter_500Medium';
        case '600':
            return 'Inter_600SemiBold';
        case '700':
            return 'Inter_700Bold';
        case '800':
            return 'Inter_800ExtraBold';
        case '900':
            return 'Inter_900Black';
        default:
            return 'Inter_400Regular';
    }
};

/**
 * A customized Text component with Google Fonts support (Poppins & Inter) and default styling
 * 
 * Uses @expo-google-fonts/poppins and @expo-google-fonts/inter packages.
 * Make sure to load fonts in your app's root layout using useFonts hook:
 * 
 * @example
 * ```tsx
 * // In your root layout (app/_layout.tsx):
 * import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
 * import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
 * 
 * const [loaded] = useFonts({
 *   Poppins_400Regular,
 *   Poppins_700Bold,
 *   Inter_400Regular,
 *   Inter_600SemiBold,
 * });
 * 
 * // Component usage:
 * <Text>Default Poppins Regular text</Text>
 * <Text fontFamily="inter" fontWeight="700" fontSize={20}>Bold Inter text</Text>
 * <Text fontFamily="poppins" fontWeight="600">SemiBold Poppins text</Text>
 * <Text fontFamily="system">System font</Text>
 * <Text color="#007AFF">Blue text</Text>
 * ```
 */
export const Text: React.FC<TextProps> = ({
    style,
    children,
    fontFamily = 'poppins',
    fontWeight = '400',
    fontSize = 16,
    color = Colors.black,
    ...props
}) => {
    const getFontFamily = () => {
        if (fontFamily === 'system') {
            return undefined; // Use system default
        }
        if (fontFamily === 'inter') {
            return getInterFontFamily(fontWeight);
        }
        return getPoppinsFontFamily(fontWeight);
    };

    return (
        <RNText
            style={[
                {
                    fontFamily: getFontFamily(),
                    fontSize,
                    color,
                },
                style
            ]}
            {...props}
        >
            {children}
        </RNText>
    );
}; 