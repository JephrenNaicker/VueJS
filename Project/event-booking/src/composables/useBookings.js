import {ref} from 'vue';

const errors = ref([]);
const bookings = ref([]);
const loading = ref(false);


const findBookingById = (id) => bookings.value.findIndex((b) => b.id === id);

const fetchBooking = async () => {

    loading.value = true;
    try {
      const response = await fetch('http://localhost:3001/bookings');
      bookings.value = await response.json();
      console.log(bookings.value);
    } catch (e)
    {
      errors.value.push('failed to load bookings');
    } 
    finally {
        loading.value = false;
    }
  }

  const handleRegistration = async (event) => {

    if (bookings.value.some(
      b => b.eventId === event.id && b.userId === 1 && b.status === 'pending'
    )) {
      alert('Booking Pending');
      return;
    }
  
    if (bookings.value.some(
      b => b.eventId === event.id && b.userId === 1
    )) {
      alert('Already Booked');
      return;
    }
  
    const newBooking = {
      id: Date.now().toString(),
      userId: 1,
      eventId: event.id,
      eventTitle: event.title,
      status: 'pending'
    };
  
    bookings.value.push(newBooking);
    try {
      const response = await fetch('http://localhost:3001/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newBooking,
          status: 'confirmed'
        })
      });
  
      if (response.ok) {
        const index = bookings.value.findIndex(b => b.id === newBooking.id);
        bookings[index] = await response.json();
      }
      else {
        //have a pop up ?
        throw new Error('Failed to confirm booking')
      }
    } catch (error) {
      console.error('failed to confirm booking', error);
      errors.value.push('failed to confirm booking');
      bookings.value = bookings.value.filter(b => b.id !== newBooking.id);
    }
  
  };
  
  
  const cancelBooking = async (bookingId) => {
    const index = findBookingById(bookingId);
    const originalBooking = bookings.value[index];
    bookings.value.splice(index, 1);
    try {
      const response = await fetch(`http://localhost:3001/bookings/${bookingId}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error('Booking could not be cancelled');
  
      }
    } catch (error) {
      console.error('failed to cancel booking');
      errors.value.push('failed to cancel booking');
      bookings.value.splice(index, 0, originalBooking);
    }
  
  };

  const resetErrors = () => {
    console.log('Tried to reset Errors');
    errors.value = [];
    fetchBooking();
  };
  

export default function useBookings(){
    
    return {
        bookings,
        loading,
        fetchBooking,
        handleRegistration,
        cancelBooking,
        resetErrors
    };
}