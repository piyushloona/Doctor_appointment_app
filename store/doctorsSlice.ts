import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  image: string;
}

interface DoctorsState {
  doctors: Doctor[];
  filteredDoctors: Doctor[];
  searchQuery: string;
  selectedSpecialization: string;
  specializations: string[];
}

const initialDoctors: Doctor[] =
[
  {
    id: "doc_001",
    name: "Dr. Priya Sharma",
    specialization: "Cardiologist",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: "doc_002",
    name: "Dr. Arjun Mehta",
    specialization: "Dermatologist",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: "doc_003",
    name: "Dr. Riya Verma",
    specialization: "Pediatrician",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: "doc_004",
    name: "Dr. Karan Singh",
    specialization: "Orthopedic",
    image: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    id: "doc_005",
    name: "Dr. Meena Joshi",
    specialization: "Gynecologist",
    image: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: "doc_006",
    name: "Dr. Rajeev Ranjan",
    specialization: "Neurologist",
    image: "https://randomuser.me/api/portraits/men/12.jpg"
  },
  {
    id: "doc_007",
    name: "Dr. Sneha Kulkarni",
    specialization: "ENT Specialist",
    image: "https://randomuser.me/api/portraits/women/21.jpg"
  },
  {
    id: "doc_008",
    name: "Dr. Ankit Das",
    specialization: "Urologist",
    image: "https://randomuser.me/api/portraits/men/55.jpg"
  },
  {
    id: "doc_009",
    name: "Dr. Neha Kapoor",
    specialization: "Psychiatrist",
    image: "https://randomuser.me/api/portraits/women/23.jpg"
  },
  {
    id: "doc_010",
    name: "Dr. Mohit Bansal",
    specialization: "Dentist",
    image: "https://randomuser.me/api/portraits/men/63.jpg"
  },
  {
    id: "doc_011",
    name: "Dr. Rachna Iyer",
    specialization: "General Physician",
    image: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    id: "doc_012",
    name: "Dr. Varun Tiwari",
    specialization: "Oncologist",
    image: "https://randomuser.me/api/portraits/men/17.jpg"
  },
  {
    id: "doc_013",
    name: "Dr. Divya Nair",
    specialization: "Endocrinologist",
    image: "https://randomuser.me/api/portraits/women/56.jpg"
  },
  {
    id: "doc_014",
    name: "Dr. Prakash Menon",
    specialization: "Nephrologist",
    image: "https://randomuser.me/api/portraits/men/26.jpg"
  },
  {
    id: "doc_015",
    name: "Dr. Sonali Deshmukh",
    specialization: "Rheumatologist",
    image: "https://randomuser.me/api/portraits/women/27.jpg"
  },
  {
    id: "doc_016",
    name: "Dr. Aditya Chauhan",
    specialization: "Pulmonologist",
    image: "https://randomuser.me/api/portraits/men/33.jpg"
  },
  {
    id: "doc_017",
    name: "Dr. Kavita Sinha",
    specialization: "Radiologist",
    image: "https://randomuser.me/api/portraits/women/40.jpg"
  },
  {
    id: "doc_018",
    name: "Dr. Nitin Jha",
    specialization: "Gastroenterologist",
    image: "https://randomuser.me/api/portraits/men/19.jpg"
  },
  {
    id: "doc_019",
    name: "Dr. Shweta Tripathi",
    specialization: "Allergist",
    image: "https://randomuser.me/api/portraits/women/52.jpg"
  },
  {
    id: "doc_020",
    name: "Dr. Manish Agarwal",
    specialization: "Surgeon",
    image: "https://randomuser.me/api/portraits/men/70.jpg"
  }
]


const specializations = Array.from(new Set(initialDoctors.map(doctor => doctor.specialization)));

const initialState: DoctorsState = {
  doctors: initialDoctors,
  filteredDoctors: initialDoctors,
  searchQuery: '',
  selectedSpecialization: '',
  specializations: ['All', ...specializations],
};

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      filterDoctors(state);
    },
    setSelectedSpecialization: (state, action: PayloadAction<string>) => {
      state.selectedSpecialization = action.payload;
      filterDoctors(state);
    },
    clearFilters: (state) => {
      state.searchQuery = '';
      state.selectedSpecialization = '';
      state.filteredDoctors = state.doctors;
    },
  },
});

function filterDoctors(state: DoctorsState) {
  let filtered = state.doctors;

  if (state.searchQuery) {
    filtered = filtered.filter(doctor =>
      doctor.name.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }

  if (state.selectedSpecialization && state.selectedSpecialization !== 'All') {
    filtered = filtered.filter(doctor =>
      doctor.specialization === state.selectedSpecialization
    );
  }

  state.filteredDoctors = filtered;
}

export const { setSearchQuery, setSelectedSpecialization, clearFilters } = doctorsSlice.actions;
export default doctorsSlice.reducer;