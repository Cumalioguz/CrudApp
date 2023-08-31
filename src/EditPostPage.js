import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,Image,Alert} from 'react-native';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const EditPostPage = () => {
  const [title, setTitle] = useState('Önceki Başlık');
  const [content, setContent] = useState('Önceki İçerik');

  const handleEditPost = () => {
    // Post düzenlemek için yapılacak işlemler
    // Örneğin, post verilerini bir API'ye gönderme veya bir veritabanında güncelleme

    // Post düzenlendikten sonra, başlık ve içerik alanlarını temizle
    setTitle('');
    setContent('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
         <Image source={require('./images/post1.png')} style={styles.image} />
        </View>

        <TextInput
          label="Başlık"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <TextInput
          label="İçerik"
          value={content}
          onChangeText={setContent}
          multiline
          style={styles.input}
        />

        <Button title="Düzenlemeyi Kaydet" onPress={handleEditPost} />

        <IconButton
          icon={({ size, color }) => <Icon name="trash" size={size} color={color} />}
          onPress={() => {}}
          style={styles.iconButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  contentContainer: {
    width: '80%',
    alignItems: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
    marginBottom: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: '90%',
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  input: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    width: '100%',
  },
  iconButton: {
    marginTop: 16,
  },
});

export default EditPostPage;
