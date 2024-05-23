import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import mimi from '../../Home/mimi.gif';
const Favorites = ({ navigation }) => {
  const [animals, setAnimals] = useState([]);
  const id = localStorage.getItem('id');
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      axios.get('http://localhost:3000/crud/allAnimal')
        .then((response) => {
          setAnimals(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching animals:', error);
        });
    });
    return unsubscribe;
  }, [navigation]);

  const handleToggleFavorite = async (id) => {
    try {
      await axios.post(`http://localhost:3000/crud/addFavorite/${id}`);
      setAnimals(prevAnimals => prevAnimals.map(animal =>
        animal.id === id ? { ...animal, favorite: !animal.favorite } : animal
      ));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/crud/animal/${id}`);
      setAnimals(animals.filter(animal => animal.id !== id));
    } catch (error) {
      console.error('Error deleting animal:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 10,
      backgroundColor: 'orange',
      borderRadius: 10,
      margin: 10,
    },
    animalInfo: {
      flex: 1,
      marginLeft: 10,
    },
    animalImage: {
      width: 130,
      height: 130,
      borderRadius: 70,
    },
    showButton: {
      backgroundColor: 'white',

      borderRadius: 5,
      padding: 5,
    },
    editButton: {
      backgroundColor: 'yellow',
      borderRadius: 5,
      padding: 5,
    },
    deleteButton: {
      backgroundColor: 'red',
      borderRadius: 5,
      padding: 5,
    },
    subtitle:{
      fontSize: 16,
      color: 'white',
      fontFamily: 'Arial',
      marginBottom: 10,
    },  
    title: {
      fontSize: 24,
      marginBottom: 20,
      color: 'white',
      fontFamily: 'Arial',
    },
    heartIcon: {
      position: 'abuttonsContainerbsolute',
      top: 5,
      right: 35,
    },
    buttonsContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '50%',

    },  
    addButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: 'rgb(239, 135, 11)',
      padding: 20,
      borderRadius: 100,
    },
    buttonText: {
      color: 'white',
      fontSize: 24,
      opacity:1,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <>
      <FlatList
        data={animals.filter((animal)=>animal.favorite === true)}
        renderItem={({ item }) => (
          <Animatable.View animation="fadeInUp" >
            <TouchableOpacity onPress={() => console.log('Pressed:', item.nom)}>
              <View style={styles.container}>
                <Image source={{ uri:  item.image ?`http://localhost:3000/${item.image}`: mimi }} style={styles.animalImage} />
                <View style={styles.animalInfo}>
                  <Text style={styles.title}>{item.nom}</Text>
                  <Text style={styles.subtitle}>Type : {item.type}</Text>
                  <Text style={styles.subtitle}>Couleur: {item.couleur}</Text>
                  <View style={styles.buttonsContainer}>

                    <TouchableOpacity 
                      style={styles.showButton} 
                      onPress={() => {
                        navigation.navigate('SeeMore', { animal: item });
                      }}>
                      <FontAwesome5 name="eye" size={20} color="orange" />
                    </TouchableOpacity>
                    {id.toString() === item.Personne.id.toString() &&
                    <>
                    <TouchableOpacity 
                      style={styles.editButton} 
                      onPress={() => {
                        navigation.navigate('Modification', { animal: item });
                      }}>
                      <FontAwesome5 name="pen" size={20} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={styles.deleteButton} 
                      onPress={() => handleDelete(item.id)}>
                      <FontAwesome5 name="trash-alt" size={20} color="white" />
                    </TouchableOpacity>
                    </>
                    }
                  </View>
                </View>
                <TouchableOpacity style={styles.heartIcon} onPress={() => handleToggleFavorite(item.id)}>
                  <FontAwesome5 name="heart" size={20} color={item.favorite ? 'red' : 'white'} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Animatable.View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </>
  );
};

export default Favorites;