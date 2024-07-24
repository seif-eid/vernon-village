import { writable } from 'svelte/store';

// Create a writable store to hold the selected image filename
export const selectedImage = writable({
    imageFilename: '',
    imageDesc: '',
    imageDetailDesc: '',
    imageEndDate: ''
});
