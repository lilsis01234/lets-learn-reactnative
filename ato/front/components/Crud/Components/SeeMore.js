import React, { useState } from 'react';
import { View, TextInput, Button, Image, TouchableOpacity, Text } from 'react-native';
import mimi from '../../Home/mimi.gif';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

const SeeMore = ({ route, navigation }) => {
  const [animal, setAnimals] = useState(route.params.animal);

  const handleToggleFavorite = async (id) => {
    try {
      setAnimals(prevAnimal => ({ ...prevAnimal, favorite: !prevAnimal.favorite }));
      await axios.post(`http://localhost:3000/crud/addFavorite/${id}`);
    } catch (error) {
      console.error('Error toggling favorite:', error);
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
    animalImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
  };

  return (
    <View>
        <TouchableOpacity onPress={()=>{navigation.navigate('Accueil')}}>
        <Text>x</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.heartIcon} onPress={() => handleToggleFavorite(animal.id)}>
            <FontAwesome5 name="heart" size={20} color={animal.favorite ? 'red' : 'black'} />
        </TouchableOpacity>
        <Image source={{ uri:  animal.image ?`http://localhost:3000/${animal.image}`: mimi }} style={styles.animalImage} />
        <Text>{animal.nom}</Text>
        <Text>{animal.sexe}</Text>
        <Text>{animal.couleur}</Text>
        <Text>{animal.description}</Text>
        <Text>{animal.type}</Text>
        <Text>{animal.age}</Text>
    </View>
  );
};

export default SeeMore;
