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
import { parseISO } from 'date-fns';
import { useInterval } from 'quasar'


const data = ref<apiResponse>({} as apiResponse)
const getData = () => {
  fetch('src/assets/status.json')
    .then(r => r.text())
    .then(r => JSON.parse(r, (key, value) => {
      // normalization of data to convert some JSON fields to a more useable version
      switch (key) {
        case 'first_failure_time' || 'generated':
          // the timestamp was butchered by Jason :) so I need to make it great^H^H^H ISO again & convert to Date
          return parseISO(value.split(' ').join('T'))
        default:
          return value
      }
    }))
    .then((r: apiResponse) => data.value = r)
}

onMounted(() => {
  // schedule data retrieval
  const { registerInterval } = useInterval()
  registerInterval(getData, 1000)
})

</script>
