import React, { useState } from 'react';
import { View, TextInput, Button, Image, TouchableOpacity, Text } from 'react-native';
import mimi from '../../Home/mimi.gif';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
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
        width: "100%",
        minHeight: 300, 
    },
    container: {
        display: 'flex',
        alignContent: 'center',
 
       
        backgroundColor: "orange",
    },
    descriptionConteiner : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    description: {
        width: '70%',
        display: 'flex',
        justifyContent: 'start',
        paddingLeft: 10,
        textAlign: 'center'
    },  
    text : {
        fontSize: 20,
        marginBottom: 10,
        color: 'white',
    },
    nom:{
        fontSize: 40,
        marginBottom: 10,
        color: 'white',
        fontStyle:'Italic'
    }

  }
  

  return (
    <Animatable.View animation="fadeInLeft" >

    
    <View style={styles.container}>
      
      <Image source={{ uri:  animal.image ?`http://localhost:3000/${animal.image}`: mimi }} style={styles.animalImage} />        <View style={styles.descriptionConteiner}>
          <View style={styles.description}>
            <Text style={styles.nom} >{animal.nom}</Text>
            <Text style={styles.text} >Description: {animal.description}</Text>
            <Text style={styles.text} >Sexe: {animal.sexe}</Text>
            <Text style={styles.text} >Couleur: {animal.couleur}</Text>
            <Text style={styles.text} >Type: {animal.type}</Text>
            <Text style={styles.text} >Age: {animal.age}</Text>
          </View>
            <Animatable.View animation="pulse" easing="ease-out" iterationCount={1}>
              <TouchableOpacity style={styles.heartIcon} onPress={() => handleToggleFavorite(animal.id)}>
                <FontAwesome5 name="heart" size={20} color={animal.favorite ? 'red' : 'white'} />
              </TouchableOpacity>
            </Animatable.View>
        </View>
    </View>
    </Animatable.View>
  );
};

export default SeeMore;
