import React, { useState, useContext } from 'react';

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
import DropDownPicker from 'react-native-dropdown-picker';

import styles from '../CreateEvent/styles';

import {
    Background,
    Container,
} from '../SignIn/styles';


export default function CreateEvent() {
    const [eventName, setEventName] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedModality, setSelectedModality] = useState('');
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [eventDescription, setEventDescription] = useState('');


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

    const handleSelectModality = (selectedModality) => {
        setSelectedModality(selectedModality);
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

    const handlePeopleChange = (newNumberOfPeople) => {
        setNumberOfPeople(newNumberOfPeople);
    };

    const handleDescriptionChange = (text) => {
        setEventDescription(text);
    };

    const handleCreateEvent = () => {
        console.log('Criando evento...');
    };

    const handleCancelEvent = () => {
        // Implement logic to handle event cancellation
        console.log('Cancelando evento...');
        setEventName('');
        setSelectedDate(new Date());
        setSelectedTime('00:00');
        setSelectedImage(null);
        setSelectedModality('');
        setIsLocationModalOpen(false);
        setSelectedLocation('');
        setNumberOfPeople('');
        setEventDescription('');
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Background>
                    <Container
                        behavior={Platform.OS === 'ios' ? 'padding' : ''}
                        enabled
                    >
                        <TouchableOpacity
                            style={styles.eventPhotoButton}
                            onPress={handleSelectImage}
                        >
                            <Text style={styles.eventPhotoButtonText}>Picture</Text>
                        </TouchableOpacity>

                        <View style={styles.eventDetails}>
                            <Text style={styles.eventNameLabel}>Event Name</Text>
                            <TextInput
                                style={styles.eventNameInput}
                                value={eventName}
                                onChangeText={handleEventNameChange}
                            />
                        </View>

                        <View>
                            <Text style={styles.eventDateLabel}>Date</Text>
                            <DateTimePicker
                                value={selectedDate}
                                mode={'date'}
                                display='calendar'
                                onChange={(event, selectedDate) => {
                                    setSelectedDate(selectedDate || selectedDate);
                                }}
                            />

                            <Text style={styles.eventTimeLabel}>Time</Text>
                            <DateTimePicker
                                value={selectedTime}
                                mode={'time'}
                                display='inline'
                                onChange={(event, selectedTime) => {
                                    setSelectedTime(selectedTime || selectedTime);
                                }}
                            />
                        </View>

                        <View style={styles.eventModality}>
                            <Text style={styles.eventModalityLabel}>Modality</Text>
                            <DropDownPicker
                                items={[
                                    { label: 'Soccer', value: 'soccer' },
                                    { label: 'Basketball', value: 'basket' },
                                    { label: 'Volleyball', value: 'voley' },
                                    { label: 'Running', value: 'running' },
                                    { label: 'Tennis', value: 'tennis' },
                                    { label: 'Swimming', value: 'swimming' },
                                    { label: 'Others', value: 'others' },
                                ]}
                                defaultValue={selectedModality}
                                style={styles.eventModalityPicker}
                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                onChangeItem={item => handleSelectModality(item.value)}
                            />
                        </View>

                        <View style={styles.eventLocation}>
                            <TouchableOpacity
                                style={styles.eventLocationButton}
                                onPress={handleOpenLocationModal}
                            >
                                <Text style={styles.eventLocationButtonText}>Location</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.eventPeople}>
                            <TextInput
                                style={styles.eventPeopleInput}
                                value={numberOfPeople}
                                onChangeText={handlePeopleChange}
                                keyboardType="numeric"
                                placeholder="Participants"
                            />
                        </View>

                        <View style={styles.eventDescription}>
                            <TextInput
                                style={styles.eventDescriptionInput}
                                value={eventDescription}
                                onChangeText={handleDescriptionChange}
                                placeholder="Description"
                            />
                        </View>

                        <View style={styles.eventButtons}>
                            <TouchableOpacity
                                style={styles.createEventButton}
                                onPress={handleCreateEvent}
                            >
                                <Text style={styles.createEventButtonText}>Create</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.cancelEventButton}
                                onPress={handleCancelEvent}
                            >
                                <Text style={styles.cancelEventButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </Container>
                </Background>
            </TouchableWithoutFeedback>
        </ScrollView >
    )
}