<template>
    <q-page class="col  ">

        <q-table flat :rows="rows" :columns="columns">
            <template v-slot:body-cell="props">
                <q-td :props="props" :class="lineClass(props.row)">
                    {{ props.value }}
                </q-td>
            </template>
        </q-table>



    </q-page>

</template>

<script setup lang='ts'>
import { PropType } from 'vue';
import { apiResponse } from 'src/model';
import { computed } from 'vue';
import { onMounted } from 'vue';

type Row = {
    monitor: string,
    status: string,
    virtual_fail_count: number,
    result: string,
    first_failure_time: string,
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
    {
        name: 'status',
        label: 'Status',
        field: 'status',
        sortable: true,
    },
    {
        name: 'virtual_fail_count',
        label: 'Fail Count',
        field: 'virtual_fail_count',
        sortable: true,
    },
    {
        name: 'first_failure_time',
        label: 'First Failed At',
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
    const rows = []
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

const lineClass = (row: Row) => {
    return row.status === 'OK' ? 'bg-green-2' : 'bg-red-2'
}

onMounted(() => {

})
</script>