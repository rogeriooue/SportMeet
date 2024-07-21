import React, { useState, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import MapView, { Marker } from 'react-native-maps';
import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationAccuracy
} from 'expo-location';

import {
    View,
    ActivityIndicator,
    ScrollView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';

import {
    Background,
    Container,
    AreaInput,
    Input,
    Link,
    LinkText,
    SubmitButton,
    SubmitText
} from '../SignIn/styles';

import {
    ImageView,
    SelectedImageView,
    EventImage,
    DateTimeArea,
    SelectionArea,
    DescriptionInput,
    CancelButton,
    CancelText
} from './styles';


export default function CreateEvent() {
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [mapLoading, setMapLoading] = useState(false);

    const [selectedImage, setSelectedImage] = useState('');
    const [location, setLocation] = useState(null);

    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [selectedStartTime, setSelectedStartTime] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const [selectedEndTime, setSelectedEndTime] = useState(new Date());
    const [selectedModality, setSelectedModality] = useState('');

    const [eventName, setEventName] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [eventDescription, setEventDescription] = useState('');

    const handleSelectImage = useCallback(async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            const { status: newStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (newStatus !== 'granted') {
                alert('Sorry, we need media library permissions to make this work!');
                return;
            }
        }

        try {
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
        } catch (error) {
            alert('Error selecting image. Please try again.');
            console.error(error);
        } finally {
            setImageLoading(false);
        }
    }, []);

    const handleSelectLocation = useCallback(async () => {
        const { status } = await requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            const { status: newStatus } = await requestForegroundPermissionsAsync();
            if (newStatus !== 'granted') {
                alert('Sorry, we need location permissions to make this work!');
                return;
            }
        }

        try {
            setMapLoading(true);

            const currentLocation = await getCurrentPositionAsync({
                accuracy: LocationAccuracy.Highest,
            });
            setLocation(currentLocation);
            console.log(currentLocation);
        } catch (error) {
            alert('Error selecting location. Please try again.');
            console.error(error);
        } finally {
            setMapLoading(false);
        }

    }, []);

    const handleEventNameChange = useCallback((text) => {
        setEventName(text);
    }, []);

    const handleStartDateChange = useCallback((event, selectedStartDate) => {
        setSelectedStartDate(selectedStartDate);
        console.log(selectedStartDate);
    }, []);

    const handleStartTimeChange = useCallback((event, selectedStartTime) => {
        setSelectedStartTime(selectedStartTime);
        console.log(selectedStartTime);
    }, []);

    const handleEndDateChange = useCallback((event, selectedEndDate) => {
        setSelectedEndDate(selectedEndDate);
        console.log(selectedEndDate);
    }, []);

    const handleEndTimeChange = useCallback((event, selectedEndTime) => {
        setSelectedEndTime(selectedEndTime);
        console.log(selectedEndTime);
    }, []);

    const handleSelectModality = useCallback((selectedModality) => {
        setSelectedModality(selectedModality);
        console.log(selectedModality);
    }, [selectedModality]);

    const handlePeopleChange = useCallback((value) => {
        setNumberOfPeople(value);
    }, []);

    const handleDescriptionChange = useCallback((text) => {
        setEventDescription(text);
    }, []);

    const handleCreateEvent = () => {
        setLoading(true);
        console.log('Event created.');
        alert('Event created.');
        setLoading(false);
    };

    const handleCancelEvent = useCallback(() => {
        setLoading(true);
        setSelectedImage('');
        setEventName('');
        setSelectedStartDate(new Date());
        setSelectedStartTime(new Date());
        setSelectedEndDate(new Date());
        setSelectedEndTime(new Date());
        setSelectedModality('');
        setNumberOfPeople('');
        setEventDescription('');
        setLocation(null);
        setLoading(false);
        console.log('Event cancelled.');
        alert('Event cancelled.');
    }, []);

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Background>
                    <Container
                        behavior={Platform.OS === 'ios' ? 'padding' : ''}
                        enabled
                    >

                        <SubmitButton activeOpacity={0.8} onPress={handleSelectImage}>
                            <SubmitText>Select Image</SubmitText>
                        </SubmitButton>

                        <ImageView>
                            {imageLoading && <ActivityIndicator size='large' color='#0000ff' />}

                            {selectedImage && (
                                <SelectedImageView>
                                    <EventImage
                                        source={{ uri: selectedImage }}
                                    />
                                    <Link onPress={() => setSelectedImage('')}>
                                        <LinkText>Reset Image</LinkText>
                                    </Link>
                                </SelectedImageView>
                            )}
                        </ImageView>

                        <AreaInput>
                            <Input
                                placeholder='Event Name'
                                value={eventName}
                                onChangeText={handleEventNameChange}
                            />
                        </AreaInput>

                        <DateTimeArea>
                            <LinkText>Start</LinkText>

                            <DateTimePicker
                                value={selectedStartDate}
                                mode={'date'}
                                display='default'
                                minimumDate={new Date()}
                                onChange={handleStartDateChange}
                            />

                            <DateTimePicker
                                value={selectedStartTime}
                                mode={'time'}
                                display='default'
                                is24Hour={true}
                                onChange={handleStartTimeChange}
                            />
                        </DateTimeArea>

                        <DateTimeArea>
                            <LinkText>End  </LinkText>

                            <DateTimePicker
                                value={selectedEndDate}
                                mode={'date'}
                                display='default'
                                minimumDate={new Date()}
                                onChange={handleEndDateChange}
                            />

                            <DateTimePicker
                                value={selectedEndTime}
                                mode={'time'}
                                display='default'
                                is24Hour={true}
                                onChange={handleEndTimeChange}
                            />
                        </DateTimeArea>

                        <SelectionArea>
                            <RNPickerSelect
                                onValueChange={handleSelectModality}
                                value={selectedModality}
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

                        <SubmitButton activeOpacity={0.8} onPress={handleSelectLocation}>
                            <SubmitText>Location</SubmitText>
                        </SubmitButton>

                        <View
                            style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                        >
                            {mapLoading && <ActivityIndicator size='large' color='#0000ff' />}

                            {location && (
                                <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 15 }}>
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
                                            latitudeDelta: 0.007,
                                            longitudeDelta: 0.007,
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
                                </View>
                            )}
                        </View>

                        <AreaInput>
                            <Input
                                value={numberOfPeople}
                                onChangeText={handlePeopleChange}
                                keyboardType='numeric'
                                placeholder='Number of People'
                                maxLength={5}
                            />
                        </AreaInput>

                        <AreaInput>
                            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                                <DescriptionInput
                                    value={eventDescription}
                                    onChangeText={handleDescriptionChange}
                                    placeholder='Event Description'
                                    multiline={true}
                                />
                            </ScrollView>
                        </AreaInput>

                        {loading && <ActivityIndicator size='large' color='#0000ff' />}

                        <SubmitButton activeOpacity={0.8} onPress={handleCreateEvent}>
                            <SubmitText>Create</SubmitText>
                        </SubmitButton>

                        <CancelButton activeOpacity={0.8} onPress={handleCancelEvent}>
                            <CancelText>Cancel</CancelText>
                        </CancelButton>

                    </Container>
                </Background>
            </TouchableWithoutFeedback>
        </ScrollView >
    );
}