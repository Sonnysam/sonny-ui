import { Platform, ScrollView, Text, StyleSheet, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/colors";

export interface MainContainerProps {
    /** Content to be rendered inside the container */
    children: ReactNode;
    /** Optional style overrides for the container */
    style?: ViewStyle;
    /** Optional style overrides for the scroll view content container */
    contentContainerStyle?: ViewStyle;
    /** Whether to disable scrolling. Defaults to false */
    disableScroll?: boolean;
    /** Whether to show vertical scroll indicator. Defaults to false */
    showScrollIndicator?: boolean;
}

/**
 * A container component that handles safe area insets and scrolling behavior.
 * Automatically adapts to iOS and Android platforms.
 */
export const MainContainer: React.FC<MainContainerProps> = ({
    children,
    style,
    contentContainerStyle,
    disableScroll = false,
    showScrollIndicator = false,
}) => {
    // Helper function to safely render children
    const renderSafeChildren = (children: ReactNode) => {
        if (typeof children === 'string') {
            console.warn('MainContainer: String passed as child. Wrapping in Text component.');
            return <Text>{children}</Text>;
        }
        return children;
    };

    const content = renderSafeChildren(children);

    return (
        <SafeAreaView style={[styles.container, style]}>
            {disableScroll ? (
                content
            ) : (
                <ScrollView
                    contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={showScrollIndicator}
                >
                    {content}
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 0 : 16,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: Platform.OS === 'ios' ? 16 : 24,
    },
});
