import React, { useState, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import MapView, { Marker } from 'react-native-maps';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationAccuracy
} from 'expo-location';

import {
    ActivityIndicator,
    ScrollView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';

import {
    Background,
    AreaInput,
    Input,
    Link,
    LinkText,
    SubmitButton,
    SubmitText
} from '../SignIn/styles';

import {
    Container,
    ImageArea,
    SelectedImageArea,
    EventImageArea,
    DateTimeArea,
    MapArea,
    SelectedMapArea,
    SelectionArea,
    DescriptionInput,
    CancelButton,
    CancelText
} from './styles';


const useImagePicker = () => {
    const [selectedImage, setSelectedImage] = useState('');
    const [imageLoading, setImageLoading] = useState(false);

    const handleSelectImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need media library permissions to make this work!');
            return;
        }

        setImageLoading(true);
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
        setImageLoading(false);
    };

    return { selectedImage, setSelectedImage, imageLoading, setImageLoading, handleSelectImage };
};


const useLocationPicker = () => {
    const [location, setLocation] = useState(null);
    const [mapLoading, setMapLoading] = useState(false);

    const handleSelectLocation = async () => {
        const { status } = await requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need location permissions to make this work!');
            return;
        }

        setMapLoading(true);
        const currentLocation = await getCurrentPositionAsync({ accuracy: LocationAccuracy.Highest });
        setLocation(currentLocation);
        setMapLoading(false);
    };

    return { location, setLocation, mapLoading, setMapLoading, handleSelectLocation };
};


export default function CreateEvent() {
    const [loading, setLoading] = useState(false);

    const { selectedImage, setSelectedImage, imageLoading, handleSelectImage } = useImagePicker();
    const { location, setLocation, mapLoading, handleSelectLocation } = useLocationPicker();

    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [selectedStartTime, setSelectedStartTime] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const [selectedEndTime, setSelectedEndTime] = useState(new Date());
    const [selectedModality, setSelectedModality] = useState('');

    const [eventName, setEventName] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [eventDescription, setEventDescription] = useState('');

    const handleEventName = useCallback((eventName) => {
        setEventName(eventName);
    }, []);

    const handleStartDate = (event, selectedStartDate) => {
        setSelectedStartDate(selectedStartDate);
        console.log(selectedStartDate);
    }

    const handleStartTime = (event, selectedStartTime) => {
        setSelectedStartTime(selectedStartTime);
        console.log(selectedStartTime);
    }

    const handleEndDate = (event, selectedEndDate) => {
        setSelectedEndDate(selectedEndDate);
        console.log(selectedEndDate);
    }

    const handleEndTime = (event, selectedEndTime) => {
        setSelectedEndTime(selectedEndTime);
        console.log(selectedEndTime);
    }

    const handleSelectModality = useCallback((selectedModality) => {
        setSelectedModality(selectedModality);
        console.log(selectedModality);
    }, []);

    const handleNumberOfPeople = useCallback((numberOfPeople) => {
        setNumberOfPeople(setNumberOfPeople);
    }, []);

    const handleEventDescription = useCallback((eventDescription) => {
        setEventDescription(eventDescription);
    }, []);

    const onSubmitCreateEventHandler = () => {
        setLoading(true);
        console.log('Event created.');
        alert('Event created.');
        setLoading(false);
    };

    const onSubmitCancelEventHandler = () => {
        setLoading(true);
        setSelectedImage('');
        setEventName('');
        setSelectedStartDate(new Date());
        setSelectedModality('');
        setNumberOfPeople('');
        setEventDescription('');
        setLocation(null);
        setLoading(false);
        console.log('Event cancelled.');
        alert('Event cancelled.');
    }

    return (
        <Background>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAwareScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                    enableAutomaticScroll={true}
                    extraScrollHeight={50}
                >
                    <SubmitButton activeOpacity={0.8} onPress={handleSelectImage}>
                        <SubmitText>Select Image</SubmitText>
                    </SubmitButton>

                    <ImageArea>
                        {imageLoading && <ActivityIndicator size='large' color='#0000ff' />}

                        {selectedImage && (
                            <SelectedImageArea>
                                <EventImageArea
                                    source={{ uri: selectedImage }}
                                />
                                <Link onPress={() => setSelectedImage('')}>
                                    <LinkText>Reset Image</LinkText>
                                </Link>
                            </SelectedImageArea>
                        )}
                    </ImageArea>

                    <AreaInput>
                        <Input
                            placeholder='Event Name'
                            value={eventName}
                            onChangeText={handleEventName}
                        />
                    </AreaInput>

                    <DateTimeArea>
                        <LinkText>Start</LinkText>

                        <DateTimePicker
                            value={selectedStartDate}
                            mode={'date'}
                            display='default'
                            minimumDate={new Date()}
                            onChange={handleStartDate}
                        />

                        <DateTimePicker
                            value={selectedStartTime}
                            mode={'time'}
                            display='default'
                            is24Hour={true}
                            onChange={handleStartTime}
                        />
                    </DateTimeArea>

                    <DateTimeArea>
                        <LinkText>End  </LinkText>

                        <DateTimePicker
                            value={selectedEndDate}
                            mode={'date'}
                            display='default'
                            minimumDate={selectedStartDate}
                            onChange={handleEndDate}
                        />

                        <DateTimePicker
                            value={selectedEndTime}
                            mode={'time'}
                            display='default'
                            is24Hour={true}
                            minimumDate={selectedStartTime}
                            onChange={handleEndTime}
                        />
                    </DateTimeArea>

                    <SelectionArea>
                        <RNPickerSelect
                            value={selectedModality}
                            onValueChange={handleSelectModality}
                            placeholder={{
                                label: 'Select a modality'
                            }}
                            items={[
                                { label: 'Soccer', value: 'soccer' },
                                { label: 'Basketball', value: 'basketball' },
                                { label: 'Volleyball', value: 'volleyball' },
                                { label: 'Running', value: 'running' },
                                { label: 'Tennis', value: 'tennis' },
                                { label: 'Cycling', value: 'cycling' },
                                { label: 'Swimming', value: 'swimming' },
                                { label: 'Walking', value: 'walking' },
                                { label: 'E-Sports', value: 'e-sports' },
                                { label: 'Others', value: 'others' },
                            ]}
                            style={{
                                inputIOS: {
                                    fontSize: 17,
                                    color: '#121212'
                                },
                                inputAndroid: {
                                    fontSize: 17,
                                    color: '#121212'
                                },
                            }}
                        />
                    </SelectionArea>

                    <SubmitButton onPress={handleSelectLocation}>
                        <SubmitText>Location</SubmitText>
                    </SubmitButton>

                    <MapArea>
                        {mapLoading && <ActivityIndicator size='large' color='#0000ff' />}

                        {location && (
                            <SelectedMapArea>
                                <MapView
                                    style={{
                                        aspectRatio: 1,
                                        width: '90%',
                                        borderRadius: 8,
                                        padding: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    region={{
                                        latitude: location.coords.latitude,
                                        longitude: location.coords.longitude,
                                        latitudeDelta: 0.005,
                                        longitudeDelta: 0.005,
                                    }}
                                >
                                    <Marker
                                        coordinate={{
                                            latitude: location.coords.latitude,
                                            longitude: location.coords.longitude
                                        }}
                                        title='Event Location'
                                        description='This is the event location.'
                                    />
                                </MapView>
                                <Link onPress={() => setLocation(null)}>
                                    <LinkText>Reset Location</LinkText>
                                </Link>
                            </SelectedMapArea>
                        )}
                    </MapArea>

                    <AreaInput>
                        <Input
                            value={numberOfPeople}
                            onChangeText={handleNumberOfPeople}
                            keyboardType='numeric'
                            placeholder='Number of People'
                            maxLength={5}
                        />
                    </AreaInput>

                    <AreaInput>
                        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                            <DescriptionInput
                                value={eventDescription}
                                onChangeText={handleEventDescription}
                                placeholder='Event Description'
                                multiline={true}
                            />
                        </ScrollView>
                    </AreaInput>

                    {loading && <ActivityIndicator size='large' color='#0000ff' />}

                    <SubmitButton activeOpacity={0.8} onPress={onSubmitCreateEventHandler}>
                        <SubmitText>Create</SubmitText>
                    </SubmitButton>

                    <CancelButton activeOpacity={0.8} onPress={onSubmitCancelEventHandler}>
                        <CancelText>Cancel</CancelText>
                    </CancelButton>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        </Background >
    );
}