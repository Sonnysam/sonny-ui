import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SonnyInput } from '../src/components/ui/SonnyInput';
import { Text } from '../src/components/ui/Text';
import { Colors } from '../src/constants/colors';

/**
 * Example demonstrating all features of the SonnyInput component
 */
export const SonnyInputExample = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');
    const [search, setSearch] = useState('');
    const [amount, setAmount] = useState('');
    const [customInput, setCustomInput] = useState('');

    // Validation logic
    const emailError = email && !email.includes('@') ? 'Please enter a valid email' : undefined;
    const passwordError = password && password.length < 6 ? 'Password must be at least 6 characters' : undefined;
    const confirmPasswordError = confirmPassword && confirmPassword !== password ? 'Passwords do not match' : undefined;

    const handleSearch = () => {
        console.log('Search:', search);
    };

    const handleClearAmount = () => {
        setAmount('');
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>SonnyInput Examples</Text>

            {/* Basic Input */}
            <SonnyInput
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                leftIcon="mail"
                keyboardType="email-address"
            />

            {/* Password Input */}
            <SonnyInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                isPassword
                leftIcon="lock-closed"
            />

            {/* Confirm Password */}
            <SonnyInput
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                isPassword
                leftIcon="lock-closed"
                required="*"
                error={confirmPasswordError}
            />

            {/* Custom Styled Input - Blue Theme */}
            <SonnyInput
                label="Username with Custom Colors"
                placeholder="Enter username"
                value={username}
                onChangeText={setUsername}
                leftIcon="person"
                rightIcon="checkmark-circle"
                // Custom icon colors
                leftIconColor="#007AFF"  // Blue left icon
                rightIconColor="#34C759" // Green right icon
                // Custom border colors
                borderColor="#007AFF"
                focusedBorderColor="#0056CC"
                // Custom input styling
                inputStyle={{
                    color: '#007AFF',     // Blue text color
                    fontSize: 18,        // Larger text
                    fontWeight: '500',   // Semi-bold text
                }}
                labelStyle={{
                    color: '#007AFF',    // Blue label
                    fontSize: 14,
                }}
            />

            {/* Dark Theme Input */}
            <SonnyInput
                label="Dark Theme Input"
                placeholder="Dark themed input"
                value={customInput}
                onChangeText={setCustomInput}
                leftIcon="settings"
                // Dark theme colors
                backgroundColor="#2C2C2E"
                borderColor="#48484A"
                focusedBorderColor="#FFFFFF"
                leftIconColor="#FFFFFF"
                inputStyle={{
                    color: '#FFFFFF',    // White text
                }}
                labelStyle={{
                    color: '#FFFFFF',    // White label
                }}
                containerStyle={{
                    backgroundColor: '#1C1C1E', // Dark container
                    padding: 16,
                    borderRadius: 12,
                }}
            />

            {/* Phone Number */}
            <SonnyInput
                label="Phone Number"
                placeholder="Enter your phone number"
                value={phone}
                onChangeText={setPhone}
                leftIcon="call"
                keyboardType="phone-pad"
                helperText="Include country code (e.g., +1 234 567 8900)"
            />

            {/* Search with Right Icon */}
            <SonnyInput
                label="Search"
                placeholder="Search anything..."
                value={search}
                onChangeText={setSearch}
                leftIcon="search"
                rightIcon="arrow-forward"
                onRightIconPress={handleSearch}
                rightIconColor="#007AFF"
            />

            {/* Amount with Clear Button */}
            <SonnyInput
                label="Amount"
                placeholder="0.00"
                value={amount}
                onChangeText={setAmount}
                leftIcon="card"
                rightIcon="close"
                onRightIconPress={handleClearAmount}
                keyboardType="numeric"
                helperText="Enter amount in USD"
            />

            {/* Multiline Bio */}
            <SonnyInput
                label="Bio"
                placeholder="Tell us about yourself..."
                value={bio}
                onChangeText={setBio}
                multiline
                numberOfLines={4}
                height={100}
                leftIcon="document-text"
                helperText="Maximum 500 characters"
            />

            {/* Disabled Input */}
            <SonnyInput
                label="Account Type"
                placeholder="Premium"
                value="Premium"
                onChangeText={() => { }}
                leftIcon="star"
                disabled
                helperText="This field cannot be edited"
            />

            {/* Error State Example */}
            <SonnyInput
                label="Input with Error"
                placeholder="This has an error"
                value=""
                onChangeText={() => { }}
                leftIcon="alert-circle"
                error="This field is required"
                leftIconColor={Colors.error}  // Red left icon to match error
                errorBorderColor={Colors.error}
            />

            {/* Success State Example */}
            <SonnyInput
                label="Success Input"
                placeholder="Valid input"
                value="valid@email.com"
                onChangeText={() => { }}
                leftIcon="mail"
                rightIcon="checkmark-circle"
                leftIconColor="#34C759"   // Green for success
                rightIconColor="#34C759"  // Green checkmark
                borderColor="#34C759"
                focusedBorderColor="#34C759"
            />

            {/* Large Input with Custom Icons */}
            <SonnyInput
                label="Large Input"
                placeholder="Larger input field"
                value=""
                onChangeText={() => { }}
                leftIcon="search"
                height={60}              // Taller input
                iconSize={24}           // Larger icons
                leftIconColor="#FF6B35"  // Orange icon
                borderRadius={16}       // More rounded
                inputStyle={{
                    fontSize: 20,       // Larger text
                    fontWeight: 'bold',
                }}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default SonnyInputExample; 