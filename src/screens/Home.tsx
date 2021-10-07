import React, { useCallback, useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import FriendList from '../components/FriendList';

interface Props {}

interface Data {
  id: number;
  name: string;
  likes: number;
}

const Home = (props: Props) => {
  const [name, setName] = useState('');
  const [friends, setFriends] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(`http://172.16.20.212:3333/friends?q=${name}`);
    const data = await res.json();
    const formattedData = data.map((item: Data) => {
      return {
        id: item.id,
        name: item.name,
        likes: item.likes,
        online: `${new Date().getHours()}:${new Date().getMinutes()}`,
      };
    });

    setFriends(formattedData);
  };

  const handleFollow = useCallback(() => {
    console.log('follow/unfollow user');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Amigos</Text>

      <TextInput
        placeholder="Nome do cliente"
        onChangeText={setName}
        style={styles.input}
      />

      <Button title="Buscar" onPress={handleSearch} />

      <ScrollView style={styles.list}>
        <FriendList data={friends} follow={handleFollow} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    padding: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 7,
    marginVertical: 10,
  },
  list: {
    marginTop: 20,
  },
});
