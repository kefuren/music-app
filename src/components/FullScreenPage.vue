<template>
  <div class="full-screen relative-position" :style="fullScreenStyly">
    <div class="bg-filter absolute"></div>
    <div class="container absolute-center column items-center">
      <div class="img-wrap radius-round">
        <div class="img-border-box radius-round">
          <div 
            class="img-container relative-position"
            @click="setAudioPlay"
          >
            <div class="img-mask radius-round absolute flex justify-center items-center">
              <i :class="[`iconfont icon-${playState ? 'zanting' : 'bofang1'}`]"></i>
            </div>
            <img 
              class="radius-round absolute" 
              :src="currentPlaying.picUrl" 
              ref="imgRef"
            />
          </div>
        </div>
      </div>
      <div class="song">
        <div class="song-names">
          <span>{{ currentPlaying.name }}</span>
          <i> - </i>
          <span>{{ nameFormat(currentPlaying.ar) }}</span>
        </div>
        <div class="lyric-wrap">
          <ul class="lyric-list" :style="lyricListStyle">  
            <li 
              v-for="(lyric, key, index) of lrcObj" 
              :key="key"
              class="lyric-item"
              :class="{ 'active': key == curLyricTime }"
            >
              {{ lyric }}
            </li>
          </ul>
        </div>
      </div>
      <div class="btn-group flex justify-between">
        <div class="btn btn-xihuan radius-round"><i class="iconfont icon-xihuan1"></i></div>
        <div class="btn btn-xiazai radius-round"><i class="iconfont icon-xiazai1"></i></div>
        <div class="btn btn-playlist radius-round"><i class="iconfont icon-24gf-playlist3"></i></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useStore } from 'vuex'
import { useRotate } from '../hooks/useRotate'
import { getLyricService } from '../services/song'

const store = useStore();
const imgRef = ref(null);
const currentPlaying = computed(() => store.state.currentPlaying);
const playState = computed(() => store.state.playState)
const fullScreenStyly = computed(() => 
  currentPlaying.value.picUrl ? `background-image:url(${ currentPlaying.value.picUrl })` : ''
);
const audio = computed(() =>  store.state.audioRef);
const lyrics = ref([]);
const lrcObj = ref({});
const curLyricTime = ref(0);

const curLyricText = ref('');
const lyricListStyle = ref('');

onMounted(() => {
  start(imgRef);
  if (!store.state.playState) {
    stop();
  }

  nextTick(() => {
    let i = 0
    audio.value.addEventListener('timeupdate', function() {

      store.commit('SET_CURRENT_TIME', this.currentTime)
      if(lrcObj.value[ Math.floor(this.currentTime) ] != undefined) {
        curLyricTime.value = Math.floor(this.currentTime);
        curLyricText.value = lrcObj.value[curLyricTime.value];
      }
      
    })
  })
})

watch(curLyricText, (newValue) => {
  if (newValue !== '') {
    Object.keys(lrcObj.value).forEach((item, index) => {
      if (item == curLyricTime.value) {
        lyricListStyle.value = `transform: translateY(${-40 * (index - 1)}px);`;
      }
    });
  }
})

watch(
  () => currentPlaying.value.id, 
  (neeValue) => {
    if (neeValue) {
      lyricListStyle.value = ''
      getLyric(neeValue);
    }
  }, 
  { immediate: true }
)


watch(() => store.state.playState, () => {
  if (animateState.value === 'stopped') {
    continu();
  } else {
    stop();
  }
})

const { start, stop, continu, animateState } = useRotate();

const setAudioPlay = () => {
  store.dispatch('playAudio', audio);
}

function nameFormat(ar) {
  let names = [];
  ar && ar.forEach(item => names.push(item.name));
  return names.join();
}

async function getLyric(id) {
  lrcObj.value = {};
  const res = await getLyricService(id);

  lyrics.value = res.lrc.lyric.split('\n');

  for (let i = 0; i < lyrics.value.length; i ++) {
    let lyric = lyrics.value[i];
    let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
    let timeRegExpArr = lyric.match(timeReg);

    if(!timeRegExpArr) continue;
    let clause = lyric.replace(timeReg, '');

    for(let k = 0, h = timeRegExpArr.length; k < h; k++) {
      let t = timeRegExpArr[k];
      let min = Number(String(t.match(/\[\d*/i)).slice(1)),
          sec = Number(String(t.match(/\:\d*/i)).slice(1));
      let time = min * 60 + sec;
      lrcObj.value[time] = clause;
    }
  }
 
}

</script>

<style lang="scss" scoped>
.full-screen {
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.bg-filter {
  width: 100%;
  height: 100%;
  backdrop-filter: blur(100px);
}

.img-wrap {
  width: fit-content;
  border: solid 18px rgba(255, 255, 255, 0.05);
}

.img-border-box {
  width: 440px;
  height: 440px;
  border: solid #000 70px;
}

.img-container {
  width: 100%;
  height: 100%;
  &:hover .img-mask {
    background: rgba(0, 0, 0, .3);
    z-index: 1;
  }
}

.img-mask {
  width: 100%;
  height: 100%;
  background: transparent;
  .icon-bofang1,
  .icon-zanting {
    color: #fff;
    font-size: 5rem;
    font-weight: bold;
  }
}

.song {
  width: 100vw;
}

.song .song-names {
  margin: 20px 0;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: #fff;
}

.song .lyric-wrap {
  height: 130px;
  overflow: hidden;
  text-align: center;
  font-size: 16px;
  // overflow-y: auto;
  .lyric-list {
    transition: all .6s;
  }

  .lyric-item {
    height: 40px;
    color: #f5f5f5;
    line-height: 40px
  }
  .active {
    transform: scale(1.4);
    font-weight: bold;
    color: #fff;
  }
}

.btn-group {
  width: 300px;
  margin-top: 20px;
  cursor: pointer;
  
  .btn {
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    background: rgba(255, 255, 255, 0.3);
    &:hover {
      background: rgba(255, 255, 255, 0.5)
    }
    
  }
  i {
    font-size: 22px;
    color: #fff;
  }
}

.radius-round {
  border-radius: 50%;
}
</style>