import React, { useState, useContext } from 'react';
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
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [selectedModality, setSelectedModality] = useState('');

    const handleEventNameChange = (eventName) => {
        setEventName(eventName);
    };

    const handleStartDateChange = (event, selectedStartDate) => {
        setSelectedStartDate(selectedStartDate);
    };

    const handleStartTimeChange = (event, selectedStartTime) => {
        setSelectedStartTime(selectedStartTime);
    };

    const handleEndDateChange = (event, selectedEndDate) => {
        setSelectedEndDate(selectedEndDate);
    };

    const handleEndTimeChange = (event, selectedEndTime) => {
        setSelectedEndTime(selectedEndTime);
    };

    const handleSelectImage = async () => {

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
    };

    const handleOpenLocationModal = () => {
        setIsLocationModalOpen(true);
    };

    const handleSelectLocation = (selectedLocation) => {
        setSelectedLocation(selectedLocation);
    };

    const handleSaveLocation = () => {
        setIsLocationModalOpen(false);
    };

    const handlePeopleChange = (numberOfPeople) => {
        setNumberOfPeople(numberOfPeople);
    };

    const handleDescriptionChange = (eventDescription) => {
        setEventDescription(eventDescription);
    };

    const handleCreateEvent = () => {
        console.log('Creating event...');
    };

    const handleCancelEvent = () => {
        console.log('Cancelling event...');
        setSelectedImage('');
        setEventName('');
        setSelectedStartDate(new Date());
        setSelectedStartTime(new Date());
        setSelectedEndDate(new Date());
        setSelectedEndTime(new Date());
        setSelectedModality('');
        setIsLocationModalOpen(false);
        setSelectedLocation('');
        setNumberOfPeople('');
        setEventDescription('');
    };

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Background>
                    <Container
                        behavior={Platform.OS === 'ios' ? 'padding' : ''}
                        enabled
                    >

                        <SubmitButton onPress={handleSelectImage}>
                            <SubmitText>Select Image</SubmitText>
                        </SubmitButton>

                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                            {loading && <ActivityIndicator size='large' color='#0000ff' />}

                            {selectedImage && (
                                <View style={{ borderRadius: 8, marginBottom: 15, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        source={{ uri: selectedImage }}
                                        style={{ width: '90%', aspectRatio: 1, resizeMode: 'cover', borderRadius: 8, backgroundColor: '#FFF' }}
                                    />
                                    <Link onPress={() => setSelectedImage('')}>
                                        <LinkText>Reset Image</LinkText>
                                    </Link>
                                </View>
                            )}
                        </View>

                        <AreaInput>
                            <Input
                                placeholder="Event Name"
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
                                onValueChange={(value) => setSelectedModality(value)}
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

                        <SubmitButton onPress={handleOpenLocationModal}>
                            <SubmitText>Location</SubmitText>
                        </SubmitButton>

                        <AreaInput>
                            <Input
                                value={numberOfPeople}
                                onChangeText={handlePeopleChange}
                                keyboardType="numeric"
                                placeholder="Number of People"
                                maxLength={5}
                                accessible={true}
                            />
                        </AreaInput>

                        <AreaInput>
                            <DescriptionInput
                                value={eventDescription}
                                onChangeText={handleDescriptionChange}
                                placeholder="Event Description"
                            />
                        </AreaInput>

                        <SubmitButton onPress={handleCreateEvent}>
                            <SubmitText>Create</SubmitText>
                        </SubmitButton>

                        <CancelButton onPress={handleCancelEvent}>
                            <CancelText>Cancel</CancelText>
                        </CancelButton>

                    </Container>
                </Background>
            </TouchableWithoutFeedback>
        </ScrollView >
    )
}