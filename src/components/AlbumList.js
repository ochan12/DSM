import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';

class AlbumList extends Component {
  state = { photoset: null };

  componentWillMount() {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=31012926%40N03&format=json&nojsoncallback=1`)
      .then(response => this.setState({ photoset: response.data.photosets.photoset }));
  }

  render() {
    if (!this.state.photoset) { 
			return (
					<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0062DD'}}>
            <Text>
              Loading...
					  </Text>
          </View>
				);
    }

    return (
      <View style={{ flex: 1, backgroundColor: '#0062DD' }}>
        <FlatList data={this.state.photoset} keyExtractor={(item, index) => item.id} renderItem={({item}) => <AlbumDetail title={item.title._content} albumId={item.id} />} />
      </View>
    );
  }
}

export default AlbumList;
