import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import { Actions } from 'react-native-router-flux';
import { STRINGS } from './Localization';

const PhotoDetail = ({ photoId, title, date, imageUrl }) => {
  const {
    headerContentStyle,
    headerTextStyle,
    imageStyle
  } = styles;

  return (
    <Card>
      <CardSection>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{title} - {date}</Text>
        </View>
      </CardSection>

      <CardSection>
        <Image
          style={imageStyle}
          source={{ uri: imageUrl }}
        />
      </CardSection>

      <CardSection>
        <Button onPress={() => Linking.openURL(imageUrl)}>
          {STRINGS.largerPhoto}
        </Button>
      </CardSection>

      <CardSection>
        <Button onPress={() => Actions.commentList({photoId:photoId})}>
          {STRINGS.seeComments}
        </Button>
      </CardSection>
    </Card>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};

export default PhotoDetail;
