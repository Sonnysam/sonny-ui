import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SonnySwitch, Text, MainContainer } from '../src';

/**
 * Example demonstrating all features of the SonnySwitch component
 */
export const SonnySwitchExample = () => {
    const [basicSwitch, setBasicSwitch] = useState(false);
    const [iosSwitch, setIosSwitch] = useState(true);
    const [materialSwitch, setMaterialSwitch] = useState(false);
    const [iconSwitch, setIconSwitch] = useState(true);
    const [labeledSwitch, setLabeledSwitch] = useState(false);
    const [customSwitch, setCustomSwitch] = useState(true);
    const [disabledOn, setDisabledOn] = useState(true);
    const [disabledOff, setDisabledOff] = useState(false);

    return (
        <MainContainer>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>SonnySwitch Examples</Text>

                {/* Basic Variants */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Switch Variants</Text>
                    
                    <View style={styles.row}>
                        <Text style={styles.rowLabel}>Default:</Text>
                        <SonnySwitch
                            value={basicSwitch}
                            onValueChange={setBasicSwitch}
                            variant="default"
                        />
                    </View>
                    
                    <View style={styles.row}>
                        <Text style={styles.rowLabel}>iOS Style:</Text>
                        <SonnySwitch
                            value={iosSwitch}
                            onValueChange={setIosSwitch}
                            variant="ios"
                        />
                    </View>
                    
                    <View style={styles.row}>
                        <Text style={styles.rowLabel}>Material:</Text>
                        <SonnySwitch
                            value={materialSwitch}
                            onValueChange={setMaterialSwitch}
                            variant="material"
                        />
                    </View>
                    
                    <View style={styles.row}>
                        <Text style={styles.rowLabel}>Rounded:</Text>
                        <SonnySwitch
                            value={basicSwitch}
                            onValueChange={setBasicSwitch}
                            variant="rounded"
                        />
                    </View>
                    
                    <View style={styles.row}>
                        <Text style={styles.rowLabel}>Square:</Text>
                        <SonnySwitch
                            value={materialSwitch}
                            onValueChange={setMaterialSwitch}
                            variant="square"
                        />
                    </View>
                    
                    <View style={styles.row}>
                        <Text style={styles.rowLabel}>Outline:</Text>
                        <SonnySwitch
                            value={iosSwitch}
                            onValueChange={setIosSwitch}
                            variant="outline"
                        />
                    </View>
                </View>

                {/* Switch Sizes */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Switch Sizes</Text>
                    
                    <View style={styles.row}>
                        <Text style={styles.rowLabel}>Small:</Text>
                        <SonnySwitch
                            value={basicSwitch}
                            onValueChange={setBasicSwitch}
                            size="small"
                        />
                    </View>
                    
                    <View style={styles.row}>
                        <Text style={styles.rowLabel}>Medium:</Text>
                        <SonnySwitch
                            value={iosSwitch}
                            onValueChange={setIosSwitch}
                            size="medium"
                        />
                    </View>
                    
                    <View style={styles.row}>
                        <Text style={styles.rowLabel}>Large:</Text>
                        <SonnySwitch
                            value={materialSwitch}
                            onValueChange={setMaterialSwitch}
                            size="large"
                        />
                    </View>
                </View>

                {/* Icon Switches */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Switches with Icons</Text>
                    
                    <View style={styles.row}>
                        <Text style={styles.rowLabel}>Check/Close:</Text>
                        <SonnySwitch
                            value={iconSwitch}
                            onValueChange={setIconSwitch}
                            iconOn="checkmark"
                            iconOff="close"
                            variant="ios"
                            size="large"
                        />
                    </View>
                    
                    <View style={styles.row}>
                        <Text style={styles.rowLabel}>Moon/Sun:</Text>
                        <SonnySwitch
                            value={basicSwitch}
                            onValueChange={setBasicSwitch}
                            iconOn="moon"
                            iconOff="sunny"
                            iconColorOn="#FFF"
                            iconColorOff="#FFD700"
                            trackColorOn="#1a1a1a"
                            trackColorOff="#87CEEB"
                            thumbColorOn="#333"
                            thumbColorOff="#FFF"
                        />
                    </View>
                    
                    <View style={styles.row}>
                        <Text style={styles.rowLabel}>Volume:</Text>
                        <SonnySwitch
                            value={materialSwitch}
                            onValueChange={setMaterialSwitch}
                            iconOn="volume-high"
                            iconOff="volume-mute"
                            variant="material"
                        />
                    </View>
                </View>

                {/* Labeled Switches */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Switches with Labels</Text>
                    
                    <SonnySwitch
                        value={labeledSwitch}
                        onValueChange={setLabeledSwitch}
                        label="Enable Notifications"
                        labelPosition="left"
                        variant="ios"
                    />
                    
                    <SonnySwitch
                        value={iconSwitch}
                        onValueChange={setIconSwitch}
                        label="Dark Mode"
                        labelPosition="right"
                        iconOn="moon"
                        iconOff="sunny"
                        containerStyle={styles.switchSpacing}
                    />
                    
                    <SonnySwitch
                        value={customSwitch}
                        onValueChange={setCustomSwitch}
                        label="Auto-Save"
                        labelPosition="top"
                        variant="material"
                        containerStyle={styles.switchSpacing}
                    />
                    
                    <SonnySwitch
                        value={basicSwitch}
                        onValueChange={setBasicSwitch}
                        label="Background Sync"
                        labelPosition="bottom"
                        size="small"
                        containerStyle={styles.switchSpacing}
                    />
                </View>

                {/* Custom Styled Switches */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Custom Styled Switches</Text>
                    
                    <View style={styles.row}>
                        <Text style={styles.rowLabel}>Custom Colors:</Text>
                        <SonnySwitch
                            value={customSwitch}
                            onValueChange={setCustomSwitch}
                            trackColorOn="#9C27B0"
                            trackColorOff="#E1BEE7"
                            thumbColorOn="#FFFFFF"
                            thumbColorOff="#9C27B0"
                            borderColorOn="#9C27B0"
                            borderColorOff="#E1BEE7"
                        />
                    </View>
                    
                    <View style={styles.row}>
                        <Text style={styles.rowLabel}>With Shadow:</Text>
                        <SonnySwitch
                            value={iconSwitch}
                            onValueChange={setIconSwitch}
                            variant="ios"
                            shadow
                            size="large"
                        />
                    </View>
                    
                    <View style={styles.row}>
                        <Text style={styles.rowLabel}>Custom Size:</Text>
                        <SonnySwitch
                            value={labeledSwitch}
                            onValueChange={setLabeledSwitch}
                            trackWidth={70}
                            trackHeight={40}
                            thumbSize={32}
                            trackColorOn="#FF5722"
                            trackColorOff="#FFCCBC"
                            thumbColorOn="#FFFFFF"
                            thumbColorOff="#FF5722"
                        />
                    </View>
                </View>

                {/* Disabled States */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Disabled States</Text>
                    
                    <View style={styles.row}>
                        <Text style={styles.rowLabel}>Disabled (On):</Text>
                        <SonnySwitch
                            value={disabledOn}
                            onValueChange={setDisabledOn}
                            disabled
                            variant="ios"
                        />
                    </View>
                    
                    <View style={styles.row}>
                        <Text style={styles.rowLabel}>Disabled (Off):</Text>
                        <SonnySwitch
                            value={disabledOff}
                            onValueChange={setDisabledOff}
                            disabled
                            variant="material"
                        />
                    </View>
                </View>

                <View style={styles.spacer} />
            </ScrollView>
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
        color: '#333',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingHorizontal: 5,
    },
    rowLabel: {
        fontSize: 16,
        color: '#666',
        flex: 1,
    },
    switchSpacing: {
        marginBottom: 15,
    },
    spacer: {
        height: 40,
    },
});

export default SonnySwitchExample;
