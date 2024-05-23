<template>
    <q-page class="col  ">

        <q-table flat :rows="rows" row-key="monitor" v-model:pagination="pagination" hide-pagination>
            <template v-slot:body="props">
                <q-tr :props="props" :class="lineClass(props.row)">
                    <q-td v-for="col in colsToDisplay(props.cols as QTableProps['columns'][])" :key="col.name">
                        {{ props.row[col.name] }}
                    </q-td>
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
import { formatDuration } from 'date-fns';
import { intervalToDuration } from 'date-fns';
import { isValid } from 'date-fns';
import { Monitor } from 'src/model'
import { QTableProps } from 'quasar'

const props = defineProps({
    data: {
        type: Object as PropType<apiResponse>,  // https://vuejs.org/api/utility-types.html#proptype-t
        required: true,
        default: <apiResponse>{}
    }
})
const monitors = computed(() => props.data.monitors)

const labelsToDisplay = ['name', 'result']



const rows = computed(() => {
    const rows: Monitor[] = []
    for (const monitor in monitors.value) {
        // console.log(monitor, monitors.value[monitor])
        // rows.push({
        //     monitor: monitor,
        //     status: monitors.value[monitor].status,
        //     virtual_fail_count: monitors.value[monitor].virtual_fail_count,
        //     result: monitors.value[monitor].result,
        //     first_failure_time: monitors.value[monitor].first_failure_time,
        //     last_run_duration: monitors.value[monitor].last_run_duration,
        //     dependencies: monitors.value[monitor].dependencies.join(' | ')
        // })
        rows.push(monitors.value[monitor])
    }
    return rows
})

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
const pagesNumber = computed(() => Math.ceil(rows.value.length / pagination.value.rowsPerPage))

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