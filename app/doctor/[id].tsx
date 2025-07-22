import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, router,useNavigation } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { addAppointment } from '@/store/appointmentsSlice';
import { ArrowLeft } from 'lucide-react-native';
import Toast from 'react-native-toast-message';

export default function DoctorDetailScreen() {
    const navigate=useNavigation();
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const doctor = useSelector((state: RootState) =>
    state.doctors.doctors.find(doc => doc.id === id)
  );

  const [patientNotes, setPatientNotes] = useState('');

  if (!doctor) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Doctor not found</Text>
      </SafeAreaView>
    );
  }

  const handleBookAppointment = () => {
    const appointment = {
      id: Date.now().toString(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      patientNotes: patientNotes || 'No additional notes',
      appointmentDate: new Date().toISOString(),
      status: 'pending' as const,
      time_slot:selectedTime
    };

    dispatch(addAppointment(appointment));

    Toast.show({
      type: 'success',
      text1: 'Appointment Booked!',
      text2: `Your appointment with ${doctor.name} has been successfully scheduled.`,
      position: 'top',
      visibilityTime: 3000,
    });



    setPatientNotes('');
  };

  const timeSlots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  console.log(selectedTime)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigate.goBack()}
        >
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctor Details</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Doctor Profile */}
        <View style={styles.profileSection}>
          <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <Text style={styles.specialization}>{doctor.specialization}</Text>

          </View>
        </View>

        {/* Doctor Information */}


        {/* Patient Notes Input */}
        <View style={styles.notesSection}>
          <Text style={styles.notesLabel}>Patient Notes (Optional)</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Enter any symptoms, concerns, or additional information..."
            value={patientNotes}
            onChangeText={setPatientNotes}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.slotContainer}>
          {timeSlots.map((slot) => (
            <TouchableOpacity
              key={slot}
              style={[
                styles.timeSlot,
                selectedTime === slot && styles.selectedTimeSlot,
              ]}
              
              onPress={() => setSelectedTime(slot)}
            >
              <Text style={styles.timeSlotText}>{slot}</Text>
            </TouchableOpacity>
          ))}
        </View>


        {/* Book Appointment Button */}
        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBookAppointment}
          activeOpacity={0.8}
        >
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  slotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginVertical: 10,
  },
  timeSlot: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    margin: 5,
    marginLeft:20
  },
  selectedTimeSlot: {
    backgroundColor: '#3B82F6',
  },
  timeSlotText: {
    color: '#000',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    fontFamily: 'Inter-SemiBold',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  doctorImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  profileInfo: {
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
  },
  specialization: {
    fontSize: 16,
    color: '#3B82F6',
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 4,
    fontFamily: 'Inter-SemiBold',
  },
  experience: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  infoTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
  infoValue: {
    fontSize: 16,
    color: '#1F2937',
    fontFamily: 'Inter-SemiBold',
  },
  notesSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 16,
  },
  notesLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
    fontFamily: 'Inter-SemiBold',
  },
  notesInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    fontFamily: 'Inter-Regular',
    minHeight: 100,
  },
  bookButton: {
    backgroundColor: '#3B82F6',
    margin: 20,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  errorText: {
    fontSize: 18,
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 100,
    fontFamily: 'Inter-Regular',
  },
});