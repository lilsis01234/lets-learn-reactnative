import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Image,Picker  } from 'react-native';
import axios from 'axios';
import * as ImagePicker from "expo-image-picker";

const AddAnimalForm = ({ dispatch, onClose, navigation }) => {
  const [nom, setNom] = useState('');
  const [type, setType] = useState('');
  const [couleur, setCouleur] = useState('');
  const [age, setAge] = useState('');
  const [sexe, setSexe] = useState('Male');
  const [image, setImage] = useState(null); 
  const [description, setDescription] = useState('');
  const id = localStorage.getItem('id');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      base64: false,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('nom', nom);
      formData.append('type', type);
      formData.append('couleur', couleur);
      formData.append('age', age);
      formData.append('sexe', sexe);
      formData.append('description', description);
      formData.append('personne', id);

      if(image){
        const response = await fetch(image);
        const blob = await response.blob();
        formData.append("photo", blob, "photo.jpg");
      }

      axios.post('http://localhost:3000/crud/new', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setNom('');
      setType('');
      setCouleur('');
      setAge('');
      setSexe('');
      setDescription('');
      setImage(null);
      
      navigation.navigate('Accueil');

    } catch (error) {
      console.error('Error while submitting:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageButton}
        onPress={pickImage}
      >
        <Text style={styles.imageButtonText}>Sélectionner une photo</Text>
      </TouchableOpacity>
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.imagePreview}
        />
      )}
      <TextInput style={styles.input} placeholder="Nom" value={nom} onChangeText={setNom} />
      <TextInput style={styles.input} placeholder="Type" value={type} onChangeText={setType} />
      <TextInput style={styles.input} placeholder="Couleur" value={couleur} onChangeText={setCouleur} />
      <TextInput style={styles.input} placeholder="Age" value={age} onChangeText={setAge} />
      <Picker
        selectedValue={sexe}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) => setSexe(itemValue)}
      >
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Femelle" value="Femelle" />
      </Picker>
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />


      <TouchableOpacity style={styles.editButton} onPress={handleSubmit}>
        <Text>Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: 'orange',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddAnimalForm;
