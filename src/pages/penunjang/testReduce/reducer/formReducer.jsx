// src/reducers/formReducer.js

// Initial state untuk form
export const initialState = {
    nama: '',
    alamat: '',
};

// Initial state untuk API
const initialStateApi = {
    data: [],
    loading: false,
    error: null,
};

// Gabungkan initial state
export const initialStateAll = {
    form: initialState, // State untuk form
    api: initialStateApi,   // State untuk API
};

// Reducer untuk form
export function formReducer(state, action) {
    switch (action.type) {
        // Aksi untuk form
        case 'UPDATE_FIELD':
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.field]: action.value,
                },
            };
        case 'RESET_FORM':
            return {
                ...state,
                form: initialState,
            };

        // Aksi untuk API
        case 'FETCH_START':
            return {
                ...state,
                api: {
                    ...state.api,
                    loading: true,
                    error: null,
                },
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                api: {
                    ...state.api,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'FETCH_ERROR':
            return {
                ...state,
                api: {
                    ...state.api,
                    loading: false,
                    error: action.payload,
                },
            };

        default:
            throw new Error(`Action type ${action.type} tidak dikenali`);
    }
}