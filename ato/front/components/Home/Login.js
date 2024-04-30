import React, { useState } from "react";
import axios from "axios";
import { Text, TextInput, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; 
import * as Animatable from 'react-native-animatable';
import mimi from './mimi.gif';

const Home = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3000/auth/login', {
                email,
                password
            }).then((response) =>{
                const data = response.data;
                console.log(data)
                setAuthenticated(true);
                localStorage.setItem('authenticated', authenticated);
                navigation.navigate('Accueil');
            })
            .catch(error => {
                console.log(error.response); 
                alert("Informations incorrectes: " + error.message);
            });
            
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "white",
            justifyContent: "center",
            padding: 20,
        },
        title: {
            fontSize: 36,
            marginBottom: 20,
            textAlign: "center",
            color: "rgb(239, 135, 11)",
            fontFamily: "Arial", 
        },
        input: {
            padding: 20,
            backgroundColor: "lightgray",
            borderRadius: 10,
            marginBottom: 20,
        },
        button: {
            backgroundColor: "rgb(239, 135, 11)",
            borderRadius: 10,
            padding: 25,
            alignItems: "center",
            marginBottom: 25, 
        },
        buttonText: {
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
        },
        option: {
            alignItems: "center",
        },
        optionText: {
            fontSize: 24,
            marginTop: 10,
            color: "rgb(239, 135, 11)",
        },
        right: {
            justifyContent: "flex-end",
            backgroundColor: "#ffffff",
            padding: 10
        },
        gifImage: {
            width: 200,
            height: 200,
            marginBottom: 20,
            borderRadius: 100, 
        },
    });

    return (
        <>
            <View style={styles.right}>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.optionText}>S'inscrire <FontAwesome5 name="paw" size={20} color="rgb(239, 135, 11)" /> </Text>
            </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <Animatable.View animation="fadeInDown" style={{ alignItems: 'center' }}>
                    <Image source={mimi} style={styles.gifImage} />
                    <Text style={styles.title}><FontAwesome5 name="dog" size={20} color="rgb(239, 135, 11)" />Wel-Paw<FontAwesome5 name="cat" size={20} color="rgb(239, 135, 11)" /></Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Votre email"
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        placeholder="Votre mot de passe"
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Se connecter <FontAwesome5 name="paw" size={20} color="#ffffff" /> </Text>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        </>
    )
}

export default Home;
