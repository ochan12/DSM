import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import axios from 'axios';
import PhotoDetail from './PhotoDetail';
import { STRINGS } from './Localization';
import * as PhotosOrdering from './PhotosOrdering.js';

class PhotoList extends Component {
  state = { photos: null, done: false };

  componentWillMount() {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=${this.props.albumId}&user_id=31012926%40N03&enable_extras=on&extras=date_upload&format=json&nojsoncallback=1`)
      .then(response => this.setState({ photos: response.data.photoset.photo, done: true }));
  }

  reorderChrono() {
    this.state.photos.sort(function (a, b) {
      var nameA = a.dateupload, nameB = b.dateupload;
      if (nameA < nameB) //sort string ascending
        return -1;
      if (nameA > nameB)
        return 1;
      return 0; //default return value (no sorting)
    });
  }

  reorderAlpha() {
    this.state.photos.sort(function (a, b) {
      var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase();
      if (nameA < nameB) //sort string ascending
        return -1;
      if (nameA > nameB)
        return 1;
      return 0; //default return value (no sorting)
    });
  }

  render() {
    if (!this.state.done) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0062DD' }}>
          <Text>
            {STRINGS.loading}
					</Text>
        </View>
      )
    }
    if (this.state.done && !this.state.photos) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0062DD' }}>
          <Text>
            {STRINGS.noResults}
					</Text>
        </View>
      )
    }
    if (PhotosOrdering.getPhotosOrdering() == "alpha") this.reorderAlpha();
    return (
      <View style={{ flex: 1, backgroundColor: '#0062DD' }}>
        <FlatList data={this.state.photos} keyExtractor={(item, index) => item.id} renderItem={({item}) => <PhotoDetail photoId={item.id} title={item.title} date={(new Date(parseInt(item.dateupload, 10)*1000)).toLocaleDateString()} imageUrl={`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`} />} />
      </View>
    );
  }
}

export default PhotoList;
