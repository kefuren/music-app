<template>
  <div class="page-container">
    <Tags :data="mvArea" v-model="state.area"></Tags>
    <Tags :data="mvType" v-model="state.type"></Tags>
    <Tags :data="mvOrder" v-model="state.order"></Tags>

    <div class="flex card-list" v-if="isRenderFinish">
      <Card
        class="card"
        v-for="item in datas"
        :key="item.id"
        :item="item"
        :playBtnCenter="true"
        @onClick="goMvDetail(item)"
      >
        <template #cardDesc v-if="item.key !== 'exclusive_mv'">
          <p class="desc-text ellipsis text-link ">{{ item.name }}</p>
          <template v-for="(artist, index) in item.artists" :key="index">
            <span class="separator" v-if="index !== 0">/</span>
            <span class="text-link artist">{{ artist.name }}</span>
          </template>
        </template>
      </Card>
    </div>
    <div class="loading relative-position" style="flex:1" v-else>
      <span class=" absolute-center">加载中...</span>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { useRouter } from 'vue-router'
import { getMvAllService } from '@/services/mv'
import Tags from './tags.vue'
import Card from '@/components/card/card.vue'

const router = useRouter();
const query = router.currentRoute.value.query;

const isRenderFinish = ref(false)

const mvArea = {
  '地区：': [
    {
      name: '全部',
      id: 0
    },
    {
      name: '内地',
      id: 1
    },
    {
      name: '港台',
      id: 2
    },
    {
      name: '欧美',
      id: 3
    },
    {
      name: '韩国',
      id: 4
    },
    {
      name: '日本',
      id: 5
    },
  ]
}
const mvType = {
  '类型：': [
    {
      name: '全部',
      id: 0
    },
    {
      name: '官方版',
      id: 1
    },
    {
      name: '原声',
      id: 2
    },
    {
      name: '现场版',
      id: 3
    },
    {
      name: '网易出品',
      id: 4
    }
  ]
}
const mvOrder = {
  '排序：': [
    {
      name: '上升最快',
      id: 0
    },
    {
      name: '最热',
      id: 1
    },
    {
      name: '最新',
      id: 2
    },
  ]
}

const datas = ref([]);

const state = reactive({
  area: query.area,
  type: query.type,
  order: query.order
})

watch(state, () => {
  isRenderFinish.value = false
  const { area, type, order } = state;
  getMvAllService({ area, type, order }).then((res) => {
    datas.value = res.data;
    isRenderFinish.value = true
  })
}, { immediate: true })

const goMvDetail = (item) => {
  router.push(`/mv/${item.id}`)
}
</script>

<style lang="scss" scoped>
.page-container {
  padding-top: 10px;
}
.card-list {
  margin-top: 10px;
  margin-left: -18px;
}
.card {
  width: 33.3%;
  padding-left: 18px;
}

.loading {
  width: 100%;
  height: 80%;
  color: #333;
  font-size: 12px;
}

@media (min-width: 1300px) {
  .card {
    width: 25%;
  }
}
</style>