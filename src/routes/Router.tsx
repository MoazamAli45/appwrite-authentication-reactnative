import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import AppwriteContext from '../appwrite/AppwriteContext';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {ActivityIndicator} from 'react-native';
import Loading from '../components/Loading';

const Router = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const {appwrite, isLoggedIn, setIsLoggedIn} = useContext(AppwriteContext);

  useEffect(() => {
    //   GETUSER IF PRESENT THEN LOGGED IN ELSE NOT
    appwrite
      .getCurrentUser()
      .then(user => {
        console.log(user);
        setIsLoading(false);
        if (user) {
          setIsLoggedIn(true);
        }
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
        setIsLoggedIn(false);
      });
  }, [appwrite, setIsLoggedIn]);

  if (isLoading) {
    console.log('loading');
    return <Loading />;
  }

  console.log(isLoggedIn, 'LOGGED IN');

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;
