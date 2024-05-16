<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="items flex justify-start">
        <q-toolbar-title class="col-shrink">
          Simplemonitor Dashboard
        </q-toolbar-title>
        <SummaryIndicators :data="data"></SummaryIndicators>
        <q-space></q-space>
        <DataStatus :data="data"></DataStatus>
        <div>aaa</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <MainPage :data="data"></MainPage>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import MainPage from 'src/pages/MainPage.vue';
import SummaryIndicators from 'src/components/SummaryIndicators.vue'
import DataStatus from 'src/components/DataStatus.vue'
import { apiResponse } from 'src/model'
import { ref } from 'vue';
import { onMounted } from 'vue';

const data = ref<apiResponse>({} as apiResponse)
const getData = () => {
  fetch('src/assets/status.json')
    .then(r => r.json())
    .then((r: apiResponse) => data.value = r)
}

onMounted(() => {
  getData()
})

</script>
