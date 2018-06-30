import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import AlbumList from './src/components/AlbumList.js';
import PhotoList from './src/components/PhotoList.js';
import CommentList from './src/components/CommentList.js';
import SettingsMenu from './src/components/SettingsMenu.js';
import { Router, Scene } from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';
import { STRINGS } from './src/components/Localization';

const App = () => (
  <Router>
    <Scene key="root">
      <Scene key="albumList" component={AlbumList} initial={true} onEnter={() => Actions.refresh({title: STRINGS.albumsTitle})} renderRightButton={() => SettingsButton}/>
      <Scene key="photoList" component={PhotoList} onEnter={() => Actions.refresh({title: STRINGS.photosTitle})} renderRightButton={() => SettingsButton}/>
      <Scene key="commentList" component={CommentList} onEnter={() => Actions.refresh({title: STRINGS.commentsTitle})} renderRightButton={() => SettingsButton}/>
      <Scene key="settingsMenu" component={SettingsMenu} onEnter={() => Actions.refresh({title: STRINGS.settingsTitle})} renderBackButton={() => {}} onBack={() => Actions.pop()}/>
    </Scene>
  </Router>
);

const SettingsButton = <TouchableOpacity onPress={() => Actions.settingsMenu({STRINGS})}>
  <Image source={require('./src/icons/settings-cog.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
</TouchableOpacity>;

export default App;