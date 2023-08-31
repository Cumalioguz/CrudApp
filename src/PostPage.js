import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { Avatar, Button, Card, IconButton, List } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const testFirestoreConnection = async () => {
    try {
      const postsRef = firestore().collection('posts');
      const snapshot = await postsRef.get();
      snapshot.forEach((doc) => {
        console.log('Post ID:', doc.id);
        console.log('Post Data:', doc.data());
      });

    } catch (error) {
      console.error('Firestore bağlantısında hata oluştu:', error);
    }
  };
  
  // Firestore bağlantısını test etmek için bu fonksiyonu çağırın
  testFirestoreConnection();
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('posts')
      .onSnapshot((querySnapshot) => {
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title, // title alanını ekledik
          ...doc.data(),
        }));
        setPosts(postsData);
      });
  
    // Komponent çözüldüğünde listener'ı kaldır
    return () => unsubscribe();
  }, []);
  
  

  const handleFollowUser = (userId) => {
    Alert.alert('Sistem', 'Kullanıcı takip edildi');

    // Kullanıcıyı takip etme işlemleri
    // userId parametresi ile takip edilecek kullanıcının kimliği elde edilebilir
  };

  const handleDeletePost = (postId) => {
    Alert.alert('Sistem', 'Gönderi silindi');
    // Gönderiyi silme işlemleri
    // postId parametresi ile silinecek gönderinin kimliği elde edilebilir
  };

  const handleAddComment = (postId, comment) => {
    // Firestore bağlantısını al
    const db = firestore();

    // Yorum nesnesini oluştur
    const newComment = {
      text: comment,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    // İlgili gönderinin altındaki "comments" koleksiyonuna yorum ekle
    db.collection('posts')
      .doc(postId)
      .collection('comments')
      .add(newComment)
      .then(() => {
        console.log('Yorum eklendi');
      })
      .catch((error) => {
        console.error('Yorum eklenirken hata oluştu: ', error);
      });
  };

  const renderPostItem = ({ item }) => (
    <Card key={item.id} style={{ margin: 16 }}>
      <Card.Title
        title={item.userName}
        left={(props) => <Avatar.Image source={{ uri: item.image }} size={40} {...props} />}
        right={(props) => (
          <Button onPress={() => handleFollowUser(item.userId)} mode="outlined" {...props}>
            Takip Et
          </Button>
        )}
      />
      <Card.Cover source={{ uri: item.image }} />

      <Card.Content>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconButton icon="heart" onPress={() => {}} />
            <Text>{item.likes} Beğeni</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconButton icon="comment" onPress={() => {}} />
            <Text>{item.comments} Yorum</Text>
          </View>
        </View>

        <Button
          icon="delete"
          mode="outlined"
          onPress={() => handleDeletePost(item.id)}
          style={{ marginTop: 16, alignSelf: 'flex-end' }}
        >
          Sil
        </Button>
      </Card.Content>

      <Card.Content>
      <FlatList
  data={item.comments}
  renderItem={({ item }) => (
    <List.Item title={item.text} description={item.createdAt.toDate().toString()} />
  )}
  keyExtractor={(item) => item.id.toString()} // toString() kullanın
/>
        <Button
          icon="comment"
          mode="outlined"
          onPress={() => handleAddComment(item.id, 'Yeni yorum')}
          style={{ marginTop: 16, alignSelf: 'flex-end' }}
        >
          Yorum Ekle
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={{flex :1}}>
      <Text>
        {posts.title}
      </Text>
    </View>
  );
};

export default PostsPage;
