import { Button, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useSession } from './ctx';
import { router } from 'expo-router';

export default function Login() {
    const { signIn } = useSession();
    const handleLogin = () => {
        //Adicione sua lógica de login aqui
        signIn();
        //Antes de navegar, tenha certeza de que o usuário está autenticado
        router.replace('/');
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo!</Text>
      <Text>This is a simple repo that emulates a login authentication flow using Expo Router.</Text>
      <Text>Because this is focused on the navigation aspect, the logic itself of the app is not connected to any API.</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TextInput 
        placeholder='Username(not required)'
        style={styles.input}
        />
        <TextInput
        placeholder='Password(not required)'
        secureTextEntry
        style={styles.input}
        
        />
        <Button
        title='Login'
        onPress={handleLogin}
        />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    margin: 10,
    borderRadius: 4

  }
});
