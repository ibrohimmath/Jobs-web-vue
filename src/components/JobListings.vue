<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Browse Jobs
      </h2>
      <!-- <Loader /> -->
      <Loader v-if="state.isLoading" />
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobListing v-for="job in state.jobs.slice(0, limit || state.jobs.length)" :key="job.id" :job="job" />
      </div>
    </div>
  </section>

  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <router-link to="/jobs" class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">View
      All
      Jobs</router-link>
  </section>
</template>

<script setup lang="ts">
import JobListing from "@/components/JobListing.vue";
// import jobData from "@/jobs.json";
import { ApiServiceInstance } from "@/api";
import { ApiUrls } from "@/api/apiUrls";
import Loader from "@/components/Loader.vue";
import type { JobResponse } from "@/models/JobResponse";
import { defineProps, onMounted, reactive } from "vue";

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
});

// const jobs = ref(jobData.jobs);
// console.log("jobs", jobs.value);
const state = reactive<{
  jobs: JobResponse[],
  isLoading: boolean,
}>({
  jobs: [],
  isLoading: true,
});

onMounted(async () => {
  try {
    const result = await ApiServiceInstance.sendRequest("get", ApiUrls.JOBS);
    state.jobs = result;
  } catch (err) {
    console.log(err);
  } finally {
    state.isLoading = false;
  }
});

</script>
