<template>
   <label :class="{'error': props.isError}" class="custom-input">
       <!-- {{props.isError}} -->
       <!-- {{props.error}} -->
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
       <!-- {{ errorString.value  }} -->
       <span
         class="span-error"
         v-if="props.isError"
         v-text="errorText"
       />
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
  isError: {
     type: Boolean,
     required: true,
  },
  error: {
     type: String,
  },
})
const showPassword = () => {
  password.value = !password.value
}
const typeInput = computed(() => {
  return props.type === 'text' ? 'text' : password.value ? 'password' : 'text'
})
const errorText = computed(() => {
  let text = ''
  switch (props.error) {
      case 'auth/invalid-email':
        text = 'Введите действительный адрес электронной почты'
        break;
      case 'Введите действительный адрес электронной почты':
         text = 'Введите действительный адрес электронной почты'
         break;
      case 'Это поле обязательно для заполения':
         text = 'Это поле обязательно для заполения'
         break;
      case 'auth/user-not-found':
            text = 'Этот почтовый адрес не зарегистрирован'
            break;
      case 'auth/missing-password':
         text = 'Неверный формат пароля'
         break;
      case 'Пароль должен содержать не менее 8 символов':
         text = 'Пароль должен содержать не менее 8 символов'
         break;
      case 'auth/wrong-password':
         text = 'Неверный пароль'
         break;
      
  }
  return text
})
</script>