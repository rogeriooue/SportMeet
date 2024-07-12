import React, { useState, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';

import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

import {
    Background,
    Container,
    AreaInput,
    Input,
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
    const [eventName, setEventName] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [selectedModality, setSelectedModality] = useState('');

    const handleEventNameChange = (eventName) => {
        setEventName(eventName);
    };

    const handleDateChange = (selectedDate) => {
        setSelectedDate(selectedDate);
    };

    const handleTimeChange = (selectedTime) => {
        setSelectedTime(selectedTime);
    };

    const handleSelectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
            });

            if (!result.canceled) {
                const { uri } = result;
                setSelectedImage(uri);
            }
        } catch (error) {
            console.error(error);
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
        setEventName('');
        setSelectedDate(new Date());
        setSelectedTime(new Date());
        setSelectedImage(null);
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
                            <SubmitText>Picture</SubmitText>
                        </SubmitButton>

                        <AreaInput>
                            <Input
                                placeholder="Event Name"
                                value={eventName}
                                onChangeText={handleEventNameChange}
                            />
                        </AreaInput>

                        <DateTimeArea>
                            <DateTimePicker
                                value={selectedDate}
                                mode={'date'}
                                display='calendar'
                                onChange={(event, selectedDate) => {
                                    setSelectedDate(selectedDate);
                                }}
                            />

                            <DateTimePicker
                                value={selectedTime}
                                mode={'time'}
                                display='inline'
                                onChange={(event, selectedTime) => {
                                    setSelectedTime(selectedTime);
                                }}
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