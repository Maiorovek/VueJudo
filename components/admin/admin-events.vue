<template>
    <div>
        <div class="admin-view__inner">
            <h2 class="admin-title">События</h2>
            <div class="calendar">
                <FullCalendar :options="calendarOptions"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import { useStore } from "~/store";
import findObject from "~/utils/findObject";

useHead({
   titleTemplate: '%s : События',
})

const store = useStore()

const addNewEvent = event => {
   const data = {
      start: event.startStr,
      end: event.endStr,
      title: ''
   }
   store.changeModalData(data, 'events', 'add', 'Добавить событие', 'events-list')
}
const clickEvent = event => {
   const data = findObject(useStore().getEvents, Number(event.event.id))
   store.changeModalData(data, 'events', 'remove', 'Удалить событие?', 'events-list', event.event)
}

const calendarOptions = reactive({
   events: useStore().events,
   plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
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
   dayMaxEvents: true,
   locale: 'ru',
   allDayText: 'Весь день',
   allDaySlot: true,
   initialView: 'dayGridMonth',
   selectMirror: true,
   firstDay: 1,
   editable: true,
   selectable: true,
   select: addNewEvent,
   eventClick: clickEvent,
})
</script>
