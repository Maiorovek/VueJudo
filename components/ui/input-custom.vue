<template>
    <label :class="{'error': props.error}" class="custom-input">
        <input
          :type="typeInput"
          placeholder="&nbsp;"
          v-model="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <span class="placeholder" v-text="props.placeholder"/>
        <span v-if="props.type === 'password'" class="input-eye" @click="showPassword">
            <img v-if="password" src="../../assets/icons/eye-off.svg" alt=""/>
            <img v-else src="../../assets/icons/eye.svg" alt=""/>
        </span>
    </label>
</template>

<script setup>
defineEmits(['update:modelValue']);
const password = ref(true)
const modelValue = ref('')
const props = defineProps({
    placeholder: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'text',
    },
    title: {
        type: String,
        default: 'Это поле',
    },
    name: {
        type: String,
        required: true,
    },
    error: {
        type: Boolean,
        required: true,
    },
})

const showPassword = () => {
    password.value = !password.value
}
const typeInput = computed(() => {
    return props.type === 'text' ? 'text' : password.value ? 'password' : 'text'
})

</script>
