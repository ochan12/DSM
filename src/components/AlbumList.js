import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';
import { STRINGS } from './Localization';
import * as User from './User.js';

class AlbumList extends Component {
  state = { photoset: null, done: false };

  componentWillMount() {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=${User.getUserId()}&format=json&nojsoncallback=1`)
      .then(response => this.setState({ photoset: response.data.photosets.photoset, done: true }));
  }

  render() {
    if (!this.state.done) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0062DD' }}>
          <Text style={{ fontSize: 30, color: 'white' }}>
            {STRINGS.loading}
					</Text>
        </View>
      )
    }
    if (this.state.done && (!this.state.photoset || this.state.photoset.length == 0)) { 
			return (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0062DD' }}>
          <Text style={{ fontSize: 30, color: 'white' }}>
            {STRINGS.noResults}
				  </Text>
          <Text style={{ fontSize: 16, color: 'white' }}>
            {STRINGS.noResultsHelp}
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
