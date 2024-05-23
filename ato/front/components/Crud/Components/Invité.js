import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import mimi from '../../Home/mimi.gif';
const Guest = ({ navigation }) => {

  const nom = localStorage.getItem('nom');
  const [animals, setAnimals] = useState([]);
  const [search, setSearch] = useState(null);

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

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setSliderIndex((prevIndex) => (prevIndex + 1) % animals.length);
    }, 2000);

    return () => clearInterval(sliderInterval);
  }, [animals]);

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
    rightContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight: 20, 
    },
    subtitle:{
      fontSize: 16,
      color: 'white',
      fontFamily: 'Arial',
      marginBottom: 10,
    },  
    welpawText: {
      fontSize: 22,
      color: 'orange',
      fontFamily: 'Arial',
      marginTop:15
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
    input: {
      height: 40,
      borderColor: 'orange',
      borderWidth: 2,
      margin: 20,
      borderRadius: 5,
      padding: 5,
      color:'orange',
      fontSize:18,
      backgroundColor:'#ffffff'
    },
    optionText: {
      fontSize: 18,
      marginTop: 10,
      color: "rgb(239, 135, 11)",
    },
    Slidercontainer: {
      margin: 10,
      position: 'relative',
      width: 150, 
      height: 150, 
    },
    imageSlider: {
      width: '100%',
      height: '100%',
      borderRadius: 10, 
    },
    Slideroverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      padding: 10, 
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      borderRadius: 10, 
    },
    Slidernom: {
      fontSize: 16,
      color: 'white',
      fontFamily: 'Arial',
      marginBottom: 5, 
    },
    Slidertext: {
      fontSize: 14,
      color: 'white',
      fontFamily: 'Arial',
      marginBottom: 10, 
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Favoris')}>
          <Text style={styles.optionText}>Mes favoris <FontAwesome5 name="paw" size={20} color="rgb(239, 135, 11)" /> </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
      <TextInput style={styles.input} placeholder="Rechercher ici" value={search} onChangeText={setSearch} />
      
      <FlatList
        data={animals}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.Slidercontainer}>
            <Image source={{ uri: item.image ? `http://localhost:3000/${item.image}` : mimi }} style={styles.imageSlider} />
            <View style={styles.Slideroverlay}>
              <Text style={styles.Slidernom}>{item.nom}</Text>
              <Text style={styles.Slidertext}>{item.type} {item.couleur} {item.sexe}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

        {search === null ?
          <FlatList
            data={animals}
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
          :
          <FlatList
            data={animals.filter((animal)=>animal.nom.includes(search) || 
              animal.type.includes(search) || 
              animal.couleur.includes(search))}
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
                      <FontAwesome5 name="heart" size={20} color={item.favorite ? 'red' : 'white'} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Animatable.View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        }
      </View>
    </View>
  );
};

export default Guest;