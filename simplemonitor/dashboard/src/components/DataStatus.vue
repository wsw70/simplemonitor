<template>
    <div>
        <q-icon v-if="isDataFresh" name="event_available" color="green" size="lg" class="q-mr-sm">
            <q-tooltip>Tooltip text</q-tooltip>
        </q-icon>
        <q-spinner-clock v-else name="event_busy" color="red" size="md" class="q-mr-sm">
            <q-tooltip>Tooltip text</q-tooltip>
        </q-spinner-clock>
    </div>
</template>

<script setup lang='ts'>
import { apiResponse } from 'src/model';
import { PropType } from 'vue';
import { parse, addSecond } from '@formkit/tempo'
import { ref } from 'vue';

const props = defineProps({
    data: {
        type: Object as PropType<apiResponse>, // https://vuejs.org/api/utility-types.html#proptype-t
        required: true,
        default: <apiResponse>{},
    },
})
const isDataFresh = ref(false)
setInterval(() => isDataFresh.value = parse(props.data.generated) > addSecond(new Date(), -65), 1000)
</script>