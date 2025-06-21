import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { CachedImage, Text, MainContainer } from '../src';
import { clearImageCache } from '../src/hooks/useImageCache';
import { Colors } from '../src/constants/colors';

export const CachedImageExample = () => {
    const sampleImages = [
        'https://picsum.photos/200/200?random=1',
        'https://picsum.photos/200/200?random=2',
        'https://picsum.photos/200/200?random=3',
        'https://picsum.photos/200/200?random=4',
        'https://picsum.photos/200/200?random=5',
        'https://picsum.photos/200/200?random=6',
    ];

    const handleClearCache = async () => {
        try {
            await clearImageCache();
            console.log('Cache cleared successfully');
        } catch (error) {
            console.error('Failed to clear cache:', error);
        }
    };

    return (
        <MainContainer>
            <View style={styles.container}>
                <Text style={styles.title}>Cached Image Examples</Text>
                <Text style={styles.description}>
                    CachedImage is designed for REMOTE URLs only (http/https).
                    For local images, use the regular React Native Image component.
                </Text>

                <TouchableOpacity
                    style={styles.clearButton}
                    onPress={handleClearCache}
                >
                    <Text style={styles.clearButtonText}>Clear Cache</Text>
                </TouchableOpacity>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Remote Images with Caching */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Remote Images (Cached)</Text>
                        <Text style={styles.sectionSubtitle}>
                            These images are downloaded and cached automatically
                        </Text>

                        <View style={styles.grid}>
                            {sampleImages.map((uri, index) => (
                                <View key={index} style={styles.imageContainer}>
                                    <CachedImage
                                        uri={uri}
                                        style={styles.image}
                                        showLoadingIndicator
                                        loadingColor={Colors.info}
                                        cacheKey={`sample_image_${index}`}
                                        ttl={24 * 60 * 60 * 1000} // 24 hours
                                    />
                                    <Text style={styles.imageLabel}>
                                        Remote {index + 1}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Local Images Comparison */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Local Images (Not Cached)</Text>
                        <Text style={styles.sectionSubtitle}>
                            For local images, use regular React Native Image component
                        </Text>

                        <View style={styles.comparisonContainer}>
                            <View style={styles.comparisonItem}>
                                <Text style={styles.comparisonLabel}>❌ Don't use CachedImage</Text>
                                <View style={styles.codeBlock}>
                                    <Text style={styles.codeText}>
                                        {`<CachedImage\n  uri={require('./local.png')}\n  // This won't work!\n/>`}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.comparisonItem}>
                                <Text style={styles.comparisonLabel}>✅ Use regular Image instead</Text>
                                <View style={styles.codeBlock}>
                                    <Text style={styles.codeText}>
                                        {`<Image\n  source={require('./local.png')}\n  style={{ width: 100, height: 100 }}\n/>`}
                                    </Text>
                                </View>

                                {/* Example placeholder for local image */}
                                <View style={styles.localImagePlaceholder}>
                                    <Text style={styles.placeholderText}>Local Image</Text>
                                    <Text style={styles.placeholderSubtext}>
                                        (Use require() with Image component)
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Custom Styled Remote Images */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Custom Styled Remote Images</Text>

                        <View style={styles.customExample}>
                            <Text style={styles.exampleLabel}>Rounded Cached Image</Text>
                            <CachedImage
                                uri="https://picsum.photos/150/150?random=10"
                                style={styles.roundedImage}
                                showLoadingIndicator
                                loadingColor={Colors.success}
                                containerStyle={styles.roundedContainer}
                            />
                        </View>

                        <View style={styles.customExample}>
                            <Text style={styles.exampleLabel}>With Border & Loading</Text>
                            <CachedImage
                                uri="https://picsum.photos/150/150?random=11"
                                style={styles.borderedImage}
                                showLoadingIndicator
                                loadingSize="large"
                                loadingColor={Colors.warning}
                            />
                        </View>
                    </View>

                    {/* Usage Guidelines */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Usage Guidelines</Text>
                        <View style={styles.guidelineContainer}>
                            <View style={styles.guideline}>
                                <Text style={styles.guidelineIcon}>🌐</Text>
                                <Text style={styles.guidelineText}>
                                    Use CachedImage for remote URLs (http/https)
                                </Text>
                            </View>
                            <View style={styles.guideline}>
                                <Text style={styles.guidelineIcon}>📱</Text>
                                <Text style={styles.guidelineText}>
                                    Use Image component for local assets (require)
                                </Text>
                            </View>
                            <View style={styles.guideline}>
                                <Text style={styles.guidelineIcon}>⚡</Text>
                                <Text style={styles.guidelineText}>
                                    CachedImage improves performance for remote images
                                </Text>
                            </View>
                            <View style={styles.guideline}>
                                <Text style={styles.guidelineIcon}>💾</Text>
                                <Text style={styles.guidelineText}>
                                    Local images are already bundled, no caching needed
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 16,
        color: Colors.black,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: Colors.grey,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 22,
        fontWeight: '500',
    },
    clearButton: {
        backgroundColor: Colors.error,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignSelf: 'center',
        marginBottom: 24,
    },
    clearButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
        color: Colors.black,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: Colors.grey,
        marginBottom: 16,
        fontStyle: 'italic',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    imageContainer: {
        width: '48%',
        marginBottom: 16,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 8,
    },
    imageLabel: {
        marginTop: 8,
        fontSize: 14,
        color: Colors.grey,
        textAlign: 'center',
    },
    comparisonContainer: {
        gap: 16,
    },
    comparisonItem: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    comparisonLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        color: Colors.black,
    },
    codeBlock: {
        backgroundColor: '#2d3748',
        padding: 12,
        borderRadius: 6,
        marginBottom: 12,
    },
    codeText: {
        color: '#e2e8f0',
        fontSize: 12,
        fontFamily: 'monospace',
        lineHeight: 16,
    },
    localImagePlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: '#e9ecef',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#dee2e6',
        borderStyle: 'dashed',
    },
    placeholderText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.grey,
        textAlign: 'center',
    },
    placeholderSubtext: {
        fontSize: 10,
        color: Colors.grey,
        textAlign: 'center',
        marginTop: 4,
    },
    customExample: {
        alignItems: 'center',
        marginBottom: 24,
    },
    exampleLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 12,
        color: Colors.black,
    },
    roundedImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    roundedContainer: {
        borderRadius: 50,
        overflow: 'hidden',
    },
    borderedImage: {
        width: 120,
        height: 120,
        borderRadius: 8,
        borderWidth: 3,
        borderColor: Colors.warning,
    },
    guidelineContainer: {
        gap: 12,
    },
    guideline: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: Colors.info,
    },
    guidelineIcon: {
        fontSize: 20,
        marginRight: 12,
    },
    guidelineText: {
        flex: 1,
        fontSize: 14,
        color: Colors.black,
        lineHeight: 20,
    },
}); 