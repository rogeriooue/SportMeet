import React, { useState, useCallback, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

import {
    View,
    Image,
    ActivityIndicator,
    Text,
    TouchableOpacity,
    TextInput,
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
    const [eventName, setEventName] = useState('');
    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [selectedStartTime, setSelectedStartTime] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const [selectedEndTime, setSelectedEndTime] = useState(new Date());
    const [selectedImage, setSelectedImage] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [selectedModality, setSelectedModality] = useState('');

    const handleEventNameChange = useCallback((eventName) => {
        setEventName(eventName);
    }, []);

    const handleStartDateChange = (event, selectedDate) => {
        setSelectedStartDate(selectedDate || selectedStartDate);
    };

    const handleStartTimeChange = (event, selectedDate) => {
        setSelectedStartTime(selectedDate || selectedStartTime);
    };

    const handleEndDateChange = (event, selectedDate) => {
        setSelectedEndDate(selectedDate || selectedEndDate);
    };

    const handleEndTimeChange = (event, selectedDate) => {
        setSelectedEndTime(selectedDate || selectedEndTime);
    };

    const handleSelectImage = useCallback(async () => {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert('Sorry, we need media library permissions to make this work!');
            return;
        }

        try {
            setLoading(true);

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
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleSelectModality = (value) => {
        setSelectedModality(value);
    };

    const handlePeopleChange = useCallback((numberOfPeople) => {
        setNumberOfPeople(numberOfPeople);
    }, []);

    const handleDescriptionChange = useCallback((eventDescription) => {
        setEventDescription(eventDescription);
    }, []);

    const handleCreateEvent = () => {
        console.log('Creating event...');
    };

    const handleCancelEvent = useCallback(() => {
        console.log('Cancelling event...');
        setSelectedImage('');
        setEventName('');
        setSelectedStartDate(new Date());
        setSelectedStartTime(new Date());
        setSelectedEndDate(new Date());
        setSelectedEndTime(new Date());
        setSelectedModality('');
        setNumberOfPeople('');
        setEventDescription('');
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
                            {loading && <ActivityIndicator size='large' color='#0000ff' />}

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
                                display='calendar'
                                onChange={handleStartDateChange}
                            />

                            <DateTimePicker
                                value={selectedStartTime}
                                mode={'time'}
                                display='inline'
                                onChange={handleStartTimeChange}
                            />
                        </DateTimeArea>

                        <DateTimeArea>
                            <LinkText>End  </LinkText>

                            <DateTimePicker
                                value={selectedEndDate}
                                mode={'date'}
                                display='calendar'
                                onChange={handleEndDateChange}
                            />

                            <DateTimePicker
                                value={selectedEndTime}
                                mode={'time'}
                                display='inline'
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

                        <SubmitButton activeOpacity={0.8}>
                            <SubmitText>Location</SubmitText>
                        </SubmitButton>

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
                            <DescriptionInput
                                value={eventDescription}
                                onChangeText={handleDescriptionChange}
                                placeholder='Event Description'
                                maxLength={300}
                            />
                        </AreaInput>

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