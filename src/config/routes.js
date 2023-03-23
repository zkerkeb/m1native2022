import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import styled from 'styled-components';
import Chat from '../screens/chat';
import Details from '../screens/details';
import Harry from '../screens/harry';
import Home from '../screens/home';
import Login from '../screens/login';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    AsyncStorage.getItem('token')
      .then(token => {
        setIsLoggedIn(!!token);
      })
      .catch(err => {
        // // console.log('🚀 ~ file: routes.js:6 ~ Routes ~ err', err);
      });
  }, []);

  return (
    <GlobalSafeArea>
      <NavigationContainer>
        {isLoggedIn ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home">
              {props => (
                <Home {...props} onLogout={() => setIsLoggedIn(false)} />
              )}
            </Stack.Screen>
            <Stack.Screen
              options={{
                headerShown: true,
              }}
              name="Details"
              component={Details}
            />
            <Stack.Screen name="Harry" component={Harry} />
            <Stack.Screen name="Chat" component={Chat} />
            {/* Ajoutez cette ligne */}
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Login">
              {props => (
                <Login {...props} onLogin={() => setIsLoggedIn(true)} />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </GlobalSafeArea>
  );
};

const GlobalSafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: red;
`;

export default Routes;
