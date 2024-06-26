import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home/Login';
import Register from './components/Home/Register';
import AddAnimalForm from './components/Crud/Components/AddAnimalForm';
import EditAnimalForm from './components/Crud/Components/EditAnimalForm';
import AnimalList from './components/Crud/Components/AnimalList';
import SeeMore from './components/Crud/Components/SeeMore';
import Favorites from './components/Crud/Components/MyFavorites';
import Guest from './components/Crud/Components/Invité';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Home} /> 
        <Stack.Screen name="Register" component={Register} /> 
        <Stack.Screen name="Accueil" component={AnimalList} />
        <Stack.Screen name="Ajout" component={AddAnimalForm} />
        <Stack.Screen name="Modification" component={EditAnimalForm} initialParams={{ animal: null }} />
        <Stack.Screen name="SeeMore" component={SeeMore} initialParams={{ animal: null }} />
        <Stack.Screen name="Favoris" component={Favorites}/>
        <Stack.Screen name="Guest" component={Guest}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
