import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';
import mimi from '../../Home/mimi.gif';
const AnimalList = ({ navigation }) => {
  const [animals, setAnimals] = useState([]);

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
      borderBottomWidth: 1,
      backgroundColor: 'white'
    },
    animalInfo: {
      flex: 1,
      marginLeft: 10,
    },
    animalImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    editButton: {
      backgroundColor: 'orange',
      borderRadius: 5,
      padding: 5,
    },
    deleteButton: {
      backgroundColor: 'orange',
      borderRadius: 5,
      padding: 5,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      color: 'rgb(239, 135, 11)',
      fontFamily: 'Arial',
    },
    heartIcon: {
      position: 'absolute',
      top: 5,
      right: 35,
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
        data={animals}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => console.log('Pressed:', item.nom)}>
            <View style={styles.container}>
              <Image source={{ uri:  item.image ?`http://localhost:3000/${item.image}`: mimi }} style={styles.animalImage} />
              <View style={styles.animalInfo}>
                <Text style={styles.title}>{item.nom}</Text>
                <Text>{item.type}</Text>
                <Text>{item.couleur}</Text>
                <View style={styles.buttonsContainer}>

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
                </View>
              </View>
              <TouchableOpacity style={styles.heartIcon} onPress={() => handleToggleFavorite(item.id)}>
                <FontAwesome5 name="heart" size={20} color={item.favorite ? 'red' : 'black'} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    <TouchableOpacity
      style={styles.addButton}
      onPress={() => {
        navigation.navigate('Ajout');
      }}>
       <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
    </>
  );
};

export default AnimalList;