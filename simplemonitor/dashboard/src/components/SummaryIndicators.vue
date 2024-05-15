<template>
    <div>
        <q-chip color="green" text-color="white">{{ ok }} OK</q-chip>
        <q-chip color="red" text-color="yellow">{{ failed }} FAILED</q-chip>

    </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import { apiResponse } from 'src/model';
import { PropType } from 'vue';

const props = defineProps({
    data: {
        type: Object as PropType<apiResponse>, // https://vuejs.org/api/utility-types.html#proptype-t
        required: true,
        default: <apiResponse>{},
    },
});
const statuses = computed(() => {
    const statuses = []
    if (props.data.monitors) {
        for (const val of Object.values(props.data.monitors)) {
            statuses.push(val.status)
        }
    }
    return statuses
})

const ok = computed(() => statuses.value.filter(x => x === 'OK').length)
const failed = computed(() => statuses.value.filter(x => x === 'Fail').length)

</script>