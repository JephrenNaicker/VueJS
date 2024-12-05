<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl">
      Event Booking App
    </h1>
    <h2 class="text-2xl font-medium">All Events</h2>
    <EventList @register="handleRegistration($event)"/>

    <h2 class="text-2xl font-medium">Your Bookings</h2>
    <template v-if="errors && errors.length">
      <!-- Error Section -->
      <SectionCard>
        <div class="space-y-4 items-center flex flex-col">
          <div class="text-red-500">
            Could not load bookings at the moment. Please try again.
          </div>
          <p v-for="(message, index) in errors" :key="index">{{ message }}</p>
          <RoundButton @click="resetErrors">Retry</RoundButton>
        </div>
      </SectionCard>
    </template>
    <template v-else>
      <!-- Bookings Section -->
      <section class="grid grid-cols-1 gap-4">
        <template v-if="bookingLoading">
          <!-- Loading State -->
          <LoadingBookingCard v-for="i in 4" :key="i" />
        </template>
        <template v-else-if="bookings.length">
          <!-- Bookings Available -->
          <BookingItem
            v-for="(item, index) in bookings"
            :key="item.id"
            :title="item.eventTitle"
            :status="item.status"
            @cancel="cancelBooking(item.id)"
          />
        </template>
        <template v-else>
          <!-- No Bookings Message -->
          <div class="text-center text-gray-500">
            No bookings made yet. Start by registering for an event!
          </div>
        </template>
      </section>
    </template>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BookingItem from './components/BookingItem.vue';
import LoadingBookingCard from './components/LoadingBookingCard.vue';
import EventList from './components/EventList.vue';
import RoundButton from './components/RoundButton.vue';
import SectionCard from './components/SectionCard.vue';

const errors = ref([]);
const bookings = ref([]);
const bookingLoading = ref(false);

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



const fetchBooking = async () => {

  bookingLoading.value = true;
  try {
    const response = await fetch('http://localhost:3001/bookings');
    bookings.value = await response.json();
    console.log(bookings.value);
  } finally {
    bookingLoading.value = false;
  }
}

const findBookingById = (id) => bookings.value.findIndex((b) => b.id === id);

const cancelBooking = async (bookingId) => {
  const index = findBookingById(bookingId);
  const originalBooking = bookings.value[index];
  bookings.value.splice(index, 1);
  console.log(`This is Index ,${index}`);
  console.log(`This is BookingID ,${bookingId}`);
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

onMounted(() => {
  fetchBooking()
});
</script>