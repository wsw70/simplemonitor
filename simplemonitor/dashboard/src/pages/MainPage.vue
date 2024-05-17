<template>
    <q-page class="col  ">

        <q-table flat :rows="rows" :columns="columns" row-key="monitor">
            <template v-slot:body="props">
                <q-tr :props="props" :class="lineClass(props.row)">
                    <q-td :props="props" key="monitor">
                        {{ props.row.monitor }}
                    </q-td>
                    <!-- <q-td :props="props" key="status">
                        <q-icon :name="selectStatusIcon(props.row.status)" />
                    </q-td> -->
                    <q-td :props="props" key="virtual_fail_count">
                        {{ props.row.virtual_fail_count > 0 ? props.row.virtual_fail_count : '' }}
                    </q-td>
                    <q-td :props="props" key="first_failure_time">
                        {{ humanizeDate(props.row.first_failure_time) }}
                    </q-td>
                    <q-td :props="props" key="last_run_duration">
                        {{ props.row.last_run_duration }}
                    </q-td>
                    <q-td :props="props" key="dependencies">
                        {{ props.row.dependencies }}
                    </q-td>
                </q-tr>

            </template>
        </q-table>
    </q-page>

</template>

<script setup lang='ts'>
import { PropType } from 'vue';
import { apiResponse } from 'src/model';
import { computed } from 'vue';
import { onMounted } from 'vue';
import { formatDuration } from 'date-fns';
import { intervalToDuration } from 'date-fns';
import { isValid } from 'date-fns';

type Row = {
    monitor: string,
    status: string,
    virtual_fail_count: number,
    result: string,
    first_failure_time: Date,
    last_run_duration: number,
    dependencies: string,
}


const props = defineProps({
    data: {
        type: Object as PropType<apiResponse>,  // https://vuejs.org/api/utility-types.html#proptype-t
        required: true,
        default: <apiResponse>{}
    }
})
const monitors = computed(() => props.data.monitors)

const columns = [
    {
        name: 'monitor',
        label: 'Monitor',
        field: 'monitor',
        sortable: true,
    },
    // {
    //     name: 'status',
    //     label: 'Status',
    //     field: 'status',
    //     sortable: true,
    // },
    {
        name: 'virtual_fail_count',
        label: 'Fail Count',
        field: 'virtual_fail_count',
        sortable: true,
    },
    {
        name: 'first_failure_time',
        label: 'First Failed',
        field: 'first_failure_time',
        sortable: true,
    },
    {
        name: 'last_run_duration',
        label: 'last Run Duration (s)',
        field: 'last_run_duration',
        sortable: true,
    },
    {
        name: 'dependencies',
        label: 'Dependencies',
        field: 'dependencies',
        sortable: true,
    },
]

const rows = computed(() => {
    const rows: Row[] = []
    for (const monitor in monitors.value) {
        rows.push({
            monitor: monitor,
            status: monitors.value[monitor].status,
            virtual_fail_count: monitors.value[monitor].virtual_fail_count,
            result: monitors.value[monitor].result,
            first_failure_time: monitors.value[monitor].first_failure_time,
            last_run_duration: monitors.value[monitor].last_run_duration,
            dependencies: monitors.value[monitor].dependencies.join(' | ')
        })
    }
    return rows
})

const lineClass = (row: Row): string => {
    return row.status === 'OK' ? 'bg-green-2' : 'bg-red-2'
}

const humanizeDate = (date: Date): string => isValid(date) ? formatDuration(intervalToDuration({ start: date, end: new Date() })) + ' ago' : ''

onMounted(() => {

})
</script>