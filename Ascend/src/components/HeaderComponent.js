import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HeaderComponent = ({
    name = 'Adventurer',
    coins = 0,
    gems = 0,
    experience = 0,
    levelCap = 1000,
    onProfilePress,
}) => {
    const progressRatio = levelCap > 0 ? Math.min(1, experience / levelCap) : 0;
    const progressPercent = `${Math.round(progressRatio * 100)}%`;
    const initials = name.trim().slice(0, 1).toUpperCase() || '?';

    return (
        <View style={styles.container}>
            <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Open profile"
                onPress={onProfilePress}
                activeOpacity={0.7}
            >
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{initials}</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.centerBlock}>
                <Text style={styles.greeting}>Hey, {name}</Text>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: progressPercent }]} />
                </View>
                <Text style={styles.progressLabel}>
                    {Math.round(experience)} / {Math.round(levelCap)} XP
                </Text>
            </View>

            <View style={styles.currencies}>
                <View style={styles.currencyPill}>
                    <Text style={styles.currencyLabel}>Coins</Text>
                    <Text style={styles.currencyValue}>{coins}</Text>
                </View>
                <View style={[styles.currencyPill, styles.currencySpacing, styles.gemsPill]}>
                    <Text style={styles.currencyLabel}>Gems</Text>
                    <Text style={styles.currencyValue}>{gems}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: '#0f172a',
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#1e293b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: '#f8fafc',
        fontSize: 20,
        fontWeight: '700',
    },
    centerBlock: {
        flex: 1,
        marginHorizontal: 16,
    },
    greeting: {
        color: '#f8fafc',
        fontSize: 18,
        fontWeight: '600',
    },
    progressBar: {
        height: 8,
        borderRadius: 4,
        backgroundColor: '#1e293b',
        marginTop: 8,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#38bdf8',
    },
    progressLabel: {
        color: '#cbd5f5',
        fontSize: 12,
        fontWeight: '500',
        marginTop: 6,
    },
    currencies: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currencyPill: {
        minWidth: 60,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 14,
        backgroundColor: '#1e293b',
    },
    currencySpacing: {
        marginLeft: 12,
    },
    gemsPill: {
        backgroundColor: '#312e81',
    },
    currencyLabel: {
        color: '#94a3b8',
        fontSize: 12,
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    currencyValue: {
        color: '#f8fafc',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default HeaderComponent;