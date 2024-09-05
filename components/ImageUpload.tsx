import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { theme } from '../theme';

interface ImageUploadProps {
  onImageSelected?: (uri: string) => void;
}

const API_KEY = 'DEMO-API-KEY';
const API_URL = 'https://api.thecatapi.com/v1/images/upload';

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const { uri, type } = result.assets[0];
      onImageSelected?.(uri);
      return { uri, type: type || 'image/jpeg', name: uri.split('/').pop() || 'upload.jpg' };
    }
    return null;
  }, [onImageSelected]);

  const uploadImage = useCallback(async (file: { uri: string; type: string; name: string }) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file as any);
      formData.append('sub_id', 'russ-user-1');

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'x-api-key': API_KEY },
        body: formData,
      });

      setDialogMessage(response.ok ? 'Image uploaded successfully' : 'Failed to upload image');
    } catch (error) {
      console.error('Error uploading image:', error);
      setDialogMessage('An error occurred while uploading the image');
    } finally {
      setIsUploading(false);
      setDialogVisible(true);
    }
  }, []);

  const handleImageSelection = useCallback(async () => {
    const imageFile = await pickImage();
    if (imageFile) {
      await uploadImage(imageFile);
    }
  }, [pickImage, uploadImage]);

  return (
    <View style={styles.container}>
      <Button 
        mode="contained" 
        onPress={handleImageSelection}
        icon={isUploading ? 'loading' : 'upload'}
        disabled={isUploading}
        contentStyle={{ flexDirection: 'row-reverse' }}
        labelStyle={{ fontWeight: 'bold' }}
      >
        {isUploading ? 'Uploading...' : 'Choose Image'}
      </Button>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>{dialogMessage.startsWith('Image uploaded') ? 'Success' : 'Error'}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{dialogMessage}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.m,
  },
});

export default ImageUpload;