<template>
  <div class="full-screen relactive-position" :style="fullScreenStyly">
    <div class="bg-filter absolute"></div>
    <div class="container absolute-center column items-center" @click="setAudioPlay">
      <div class="img-wrap radius-round">
        <div class="img-box radius-round">
          <img class="radius-round" :src="currentPlaying.picUrl" ref="imgRef">
        </div>
      </div>
      <div class="song">
        <div class="song-names">
          <span>{{ currentPlaying.name }}</span>
          <i> - </i>
          <span>{{ nameFormat(currentPlaying.ar) }}</span>
        </div>
        <div class="lyric">
          <p 
            v-for="(lyric, key) of lrcObj" 
            :key="key"
            :class="{ 'active': key == curLyrics }"
          >
            {{ lyric }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useStore } from 'vuex'
import { useAnimate } from '../hooks/useAnimate'
import { getLyricService } from '../services/song'

const store = useStore();
const imgRef = ref(null);
const currentPlaying = computed(() => store.state.currentPlaying);
const fullScreenStyly = computed(() => 
  currentPlaying.value.picUrl ? `background-image:url(${ currentPlaying.value.picUrl })` : ''
);
const audio = computed(() =>  store.state.audioRef);
const lyrics = ref([]);
const lrcObj = ref({});
const curLyrics = ref(0);

onMounted(() => {
  start(imgRef);
  if (!store.state.playState) {
    stop();
  }

  nextTick(() => {
    audio.value.addEventListener('timeupdate', function() {
      store.commit('SET_CURRENT_TIME', this.currentTime)
      if(lrcObj.value[ Math.floor(this.currentTime) ] != undefined) {
        // console.log(lrcObj.value[ Math.floor(this.currentTime) ])
        curLyrics.value = Math.floor(this.currentTime);
      }
    })
  })
})

watch(
  () => currentPlaying.value.id, 
  () => {
    if (currentPlaying.value.id) {
      getLyric(currentPlaying.value.id);
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

const { start, stop, continu, animateState } = useAnimate();

const setAudioPlay = () => {
  store.dispatch('playAudio', audio);
}

function nameFormat(ar) {
  let names = [];
  ar && ar.forEach(item => names.push(item.name));
  return names.join()
}

function getLyric(id) {
  lrcObj.value = {}
  getLyricService(id).then(res => {
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
  })
  console.log(lrcObj.value)
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
  border: solid 15px rgba(0, 0, 0, 0.05);
}
.img-box {
  width: 300px;
  height: 300px;
  border: solid 70px #000;
  box-sizing: content-box;
}


.song .song-names {
  margin: 10px 0 30px 0;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: #fff;
}

.song .lyric {
  height: 115px;
  // overflow: hidden;
  text-align: center;
  font-size: 16px;
  overflow-y: auto;
  p {
    color: #f5f5f5;
    line-height: 2.4rem;
  }
  .active {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
  }
}

.radius-round {
  border-radius: 50%;
}
</style>