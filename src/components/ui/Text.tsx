import React from 'react';
import { Text as RNText, TextStyle, TextProps as RNTextProps } from 'react-native';
import { Colors } from '../../constants/colors';

export interface TextProps extends RNTextProps {
    /**
     * Custom style overrides for the text
     */
    style?: TextStyle;
    /**
     * The text content
     */
    children?: React.ReactNode;
}

/**
 * A customized Text component with default styling
 */
export const Text: React.FC<TextProps> = ({ style, children, ...props }) => {
    return (
        <RNText
            style={[
                {
                    color: Colors.black,
                    fontSize: 16,
                },
                style
            ]}
            {...props}
        >
            {children}
        </RNText>
    );
}; 