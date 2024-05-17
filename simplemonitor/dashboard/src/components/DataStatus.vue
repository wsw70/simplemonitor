<template>
    <div class="flex flex-center bg-white q-pa-xs rounded-borders">
        <div :class="{ 'text-green-10': dataIsCurrent, 'text-red-10': !dataIsCurrent }" class="q-mr-sm">{{ whenUpdated }}</div>
        <q-icon v-if="dataIsCurrent" name="event_available" color="green" size="md" class="q-mr-sm">
            <q-tooltip>Tooltip text</q-tooltip>
        </q-icon>
        <q-spinner-clock v-else name="event_busy" color="red" size="sm" class="q-mr-sm">
            <q-tooltip>Tooltip text</q-tooltip>
        </q-spinner-clock>
    </div>
</template>

<script setup lang='ts'>
import { apiResponse } from 'src/model';
import { PropType } from 'vue';
import { computed } from 'vue';
import { differenceInSeconds, formatDuration } from 'date-fns';
import { intervalToDuration } from 'date-fns';
import { ComputedRef } from 'vue';

const MAX_SECONDS_BETWEEN_CHECKS = 65

const props = defineProps({
    data: {
        type: Object as PropType<apiResponse>, // https://vuejs.org/api/utility-types.html#proptype-t
        required: true,
        default: <apiResponse>{
            generated: new Date(0),
            monitors: {}
        },
    },
})
const whenUpdated: ComputedRef<string> = computed(() => formatDuration(intervalToDuration({ start: props.data.generated, end: new Date() })))
const dataIsCurrent: ComputedRef<boolean> = computed(() => differenceInSeconds(new Date(), props.data.generated) < MAX_SECONDS_BETWEEN_CHECKS)
</script>