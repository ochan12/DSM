import React, { Component } from 'react';
import { View, Image, Text, ScrollView, TextInput } from 'react-native';
import EnglishFlag from '../icons/en-flag.png';
import SpanishFlag from '../icons/sp-flag.png';
import ChronoIcon from '../icons/chrono.png';
import AlphaIcon from '../icons/alpha.png';
import { STRINGS } from './Localization';
import * as PhotosOrdering from './PhotosOrdering.js';
import LocalizedStrings from 'react-localization';
import { Actions, ActionConst } from 'react-native-router-flux';
import Button from './Button.js';
import Card from './Card.js';
import CardSection from './CardSection.js';
import * as User from './User.js';
import axios from 'axios';

class SettingsMenu extends Component {
    settingsStrings = new LocalizedStrings({
        en: {
            settingsTitle: "Settings",
            langLabel: "Language",
            langName: "English",
            changeAction: "Change",
            orderLabel: "Photos Order",
            orderNameChrono: "Chronological",
            orderNameAlpha: "Alphabetical",
            accept: "Accept",
            acceptInst: "Press to accept changes and go back to albums",
            user: "User",
            phUser: "User Name",
            validate: "Find",
            current: "Current",
            new: "New",
            last: "Old",
            notFound: "Not Found",
            searching: "Searching",
            foundAlert: "User found",
            notFoundAlert: "User not found, try another one!",
            sameUser: "This is already the current user!",
            settingsTitle: "Settings"
        },
        sp: {
            settingsTitle: "Ajustes",
            langLabel: "Lenguaje",
            langName: "Español",
            changeAction: "Cambiar",
            orderLabel: "Orden de Fotos",
            orderNameChrono: "Cronológico",
            orderNameAlpha: "Alfabético",
            accept: "Aceptar",
            acceptInst: "Presionar para aceptar cambios y volver a álbumes",
            user: "Usuario",
            phUser: "Nombre de Usuario",
            validate: "Buscar",
            current: "Actual",
            new: "Nuevo",
            last: "Anterior",
            notFound: "No Encontrado",
            searching: "Buscando",
            foundAlert: "Usuario encontrado",
            notFoundAlert: "Usuario no encontrado, prueba otro!",
            sameUser: "¡Este ya es el usuario actual!",
            settingsTitle: "Configuración"
        }
    })
    languageFlag = STRINGS.getLanguage() == 'en' ? EnglishFlag : SpanishFlag
    orderIcon = PhotosOrdering.getPhotosOrdering() == 'chrono' ? ChronoIcon : AlphaIcon
    orderName = PhotosOrdering.getPhotosOrdering() == 'chrono' ? STRINGS.orderNameChrono : STRINGS.orderNameAlpha
    state = { language: STRINGS.getLanguage(), order: PhotosOrdering.getPhotosOrdering(), username: '', id: '', text: User.getUser(), userChanged: false }

    componentWillMount() {
        this.settingsStrings.setLanguage(STRINGS.getLanguage());
    }

    componentWillUnmount() {
        this.acceptChanges();
    }

    changeLanguage(lang) {
        this.settingsStrings.setLanguage(lang);
        this.languageFlag = (lang == 'en' ? EnglishFlag : SpanishFlag);
        this.setState({ language: lang });
        Actions.refresh({ title: this.settingsStrings.settingsTitle });
    }

    changeOrder(ord) {
        this.orderIcon = (ord == 'chrono' ? ChronoIcon : AlphaIcon);
        this.orderName = ord == 'chrono' ? this.settingsStrings.orderNameChrono : this.settingsStrings.orderNameAlpha;
        this.setState({ order: ord });
    }

    changeUser() {
        if (this.state.text != User.getUser()) {
            axios.get(`https://api.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key=6e8a597cb502b7b95dbd46a46e25db8d&username=${this.state.text}&format=json&nojsoncallback=1`)
            .then((response => {this.setState({ username: response.data.user.username._content, id: response.data.user.id, userChanged: true }); 
                alert(this.settingsStrings.foundAlert + ':\n' + this.state.username + '\n(ID: ' + this.state.id + ')')}))
            .catch(() => alert(this.settingsStrings.notFoundAlert));
        } else {
            alert(this.settingsStrings.sameUser);
        }
    }

    acceptChanges() {
        STRINGS.setLanguage(this.state.language);
        PhotosOrdering.setPhotosOrdering(this.state.order);
        if (this.state.userChanged) {
            User.setUser(this.state.username);
            User.setUserId(encodeURIComponent(this.state.id));
        }
        Actions.albumList({ type: ActionConst.RESET, title: STRINGS.albumsTitle });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#0062DD' }}>
                <ScrollView>
                    <Card>
                        <CardSection>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}> {this.settingsStrings.user} </Text>
                        </CardSection>
                        <CardSection>
                            <TextInput defaultValue={User.getUser()} underlineColorAndroid='transparent' autoCapitalize={'none'} onChangeText={(text) => this.setState({text})} style={{ marginLeft: 5, marginRight: 5 }}/>
                        </CardSection>
                        <CardSection>
                            <Button onPress={() => this.changeUser()}> {this.settingsStrings.changeAction} </Button>
                        </CardSection>
                        {this.state.userChanged ? 
                            <CardSection>
                                <Text>{this.settingsStrings.last}: {User.getUser()} (ID: {decodeURIComponent(User.getUserId())})</Text>
                            </CardSection> : 
                        <CardSection>
                            <Text>{this.settingsStrings.current}: {User.getUser()} (ID: {decodeURIComponent(User.getUserId())}) </Text>
                        </CardSection> }
                        {this.state.userChanged ? 
                            <CardSection>
                                <Text>{this.settingsStrings.new}: {this.state.username} (ID: {this.state.id})</Text>
                            </CardSection> : null }
                    </Card>
                    <Card>
                        <CardSection>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}> {this.settingsStrings.langLabel} </Text>
                        </CardSection>
                        <CardSection>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={this.languageFlag} style={{ width: 60, height: 60 }} />
                                <Text style={{ fontSize: 18 }}> {this.settingsStrings.langName} </Text>
                            </View>
                        </CardSection>
                        <CardSection>
                            <Button onPress={() => this.state.language == 'en' ? this.changeLanguage('sp') : this.changeLanguage('en')}> {this.settingsStrings.changeAction} </Button>
                        </CardSection>
                    </Card>
                    <Card>
                        <CardSection>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}> {this.settingsStrings.orderLabel} </Text>
                        </CardSection>
                        <CardSection>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={this.orderIcon} style={{ width: 60, height: 60 }} />
                                <Text style={{ fontSize: 18 }}> {this.state.order == 'chrono' ? this.settingsStrings.orderNameChrono : this.settingsStrings.orderNameAlpha} </Text>
                            </View>
                        </CardSection>
                        <CardSection>
                            <Button onPress={() => this.state.order == 'chrono' ? this.changeOrder('alpha') : this.changeOrder('chrono')}> {this.settingsStrings.changeAction} </Button>
                        </CardSection>
                    </Card>
                </ScrollView>
            </View>
        );
    }
}

export default SettingsMenu;