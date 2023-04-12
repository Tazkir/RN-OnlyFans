import { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { DataStore } from 'aws-amplify';
import { Post } from '../src/models';
import { useAuthenticator } from '@aws-amplify/ui-react-native';

const NewPost = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');

  const { user } = useAuthenticator();

  const onPost = async () => {
    console.warn('Post: ', text);
    await DataStore.save(
      new Post({ text, likes: 0, userID: user.attributes.sub })
    );
    setText();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const router = useRouter();

  return (
    <SafeAreaView style={{ margin: 10 }}>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
      >
        <Ionicons
          onPress={() => router.back()}
          name="arrow-back"
          size={28}
          color="black"
          style={{ marginRight: 10 }}
        />
        <Text style={{ fontWeight: '500', fontSize: 20 }}>New Post</Text>
      </View>

      <TextInput
        placeholder="Compose new pose..."
        value={text}
        onChangeText={setText}
        multiline
        numberOfLines={3}
      />

      <View style={{ marginVertical: 10 }}>
        <Ionicons
          name="md-image-outline"
          size={20}
          color="gray"
          onPress={pickImage}
        />
      </View>

      {image && <Image src={image} style={{ width: '100%', aspectRatio: 1 }} />}

      <Button title="Post" onPress={onPost} />
    </SafeAreaView>
  );
};

export default NewPost;
