<template>
    <section class="footer-section">
        <div class="wrapper">
            <div class="footer-section__inner">
                <div class="footer__block">
                    <div class="footer__block__logo">
                        <div class="logo__image">
                            LOGO
                        </div>
                        <div class="logo__text">
                            Федерация борьбы дзюдо г. Магнитогорска
                        </div>
                    </div>
                    <div class="footer__block__info">
                        2004–{{ this.getYear }} г. © Федерация Дзюдо г. Магнитогорска
                    </div>
                </div>  
                <div class="footer__block">
                    <div class="footer__block__links">
                        <a href="tel:+73519235011">+7 3519 23-50-11</a>
                    </div>
                    <div class="footer__block__links">
                        ул. Строителей, 40/1, Магнитогорск, Челябинская обл., 455000
                    </div>
                    <div class="footer__block__links">
                        l1 l2 l3
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>А

<script>
export default {
    name: "AppFooter",
    computed: {
        getYear() {
            return (new Date()).getFullYear()
        }
    }
}
</script>
