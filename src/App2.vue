<template>
  <div class="container">
    <h1 style="text-align: center;">Vue Jobs</h1>
    <h1>{{ name }}</h1>
    <p v-if="status">User is active</p>
    <p v-else>User is inactive</p>

    <form @submit.prevent="addTask">
      <label for="taskNew">Add Task</label>
      <input style="margin-left: 10px;" type="text" id="taskNew" v-model="newTask">
      <button type="submit">Add task</button>
    </form>

    <button @click.prevent="status = !status">Change Status</button>
    <h3>Tasks:</h3>
    <ul v-if="!isLoading">
      <li v-for="(task, index) in  tasks " :key="index" style="display: flex; align-items: center; gap: 5px;">
        <span>
          {{ task.title }}
        </span>
        <button @click="deleteTask(index)">delete</button>
      </li>
    </ul>
    <p v-if="isLoading">Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
const name = ref<string>("John Doe");
const status = ref<boolean>(false);
const tasks = ref<string[]>(["Lorem", "Ipsum", "Dolor"]);
const newTask = ref<string>("");
const isLoading = ref<boolean>(false);

const addTask = () => {
  if (!newTask.value.trim()) return;
  tasks.value.push(newTask.value.trim());
  newTask.value = "";
};

const deleteTask = (index: number) => {
  // tasks.value.splice(index);
  tasks.value = tasks.value.filter((task, ind) => ind !== index);
};

onMounted(async () => {
  isLoading.value = true;
  try {
    const response = await fetch("https:jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    tasks.value = data;
  } catch (error) {
    console.log("error");
  } finally {
    isLoading.value = false;
  }
});

</script>

<style scoped>
.container {
  width: 90%;
  margin: auto;
}
</style>