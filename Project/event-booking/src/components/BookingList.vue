<template>
   <template v-if="errors">
      <!-- Error Section -->
      <ErrorCard :retry="resetErrors">
        <template v-for="error in errors" :key="error">{{ error }}</template>
    </ErrorCard>
    </template>
    <template v-else>
      <!-- Bookings Section -->
      <section class="grid grid-cols-1 gap-4">
        <template v-if="loading">
          <!-- Loading State -->
          <LoadingBookingCard v-for="i in 4" :key="i" />
        </template>
        <template v-else-if="bookings.length">
          <!-- Bookings Available -->
          <BookingItem v-for="(item, index) in bookings" :key="item.id" :title="item.eventTitle" :status="item.status"
            @cancel="cancelBooking(item.id)" />
        </template>
        <template v-else>
          <!-- No Bookings Message -->
          <div class="text-center text-gray-500">
            No bookings made yet. Start by registering for an event!
          </div>
        </template>
      </section>
    </template>
</template>

<script setup>
import { onMounted } from 'vue';
import LoadingBookingCard from './LoadingBookingCard.vue';      
import useBookings from '@/composables/useBookings';
import ErrorCard from './ErrorCard.vue';
import BookingItem from './BookingItem.vue';

const { bookings, loading, errors, cancelBooking,
  fetchBooking,
} = useBookings();

onMounted(() => {
  fetchBooking()
});
</script>