<template>
    <section class="events">
        <div class="wrapper">
            <FullCalendar :options="calendarOptions"/>
        </div>
    </section>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import { useStore } from "~/store";

const store = useStore()

useHead({
   title: `События`,
})

const calendarOptions = reactive({
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
   events: store.getEvents,
   titleFormat: {
      month: 'long', day: 'numeric'
   }
})

</script>
