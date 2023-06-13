<template>
    <section class="events-section">
        <h2 class="events-section__title title-section">
            События
        </h2>
        <div class="events-sections__inner" ref="calendar">
            <FullCalendar class="events-table" :options="calendarOptions"/>
            <FullCalendar class="events-table" :options="calendar" :key="calendar.key"/>
        </div>
        <div class="fuck-yeah"></div>
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
   components: {FullCalendar},
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
               center: "title"
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
            navLinkDayClick: this.selectDay,
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
               center: "title"
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
            plugins: [timeGridPlugin, listPlugin],
            initialView: 'timeGridDay',
            nowIndicator: true,
            locale: 'ru',
            allDayText: 'Весь день',
            allDaySlot: false,
            firstDay: 1,
            events: useStore().getEvents,
            titleFormat: {
               year: 'numeric', month: 'long', day: 'numeric'
            },
            key: 1,
         },
      }
   },
   methods: {
      selectDay(day, event) {
         const parentNode = event.target.closest('td')
         const calendar = this.$refs.calendar
         const originalDate = new Date(day);
         const timezoneOffset = originalDate.getTimezoneOffset() * 60000;
         const formattedDate = new Date(originalDate - timezoneOffset).toISOString().substring(0, 10);

         if (calendar.querySelector('.fs-selected-day')) calendar.querySelector('.fs-selected-day').classList.remove('fs-selected-day')
         parentNode.classList.add('fs-selected-day')

         if (this.calendar.initialDate !== formattedDate) {
            this.calendar.initialDate = formattedDate
            this.calendar.key++
         }
      }
   },
}
</script>

<style scoped></style>
