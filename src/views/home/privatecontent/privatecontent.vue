<template>
  <div class="page-container">
    <div class="flex card-list">
      <card 
          class="card"
          v-for="item in list"
          :key="item.id"
          :item="item"
          :showPlayBtn="false"
          :paddingTop="'37%'"
          @onClick="goMvDetail(item)"
        />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router'
import { getPrivatecontentListService } from '@/services/privatecontent'
import Card from '@/components/card/card.vue'

const router = useRouter();

const list = ref({})

onMounted(async () => {
  await getPrivatecontentListService().then(res => list.value = res.result);
})

const goMvDetail = (item) => {
  router.push(`/mv/${item.id}`)
}


</script>

<style lang="scss" scoped>
.page-container {
  padding-top: 20px;
}
.card-list {
  margin-left: -18px;
}

.card {
  width: 50%;
  padding-left: 18px;
}

@media (min-width: 1060px) {
  .card {
    width: 25%;
  }
}
</style>