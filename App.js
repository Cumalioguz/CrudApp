import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import AddPost from './src/AddPost';
import EditPostPage from './src/EditPostPage';
import PostPage from './src/PostPage';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007AFF',
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'AddPost') {
                iconName = 'plus';
              } else if (route.name === 'EditPost') {
                iconName = 'pencil';
              } else if (route.name === 'Home') {
                iconName = 'home';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#007AFF',
            inactiveTintColor: 'gray',
          }}
          tabBarStyle={{
            backgroundColor: '#f2f2f2',
            height: 70,
          }}
        >
          <Tab.Screen name="Home" component={PostPage} />
          <Tab.Screen name="AddPost" component={AddPost} />
          <Tab.Screen name="EditPost" component={EditPostPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
