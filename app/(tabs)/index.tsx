import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setSearchQuery, setSelectedSpecialization } from '@/store/doctorsSlice';
import { Search, Filter, Star, MapPin } from 'lucide-react-native';
import { router, useNavigation } from 'expo-router';
import { Doctor } from '@/store/doctorsSlice';

export default function DoctorsScreen() {
  const navigate=useNavigation();
  const dispatch = useDispatch();
  const { filteredDoctors, searchQuery, selectedSpecialization, specializations } = useSelector(
    (state: RootState) => state.doctors
  );
  const [showFilter, setShowFilter] = useState(false);

  const handleDoctorPress = (doctor: Doctor) => {
    router.navigate(`/doctor/${doctor.id}`);
  };

  const renderDoctor = ({ item }: { item: Doctor }) => (
    <TouchableOpacity
      style={styles.doctorCard}
      onPress={() => handleDoctorPress(item)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.image }} style={styles.doctorImage} />
      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>{item.name}</Text>
        <Text style={styles.doctorSpecialization}>{item.specialization}</Text>
        
      </View>
    </TouchableOpacity>
  );

  const renderSpecializationFilter = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.filterChip,
        selectedSpecialization === item && styles.filterChipActive
      ]}
      onPress={() => dispatch(setSelectedSpecialization(item === selectedSpecialization ? '' : item))}
    >
      <Text style={[
        styles.filterChipText,
        selectedSpecialization === item && styles.filterChipTextActive
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Your Doctor</Text>
        <Text style={styles.headerSubtitle}>Choose from our expert physicians</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by doctor name..."
            value={searchQuery}
            onChangeText={(text) => dispatch(setSearchQuery(text))}
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilter(!showFilter)}
          >
            <Filter size={20} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        {/* Specialization Filter */}
        {showFilter && (
          <View style={styles.filterContainer}>
            <FlatList
              data={specializations}
              renderItem={renderSpecializationFilter}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterList}
            />
          </View>
        )}
      </View>

      {/* Doctors List */}
      <FlatList
        data={filteredDoctors}
        renderItem={renderDoctor}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    fontFamily: 'Inter-Bold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
    marginBottom: 20,
    fontFamily: 'Inter-Regular',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    fontFamily: 'Inter-Regular',
  },
  filterButton: {
    padding: 4,
  },
  filterContainer: {
    marginTop: 16,
  },
  filterList: {
    paddingHorizontal: 0,
  },
  filterChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  filterChipActive: {
    backgroundColor: '#3B82F6',
  },
  filterChipText: {
    color: '#6B7280',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  listContainer: {
    padding: 20,
  },
  doctorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  doctorSpecialization: {
    fontSize: 14,
    color: '#3B82F6',
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 4,
    fontFamily: 'Inter-SemiBold',
  },
  experience: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  consultationFee: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
    fontFamily: 'Inter-SemiBold',
  },
});