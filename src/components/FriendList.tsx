import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Friend from './Friend';

interface Props {
  data: {
    id: number;
    name: string;
    likes: number;
    online: string;
  }[];
  follow: () => void;
}

const FriendList = ({ data, follow }: Props) => {
  const totalLikes = useMemo(() => {
    return data.reduce((likes, friend) => {
      return likes + friend.likes;
    }, 0);
  }, [data]);

  return (
    <View>
      <Text>Total de likes: {totalLikes}</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Friend key={String(item.id)} data={item} follow={follow} />
        )}
      />
      {data.map((friend) => (
        <Friend key={String(friend.id)} data={friend} follow={follow} />
      ))}
    </View>
  );
};

export default FriendList;
