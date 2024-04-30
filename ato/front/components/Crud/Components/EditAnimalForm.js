import React, { useState } from 'react';
import { View, TextInput, Button, Image, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const EditAnimalForm = ({ route, navigation }) => {
  console.log(route.params.animal)
  const animal = route.params.animal;
  const [nom, setNom] = useState(animal.nom);
  const [type, setType] = useState(animal.type);
  const [couleur, setCouleur] = useState(animal.couleur);
  const [description, setDescription] = useState(animal.description);
  const [image, setImage] = useState(animal.image);
  let blob;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      base64: false,
    });
  
    if (!result.cancelled) {
      if (!image || result.assets[0].uri !== image) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
  
      if (image && image !== animal.image) { 
        const response = await fetch(image);
        blob = await response.blob();
        formData.append('photo', blob, 'photo.jpg');
      }
  
      formData.append('nom', nom);
      formData.append('type', type);
      formData.append('couleur', couleur);
      formData.append('description', description);
  
      axios.put(`http://localhost:3000/crud/${animal.id}/edit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigation.navigate('Accueil'); 
    } catch (error) {
      console.error('Error updating animal:', error);
    }
  };
  
  const styles = {
    imageButton: {
      backgroundColor: '#DDDDDD',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    imageButtonText: {
      textAlign: 'center',
    },
  };

  return (
    <View>
      <TextInput placeholder="Nom" value={nom} onChangeText={setNom} />
      <TextInput placeholder="Type" value={type} onChangeText={setType} />
      <TextInput placeholder="Couleur" value={couleur} onChangeText={setCouleur} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} />
      <View>
        {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
      </View>
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>Sélectionner une photo</Text>
      </TouchableOpacity>
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
};

export default EditAnimalForm;
