<template>
  <Hero />
  <HomeCards />
  <JobListings :limit="3" :show-button="true" />
</template>
<script setup lang="ts">
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';
import JobListings from '@/components/JobListings.vue';
</script>