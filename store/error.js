import { defineStore } from "pinia";

export const error = defineStore('error', {
   state: () => ({
      errorAuth: {},
   }),
   getters: {
      getErrorAuth: state => state.errorAuth,
   },
   actions: {
      setErrorAuth(value, type) {
         let typeString = ''
         let errorString = ''

         switch (value) {
            case 'auth/invalid-email':
               typeString = 'login'
               errorString = 'Введите действительный адрес электронной почты'
               break;
            case 'auth/user-not-found':
               typeString = 'login'
               errorString = 'Этот почтовый адрес не зарегистрирован'
               break;
            case 'auth/missing-password':
               typeString = 'password'
               errorString = 'Неверный формат пароля'
               break;
            case 'auth/wrong-password':
               typeString = 'password'
               errorString = 'Неверный пароль'
               break;
            case 'auth/too-many-requests':
               typeString = 'login'
               errorString = 'Слишком много попыток авторизации'
               break;
            default:
               typeString = type
               errorString = value
               break;
         }

         this.errorAuth = {
            value: errorString,
            type: typeString
         }
      },
   }
})
