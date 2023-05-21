<template>
   <section class="events-section">
      <h2 class="events-section__title title-section">
         События
      </h2>
      <div class="events-sections__inner">
         <FullCalendar class="events-table" :options="calendarOptions" />
         <div class="events-table">
            <span class="event-table-text"> Сегодня {{ this.getCurrentDay }} </span>
            <FullCalendar class="events-table-list" :options="calendar" />
         </div>
      </div>
      <div class="fuck-yeah"> </div>
   </section>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import { useStore } from "~/store";
export default {
   setup() {
      useHead({
         title: `События`,
      })
   },
   components: { FullCalendar },
   data() {
      return {
         calendarOptions: {
            slotLabelFormat: {
               hour: '2-digit',
               minute: '2-digit',
               meridiem: false
            },
            headerToolbar: {
               left: "",
               right: "",
               center: "dayGridMonth,timeGridWeek"
            },
            buttonText: {
               prev: '<',
               next: '>',
               today: 'Сегодня',
               dayGridMonth: 'Месяц',
               timeGridWeek: 'Неделя',
               timeGridDay: 'День',
               listMonth: 'Лист',
            },
            themeSystem: 'Sandstone',
            buttonIcons: false,
            navLinks: true,
            editable: true,
            dayMaxEvents: true,
            plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
            initialView: 'dayGridMonth',
            nowIndicator: true,
            locale: 'ru',
            allDayText: 'Весь день',
            allDaySlot: false,
            firstDay: 1,
            titleFormat: {
               month: 'long', day: 'numeric'
            },
         },
         calendar: {
            slotLabelFormat: {
               hour: '2-digit',
               minute: '2-digit',
               meridiem: false
            },
            headerToolbar: {
               left: "",
               right: "",
               center: ""
            },
            buttonText: {
               prev: '<',
               next: '>',
               today: 'Сегодня',
               dayGridMonth: 'Месяц',
               timeGridWeek: 'Неделя',
               timeGridDay: 'День',
               listMonth: 'Лист',
            },
            themeSystem: 'Sandstone',
            buttonIcons: false,
            navLinks: true,
            editable: true,
            dayMaxEvents: true,
            plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
            initialView: 'timeGridDay',
            nowIndicator: true,
            locale: 'ru',
            allDayText: 'Весь день',
            allDaySlot: false,
            firstDay: 1,
            events: useStore().getEvents,
            titleFormat: {
               month: 'long', day: 'numeric'
            },
         }
      }
   },
   computed: {
      getCurrentDay() {
         const options = { day: 'numeric', month: 'long', year: 'numeric' }
         return (new Date()).toLocaleDateString('ru-RU', options)
      }
   }
}
</script>

<style scoped></style>
