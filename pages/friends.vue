<template>
    <section class="friends">
        <div class="wrapper">
            <div class="friends__inner">
                <h1>Наши друзья</h1>

                <div class="friends__list">
                    <div class="friends__item" v-for="friend in friendsList">
                        <div class="item__name" v-text="friend.name"/>
                        <div class="item__info">
                            <v-icon
                              class="icon"
                              icon="mdi-phone"
                            />
                            <a :href="'tel:' + extractNumbersAndPlusSigns(friend.number)" v-text="friend.number"/>
                        </div>
                        <div class="item__info">
                            <v-icon
                              class="icon"
                              icon="mdi-map-marker"
                            />
                            <span v-text="friend.address"/>
                        </div>
                        <div class="item__info">
                            <v-icon
                              class="icon"
                              icon="mdi-web"
                            />
                            <a :href="friend.link" target="_blank" v-text="friend.link"/>
                        </div>
                        <div class="item__info">
                            <v-icon
                              class="icon"
                              icon="mdi-clock-time-eight-outline"
                            />
                            <span>
                                {{ friend.time.from }} - {{ friend.time.to }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script setup>
import { useStore } from "~/store";

useHead({
   title: `Наши друзья`,
})

const store = useStore()

const friendsList = computed(() => {
   return store.getFriendsList
})

const extractNumbersAndPlusSigns = number => {
   const regex = /(\d+|\+)/g;
   const matches = number.match(regex);
   return matches.join('')
}

</script>
