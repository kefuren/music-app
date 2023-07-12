<template>
  <div class="page-container">
    <template v-if="isRenderFinish">
      <div 
        v-for="item in NAVS" 
        :key="item.key"
      >
        <link-title class="link-title" :to="{ name: 'mv-list', query: routerQuery(item.key) }">
          {{ item.name }}
          <template #tagsSlot v-if="item.key === 'first_mv'">
            <Tags 
              :data="mvArea" 
              :showType="false"
              :itemWidth="60"
              v-model="state.area"
            />
          </template>
        </link-title>

        <div class="flex card-list">
          <Card
            class="card"
            v-for="cItem in state[item.key]"
            :key="cItem.id"
            :item="cItem"
            :playBtnCenter="true"
            @onClick="goMvDetail(cItem)"
          >
            <template #cardDesc v-if="item.key !== 'exclusive_mv'">
              <p class="text-link ellipsis">{{ cItem.name }}</p>
              <p class="ellipsis">
                <template v-for="(artist, index) in cItem.artists" :key="index">
                  <span class="separator" v-if="index !== 0">/</span>
                  <span class="text-link ellipsis artist">{{ artist.name }}</span>
                </template>
              </p>
            </template>
          </Card>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from 'vue-router'

import { 
  getMvAllService, 
  getFirstMVService, 
  getExclusiveMVService 
} from '@/services/mv'

import LinkTitle from '@/components/LinkTitle.vue'
import Card from '@/components/card/card.vue'
import Tags from './components/tags.vue'

const router = useRouter();

const NAVS = [
  {
    name: "最新MV",
    key: "first_mv",
  },
  {
    name: "热播MV",
    key: "hot_mv",
  },
  {
    name: "网易出品",
    key: "exclusive_mv",
  }
];

const mvArea = {
  '地区：': [
    {
      name: '内地',
      id: 0
    },
    {
      name: '港台',
      id: 1
    },
    {
      name: '欧美',
      id: 2
    },
    {
      name: '日本',
      id: 3
    },
    {
      name: '韩国',
      id: 4
    },
  ]
}

const isRenderFinish = ref(false);

const routerQuery = computed(() => (key) => {
  let query = {}
  query.area = state.area;
  query.type = '全部';
  query.order = '最新';

  switch (key) {
    case 'hot_mv':
      query.area = '全部';
      query.order = '最热';
      break;
    case 'exclusive_mv':
      query.area = '全部';
      query.type = '网易出品';
      break;
    default:
      break;
  }
  return query;
})

const state = reactive({
  first_mv: [],
  hot_mv: [],
  exclusive_mv: [],
  top_mv: [],
  area: '内地'
})

onMounted(async () => {
  getDatas(
    [
      getFirstMVService({ area: '内地', limit: 6 }),
      getMvAllService({ area: '内地', order: '最热', limit: 6 }),
      getExclusiveMVService(6)
    ]
  )
})

async function getDatas(requests) {
  Promise.all(requests)
  .then(
    (
      [
        { data: first_mv },
        { data: hot_mv },
        { data: exclusive_mv },
      ]
    ) => {
      state.first_mv = first_mv;
      state.hot_mv = hot_mv;
      state.exclusive_mv = exclusive_mv;
      
      isRenderFinish.value = true;
    }
  )
}

const goMvDetail = (item) => {
  router.push(`/mv/${item.id}`)
}

</script>

<style lang="scss" scoped>
.card-list {
  margin-left: -18px;
}
.card {
  width: 33.3%;
  padding-left: 18px;
}
@media (min-width: 1300px) {
  .card {
    width: 25%;
  }
}

.link-title .tag-tabs {
  width: auto;
}
</style>