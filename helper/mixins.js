export const getCartMixins = {
    mounted () {
        this.$store.dispatch('home/getCart')
    }
}