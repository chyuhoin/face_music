<template>
  <div class="admin-data">
    <emotionChart />
    <feedbackTable />
  </div>
</template>

<script>
import emotionChart from '@/components/emotion-chart'
import feedbackTable from '@/components/feedback-table'

export default {
  data() {
    return {
    }
  },
  methods: {
    
  },
  mounted() {
  },
  components: { emotionChart, feedbackTable }
}
</script>

<style lang="scss" scoped>
.admin-data {
  padding: 50px;
  text-align: center;
}
</style>
