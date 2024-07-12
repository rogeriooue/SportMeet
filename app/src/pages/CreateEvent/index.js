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
import { Picker } from '@react-native-picker/picker';

import {
    Background,
    Container,
    AreaInput,
    Input,
    SubmitButton,
    SubmitText
} from '../SignIn/styles';


export default function CreateEvent() {
    const [eventName, setEventName] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [eventDescription, setEventDescription] = useState('');

    const [modalities] = useState([
        'Running',
        'Cycling',
        'Swimming',
        'Walking',
        'Soccer',
        'Basketball',
        'Volleyball',
        'Tennis',
        'Others'
    ]);

    const [selectedModality, setSelectedModality] = useState([]);


    const handleEventNameChange = (text) => {
        setEventName(text);
    };

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    const handleTimeChange = (newTime) => {
        setSelectedTime(newTime);
    };

    const handleSelectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
            });

            if (!result.cancelled) {
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

    const handlePeopleChange = (number) => {
        setNumberOfPeople(number);
    };

    const handleDescriptionChange = (text) => {
        setEventDescription(text);
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

                        <AreaInput>
                            <DateTimePicker
                                value={selectedDate}
                                mode={'date'}
                                display='calendar'
                                onChange={(event, selectedDate) => {
                                    setSelectedDate(selectedDate);
                                }}
                            />
                        </AreaInput>

                        <AreaInput>
                            <DateTimePicker
                                value={selectedTime}
                                mode={'time'}
                                display='inline'
                                onChange={(event, selectedTime) => {
                                    setSelectedTime(selectedTime);
                                }}
                            />
                        </AreaInput>

                        <AreaInput>
                            <Picker
                                selectedValue={selectedModality}
                                onValueChange={(itemValue, itemIndex) => setSelectedModality(itemValue)}
                            >
                                {modalities.map((md, index) => {
                                    <Picker.Item key={index} label={md} value={md} />
                                })}
                            </Picker>
                        </AreaInput>


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
                            <Input
                                value={eventDescription}
                                onChangeText={handleDescriptionChange}
                                placeholder="Event Description"
                            />
                        </AreaInput>

                        <SubmitButton onPress={handleCreateEvent}>
                            <SubmitText>Create</SubmitText>
                        </SubmitButton>


                        <SubmitButton onPress={handleCancelEvent}>
                            <SubmitText>Cancel</SubmitText>
                        </SubmitButton>

                    </Container>
                </Background>
            </TouchableWithoutFeedback>
        </ScrollView >
    )
}