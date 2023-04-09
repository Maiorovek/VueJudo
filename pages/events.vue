<template>
    <section class="events">
        <div class="wrapper">
            <FullCalendar :options="calendarOptions"/>
        </div>
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
   components: {FullCalendar},
   data() {
      return {
         calendarOptions: {
            headerToolbar: {
               left: "prev,next,today",
               center: "title",
               right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
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
            events: useStore().getEvents,
            titleFormat: {
               month: 'long', day: 'numeric'
            }
         }
      }
   },
   methods: {}
}
</script>

<style scoped lang="scss">
.events {
    max-width: 800px;
    margin: 0 auto;
}
</style>
