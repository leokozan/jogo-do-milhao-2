import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {router} from "expo-router"

export default function Index(){    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => router.navigate("/perguntas")}>
                <Text style={styles.buttonText}>Acessar cadastro de perguntas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text style={styles.buttonText}>Acessar cadastro de respostas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text style={styles.buttonText}>Jogar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text style={styles.buttonText}>Maiores pontos</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#1E90FF',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        width: 250,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
