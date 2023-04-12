import { useSearchParams } from 'expo-router';
import { Text, StyleSheet, FlatList, View } from 'react-native';
import UserProfileHeader from '../../src/components/UserProfileHeader';
import { useEffect, useState } from 'react';
import posts from '../../assets/data/posts';
import Post from '../../src/components/Post';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataStore } from 'aws-amplify';
import { User } from '../../src/models';

const ProfilePage = () => {
  const [user, setUser] = useState();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const { id } = useSearchParams();

  useEffect(() => {
    DataStore.query(User, id).then(setUser);
  }, [id]);

  // const user = users.find((u) => u.id === id);

  if (!user) {
    return (
      <SafeAreaView>
        <Text>User not found!</Text>
      </SafeAreaView>
    );
  }

  if (!isSubscribed) {
    return (
      <View>
        <UserProfileHeader
          user={user}
          isSubscribed={isSubscribed}
          setIsSubscribed={setIsSubscribed}
        />
        <View
          style={{
            backgroundColor: 'gainsboro',
            alignItems: 'center',
            padding: 20,
          }}
        >
          <AntDesign name="lock" size={50} color="gray" />
          <Text
            style={{
              backgroundColor: 'royalblue',
              height: 50,
              borderRadius: 25,
              overflow: 'hidden',
              padding: 15,
              color: 'white',
              margin: 20,
            }}
          >
            Subscribe to see user's post
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        ListHeaderComponent={() => (
          <UserProfileHeader
            user={user}
            isSubscribed={isSubscribed}
            setIsSubscribed={setIsSubscribed}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProfilePage;
