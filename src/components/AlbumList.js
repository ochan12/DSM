import React, { Component } from 'react';
import { List, Text, FlatList, ListItem, View } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';

class AlbumList extends Component {
  state = { photoset: null };

  componentWillMount() {
    axios.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=9b35e974ed17df61d20af400812b5ad3&user_id=98198942%40N06&format=json&nojsoncallback=1&auth_token=72157692521296180-34ad3166fc0f8bfe&api_sig=0776095a82569342197489cc30502aae')
      .then(response => this.setState({ photoset: response.data.photosets.photoset }));
  }

  // renderAlbums() {
  //   return this.state.photoset.map(album =>
  //     <AlbumDetail key={album.id} title={album.title._content}  albumId={album.id}  />
  //   );
  // }

  render() {
    console.log(this.state);


    if (!this.state.photoset) {
      return (
        <Text>
          Loading...
					</Text>
      );
    }

    // return (
    //   <View style={{ flex: 1 }}>
    //     <ScrollView>
    //       {this.renderAlbums()}
    //     </ScrollView>
    //   </View>
    // );

    return (
      <View>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={this.state.photoset}
            renderItem={({ item }) => (
              <ListItem
                roundAvatar
                title={item.title}
                subtitle={item.description.count_views}
                // avatar={{ uri: item.picture.thumbnail }}
                containerStyle={{ borderBottomWidth: 0 }}
              />
            )}
            keyExtractor={item => item.email}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={50}
          />
        </List>
      </View>
    );
  }
}

export default AlbumList;
