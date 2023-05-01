<template>
    <section class="auth">
        <div class="wrapper">
            <nuxt-link to="/" class="auth-back">
                Назад
            </nuxt-link>
        </div>
        <slot/>
    </section>
</template>

<script>
export default {
   name: "auth",
}
</script>
