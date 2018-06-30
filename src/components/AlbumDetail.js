import React from 'react';
import { Text, View } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import { Actions } from 'react-native-router-flux';
import { STRINGS } from './Localization';

const AlbumDetail = ({ title, albumId }) => {
  const {
    headerContentStyle,
    headerTextStyle,
  } = styles;

  return (
    <Card>
      <CardSection>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{title}</Text>
        </View>
      </CardSection>

      <CardSection>
        <Button onPress={() => Actions.photoList({albumId:albumId})}>
          {STRINGS.seePhotos}
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
    fontSize: 18,
    textAlign: 'center'
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};

export default AlbumDetail;
