import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Platform } from 'react-native';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const uploadImage = async () => {
    try {
      if (image === null) {
        return null;
      }

      const uploadUri = image;
      const filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

      // Add timestamp to File Name
      const extension = filename.split('.').pop();
      const name = filename.split('.').slice(0, -1).join('.');
      const timestamp = Date.now();
      const newFilename = `${name}_${timestamp}.${extension}`;

      const storageRef = storage().ref(`photos/${newFilename}`);
      const taskSnapshot = await storageRef.putFile(uploadUri);
      const url = await storageRef.getDownloadURL();

      return url;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleAddPost = async () => {
    try {
      // Gönderinin resmini yükle
      const imageUrl = await uploadImage();
  
      // Firestore bağlantısını al
      const db = firestore();
  
      // Gönderi nesnesini oluştur
      const post = {
        title: title,
        content: content,
        image: imageUrl,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };
  
      // "posts" koleksiyonuna gönderi ekle
      await db.collection('posts').doc().set(post);
  
      console.log('Gönderi eklendi');
      // Başlık ve içerik alanlarını temizle
      setTitle('');
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Gönderi eklenirken hata oluştu: ', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder} />
          )}
        </View>
        <View style={styles.button}>
          <Button title="Fotoğraf ekle" onPress={choosePhotoFromLibrary} />
        </View>
        <TextInput
          placeholder="Başlık"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="İçerik"
          value={content}
          onChangeText={setContent}
          multiline
          style={styles.input}
        />
        <Button title="Paylaş" onPress={handleAddPost} />
        <IconButton
          icon={({ size, color }) => <Icon name="trash" size={size} color={color} />}
          onPress={() => { }}
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
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  imagePlaceholder: {
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
  button: {
    margin: 16,
  },
});

export default AddPost;
