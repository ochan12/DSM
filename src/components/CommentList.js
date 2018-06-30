import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import axios from 'axios';
import CommentDetail from './CommentDetail';
import { STRINGS } from './Localization';

class CommentList extends Component {
  state = { comments: null };

  componentWillMount() {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.comments.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photo_id=${this.props.photoId}&format=json&nojsoncallback=1`)
      .then(response => this.setState({ comments: response.data.comments.comment }));
  }

  render() {
    if (!this.state.comments) { 
	    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0062DD'}}>
          <Text>
            {STRINGS.loading}
          </Text>
        </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#0062DD' }}>
            <FlatList data={this.state.comments} keyExtractor={(item, index) => item.id} renderItem={({item}) => <CommentDetail authorName={item.authorname} dateCreate={(new Date(parseInt(item.datecreate, 10)*1000)).toDateString()} content={item._content}/>} />
        </View>
    );
  }
}

export default CommentList;