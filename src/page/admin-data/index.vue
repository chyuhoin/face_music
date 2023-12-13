<template>
  <div class="admin-data">
    <emotionChart />
  </div>
</template>

<script>
import emotionChart from '@/components/emotion-chart'

export default {
  data() {
    return {
    }
  },
  methods: {
    
  },
  mounted() {
  },
  components: { emotionChart }
}
</script>

<style lang="scss" scoped>
.admin-data {
  padding: 50px;
}
</style>
