import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SonnyInput, Text, MainContainer } from '../src';

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
        <MainContainer>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>SonnyInput Examples</Text>

                {/* Basic Email Input */}
                <SonnyInput
                    label="Email Address"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    leftIcon="mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    required="*"
                    error={emailError}
                    helperText="We'll never share your email with anyone else"
                />

                {/* Password Input */}
                <SonnyInput
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    isPassword
                    leftIcon="lock-closed"
                    required="*"
                    error={passwordError}
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

                {/* Username with Custom Styling */}
                <SonnyInput
                    label="Username"
                    placeholder="Choose a username"
                    value={username}
                    onChangeText={setUsername}
                    leftIcon="person"
                    borderRadius={12}
                    height={55}
                    focusedBorderColor="#007AFF"
                    leftIconColor="#007AFF"
                    containerStyle={styles.customContainer}
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
                    label="Required Field"
                    placeholder="This field has an error"
                    value=""
                    onChangeText={() => { }}
                    leftIcon="alert-circle"
                    error="This field is required"
                    required="*"
                    errorBorderColor="#FF3B30"
                />

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
    customContainer: {
        marginBottom: 20,
    },
    spacer: {
        height: 40,
    },
});

export default SonnyInputExample; 