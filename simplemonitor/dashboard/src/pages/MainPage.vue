<template>
    <q-page class="col  ">

        <q-table flat :rows="monitors" row-key="name" v-model:pagination="pagination" hide-pagination>
            <template v-slot:body="props">
                <!-- we define how each line will look like -->
                <q-tr :props="props" :class="lineClass(props.row)">
                    <!-- this is a list of columns for each row -->
                    <q-td v-for="col in colsToDisplay(props.cols as QTableProps['columns'][])" :key="col?.name">
                        <!-- this is the value that will be displayed in a cell -->
                        {{ props.row[col.name] }}
                    </q-td>
                </q-tr>
            </template>
            <template v-slot:header="props">
                <q-tr :props="props">
                    <q-th v-for="col in labelsToDisplay" :key="col" :props="props" class="text-bold text-purple">
                        {{ col }}
                    </q-th>
                </q-tr>
            </template>
        </q-table>
        <div class="row justify-center q-mt-md" v-if="pagesNumber > 1">
            <q-pagination v-model="pagination.page" color="grey-8" :max="pagesNumber" size="sm" />
        </div>
    </q-page>

</template>

<script setup lang='ts'>
import { PropType } from 'vue';
import { apiResponse } from 'src/model';
import { computed } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
// import { formatDuration } from 'date-fns';
// import { intervalToDuration } from 'date-fns';
// import { isValid } from 'date-fns';
import { Monitor } from 'src/model'
import { QTableProps } from 'quasar'

// this is still colored

const props = defineProps({
    data: {
        type: Object as PropType<apiResponse>,  // https://vuejs.org/api/utility-types.html#proptype-t
        required: true,
        default: <apiResponse>{}
    }
})

// this is not colored anymore

// monitors is an array of Monitors, each element will be a line in the table
const monitors = computed(() => Object.values(props.data.monitors || {}))
// only a subset of labels will be displayed for each line
const labelsToDisplay = ['name', 'result']


const lineClass = (row: Monitor): string => {
    return row.status === 'OK' ? 'bg-green-2' : 'bg-red-2'
}

// const humanizeDate = (date: Date): string => isValid(date) ? formatDuration(intervalToDuration({ start: date, end: new Date() })) + ' ago' : ''

const pagination = ref({
    sortBy: 'virtual_fail_count',
    descending: true,
    page: 1,
    rowsPerPage: 10,
})
const pagesNumber = computed(() => Math.ceil(monitors.value.length / pagination.value.rowsPerPage))

const colsToDisplay = (cols: QTableProps['columns'][]) => {
    console.log(cols)
    const ret: QTableProps['columns'][] = []
    cols.forEach((col) => {
        if (labelsToDisplay.includes(col.name)) {
            ret.push(col)
        }

    })

    return ret
}

// const labelsFiltered = monitors.value.filter(x: Monitor => labelsToDisplay.includes(x.name))

onMounted(() => {

})
</script>