<template>
  <div class="footer" ref="footerRef">

    <!-- 歌曲信息 待提组件 -->
    <div class="info" :class="{ 'is-open': store.state.playInfoShow }">
      <div class="content">歌曲信息</div>
    </div>

    <!-- 播放控制条 -->
    <div class="control-bar flex justify-between items-center">  
      <div 
        v-if="source.url"
        class="progress-bar" 
        ref="progressBarRef" 
        @click="progressBarClick"
      >
        <div class="play-progress" ref="playProgressRef">
          <span 
            class="round" 
            ref="playRoundRef" 
            @mousedown="progressChange"
          ></span>
        </div>
        <div class="preload-bar" ref="preloadProgressRef"></div>
      </div>
      <div class="play flex">
        <div class="flex" style="width: 100%;" v-if="currentPlaying.id">
          <div class="avatar" @click="showSongInfo">
            <img :src="currentPlaying.picUrl" alt="">
          </div>
          <div class="play-info">
            <div class="name flex">
              <p class="voicename ellipsis" style="max-width: 16vw;">
                <span @click="showSongInfo">{{ currentPlaying.name }}</span>
                <span v-if="currentPlaying.alia">({{ currentPlaying.alia }})</span>
              </p>
              <p class="ar ellipsis" style="max-width: 10vw;">
                &nbsp;-
                <template v-for="(item, index) in currentPlaying.ar" :key="item.name">
                  <span class="separator" v-if="index !== 0">/</span>
                  <span class="text-link artist">{{ item.name }}</span>
                </template>
              </p>
            </div>
            <div class="time-area">
              <span class="duration">{{ secondToDate(currentTime) }}</span>
              <span>&nbsp;/ {{ dateFormat(currentPlaying.duration, 'mm:ss') }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="control-btns flex justify-center items-center">
        <audio 
          :src="source.url"
          controls
          autoplay
          preload="none"
          style="display: none"
          ref="audioRef"
        ></audio>

        <i class="iconfont icon-xihuan1"></i>
        <i class="control prev iconfont icon-diyiyeshouyeshangyishou"></i>
        <div class="ply" @click="playAudio">
          <i :class="['control', 'iconfont',  playState ? 'icon-zanting' : 'icon-bofang1']"></i>
        </div>
        <i class="control next iconfont icon-zuihouyiyemoyexiayishou"></i>
        <i class="iconfont icon-fenxiang"></i>
      </div>
      <div class="setting-area flex justify-end ralative-position">
        <div class="setting-btns flex items-center justify-end">
          <div class="play-list-btn" @click="playlistShow = !playlistShow">
            <i class="iconfont icon-24gf-playlist3" :style="`color:${playlistShow ? 'red' : ''}`"></i>
            <!-- 播放列表 -->
            <div class="play-list-area absolute" v-if="playlistShow">
              <div class="title">
                <h3>当前播放</h3>
                <div class="flex justify-between" style="font-size: 12px; padding: 10px 0; border-bottom: solid 1px #f5f5f5;">
                  <span class="play-list-count" style="color: #ccc">总{{ playList.length || 0 }}首</span>
                  <div class="play-list-btns flex">
                    <div class="btn subscribe-btn text-link"><i class="iconfont icon-xinjianwenjianjia"></i> 收藏全部</div>
                    <div class="btn clear-btn">清空列表</div>
                  </div>
                </div>
              </div>
              <div class="content">
                <table>
                  <tbody>
                    <tr
                      v-for="(item, index) in playList"
                      :key="item.id"
                    >
                      <td>
                        <span :class="{'play-text': item.play}">{{ item.name }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div 
            class="volume-area" 
            ref="volumeRef" 
            @mouseenter="showVolumeBar(true)"
            @mouseleave="showVolumeBar(false)"
          >
            <i 
              :class="['iconfont', ismuted ? 'icon-shengyin04-xianxing' : 'icon-shengyin01-xianxing']"
               @click.self="btnSetVolume"
            ></i>
            <div class="volume-bar" ref="volumeBarRef">
              <span class="slide-bar" ref="volumeSlideBarRef">
                <span class="volume-slide" ref="volumeSliderRef">
                  <span
                    class="round" 
                    ref="volumeRoundRef" 
                    @mousedown="slideVolumeBar($event)"
                  ></span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  computed,
  onMounted, 
  ref, 
  watch 
} from 'vue';
import { useStore } from 'vuex'
import { dateFormat, secondToDate } from '@/utils/api'

const store = useStore();
const currentPlaying = computed(() => store.state.currentPlaying)
const source = computed(() => store.state.source);
const playState = computed(() => store.state.playState);
const currentTime = computed({
  get: () => store.state.currentTime,
  set: (val) => {
    store.commit('SET_CURRENT_TIME', val)
  }
})

const footerRef = ref(null);
const audioRef = ref(null);

const progressBarRef = ref(null);
const playProgressRef = ref(null);
const preloadProgressRef = ref(null);
const playRoundRef = ref(null);

const volumeRef = ref(null);
const volumeBarRef = ref(null);
const volumeSlideBarRef = ref(null);
const volumeSliderRef = ref(null);
const volumeRoundRef = ref(null);


// 音量
const volume = computed(() => (store.state.volume / 100) || 1);
const _volume = ref(volume)
const muted = ref(false);
const volumeBarShow = ref(false);
const ismuted = computed(() => muted.value);

let t = null;

// 播放进度条
let pt = null;

const playlistShow = ref(false)
// const playListCount = computed(() => currentPlaying.value.playList.length)
const playList = computed(() => currentPlaying.value.playList)

onMounted(() => {
  audioRef.value.addEventListener('playing', _playing, false);
  audioRef.value.addEventListener('canplay', _canplay, false);
  audioRef.value.addEventListener('ended', _ended, false);

  store.commit('SET_AUDIO_REF', audioRef);

  if (localStorage.getItem('vuex') !== null) {
    let store = JSON.parse(localStorage.getItem('vuex'));
    setVolume(Number(store.volume), true);
    playProgressRef.value.style.width = (Number(store.currentTime) / (store.currentPlaying.duration / 1000)) * 100 + '%';
    audioRef.value.currentTime = currentTime.value;
    audioRef.value.pause();
  }

  document.addEventListener('click', function() {
    // playlistShow.value = false
  }, false)
})

const playAudio = () => {
  if (!store.state.source) return;
  store.dispatch('playAudio', audioRef);
}

function progressBarClick(e) {
  setPlayProgress(e.pageX);
}

function progressChange(e) {
  let _mousemove = _mouseMove.bind(volumeRoundRef.value),
      _mouseup = _mouseUp.bind(volumeRoundRef.value);
      
  document.addEventListener('mousemove', _mousemove, false);
  document.addEventListener('mouseup', _mouseup, false);

  function _mouseMove(e) {
    audioRef.value.pause();
    setPlayProgress(e.pageX);
  }
  function _mouseUp() {
    if (store.state.playState) {
      audioRef.value.play();
    }
    document.removeEventListener('mousemove', _mousemove, false);
    document.removeEventListener('mouseup', _mouseup, false);
  }
}

function setPlayProgress(pageX) {
  let duration = audioRef.value.duration,
      curPropressBarWidth = pageX - footerRef.value.offsetLeft,
      ratio = 0;
      
  if (curPropressBarWidth <= 0) {
    ratio = 0;
  } else if (curPropressBarWidth >= progressBarRef.value.offsetWidth) {
    ratio = 1;
  } else {
    ratio = curPropressBarWidth / progressBarRef.value.offsetWidth
  }
  
  audioRef.value.currentTime = duration * ratio;
  playProgressRef.value.style.width = ratio * 100 + '%';
}

function _playing() {
  clearInterval(t);
  let duration = audioRef.value.duration,
      progressBarWidth = progressBarRef.value.offsetWidth;
      
  t = setInterval(() => {
    currentTime.value = audioRef.value.currentTime;
    playProgressRef.value.style.width = (currentTime.value / duration) * 100 + '%';
    
    if (playProgressRef.value.offsetWidth >= progressBarWidth) {
      clearInterval(t);
      t = null;
    }

  }, 1000)
}

function _canplay() {
  clearInterval(pt);
  let duration = audioRef.value.duration,
      preloadProgress = 0,
      progressBarWidth = progressBarRef.value.offsetWidth;

  pt = setInterval(() => {
    if(audioRef.value.buffered.length != 0){
      preloadProgress = audioRef.value.buffered.end(0);
    }
    preloadProgressRef.value.style.width = (preloadProgress / duration) * 100 + '%';
    if (preloadProgressRef.value.offsetWidth >= progressBarWidth) {
      clearInterval(pt);
      pt = null;
    }
  }, 1000);
}

function _ended() {
  store.commit('SET_PLAY_STATE', false);
  clearInterval(t);
  t = null;
}

function btnSetVolume() {
  // if (!muted.value && !volumeBarShow.value) {
  //   showVolumeBar(true)
  // }
  if (!muted.value && volumeBarShow.value) {
    setMuted(true);
    setVolume(0, true);
  } else {
    setMuted(false);
    setVolume(store.state.volume, true)
  }
}

function showVolumeBar(show) {
  if (show) {
    volumeBarRef.value.className += ' show';
    volumeBarShow.value = true
  } else {
    volumeBarRef.value.className = 'volume-bar';
    volumeBarShow.value = false
  }
}

function setMuted(ismuted) {
  if (ismuted) {
    muted.value = true;
    audioRef.value.muted = true;
  } else {
    muted.value = false;
    audioRef.value.muted = false;
  }
}

function setVolume(volume, isChangeBar) {
  audioRef.value.volume = volume;
  isChangeBar && (volumeSliderRef.value.style.height = (volume * 100) + '%');
}

function slideVolumeBar(e) {
  let dy = e.pageY, // 按下时圆点 pageY
      my = 0, // 移动时的pageY
      disY = 0, // 相减
      sHeight = 0,
      slideHeight = volumeSliderRef.value.offsetHeight, // 圆点滑动的高度
      volumeBarHeight = volumeSlideBarRef.value.offsetHeight, // 音量条高度
      _mousemove = _mouseMove.bind(volumeRoundRef.value),
      _mouseup = _mouseUp.bind(volumeRoundRef.value);
      
  document.addEventListener('mousemove', _mousemove, false)
  document.addEventListener('mouseup', _mouseup, false)

  function _mouseMove(e) {
    let my = e.pageY,
        disY = dy - my,
        sHeight = slideHeight + disY;

    if (sHeight < volumeBarHeight && sHeight > 0) {
      volumeSliderRef.value.style.height = sHeight + 'px';
      setMuted(false)
    } else if (sHeight >= volumeBarHeight) {
      volumeSliderRef.value.style.height = volumeBarHeight + 'px';
      sHeight = volumeBarHeight;
      setMuted(false)
    } else if (sHeight <= 0) {
      volumeSliderRef.value.style.height = '0';
      sHeight = 0;
      setMuted(true);
    }
    let volume = (sHeight / volumeBarHeight).toFixed(1);
    store.commit('SET_VOLUME', volume);
    setVolume(store.state.volume, false);

    if (Number(volume) == 0) {
      store.commit('SET_VOLUME', .5);
    }
  }
  function _mouseUp() {
    document.removeEventListener('mousemove', _mousemove, false);
    document.removeEventListener('mouseup', _mouseup, false);
  }
}

function showSongInfo() {
  store.commit('SET_PLAY_INFO_SHOW', !store.state.playInfoShow)
}


</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
}
.control-bar {
  width: 100%;
  height: 100%;
  background: #fff;
}
.play {
  width: 35vw;
  padding: 10px;
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
  }
  .play-info {
    margin-left: 10px;
    .name {
      font-size: .85rem;
    }
    .voicename {
      cursor: pointer;
    }
    .ar {
      font-size: 12px;
      color: #666;
    }
    .time-area {
      font-size: 12px;
      color: #999;
    }
  }
}
.control-btns {
  width: 30vw;
  i {
    font-size: 18px;
    cursor: pointer;
  }
  .control {
    font-size: 30px;
    color: #c3473a;
  }
  .prev {
    margin: 0 20px 0 30px;
  }
  .next {
    margin: 0 30px 0 20px;
  }
  .ply {
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
    overflow: hidden;
    background: #c3473a;
    .control {
      display: inline-block;
      width: 100%;
      height: 100%;
      // margin-left: 2px;
      font-size: 18px;
      color: #fff;
    }
  }

}
.setting-area {
  width: 35vw;
  .setting-btns {
    width: 100%;
    padding: 0 25px;
    i {
      margin-left: 15px;
    }
  }
  .icon-shengyin01-xianxing,
  .icon-shengyin04-xianxing {
    font-size: 18px;
  }

  .play-list-area {
    width: 415px;
    height: calc(100vh - 110px);
    background: #fff;
    right: 0px;
    bottom: 60px;
  }
  .play-list-area .title {
    padding: 20px 20px 0;
    h3 {
      font-weight: bold;
    }
  }
  .play-list-area .play-list-btns {
    font-size: 13px;
    .btn {
      margin-left: 20px;
    }
    .clear-btn {
      color: #3360AF;
      cursor: pointer;
      &:hover {
        color: #1901c7;
      }
    }
    .icon-xinjianwenjianjia {
      vertical-align: bottom;
    }
  }
}

.separator {
  display: inline-block;
  margin: 0 2px;
  font-size: 12px;
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  cursor: pointer;
  &:hover .play-progress .round {
    opacity: 1;
  }
  .play-progress {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    // width: 30%;
    height: 100%;
    background: #c3473a;
    .round {
      position: absolute;
      top: -5px;
      right: -6px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #c3473a;
      opacity: 0;
      // transition: all .2s;
    }
  }

  .preload-bar {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    height: 100%;
    background: #ddd;
  }
}

.volume-area {
  position: relative;
  // padding-top: 10px;
  .volume-bar {
    display: none;
    position: absolute;
    bottom: 30px;
    right: -4px;
    z-index: 1;
    width: 30px;
    height: 100px;
    padding: 12px 0;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px #e5e5e5;
  }
  .volume-bar.show {
    display: block;
  }
  .slide-bar {
    display: block;
    position: relative;
    width: 4px;
    height: 100%;
    margin: auto;
    background: #e5e5e5;
  }
  .volume-slide {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 4px;
    // height: 50%;
    background: #c3473a;
    border-radius: 2px;
  }
  .round {
    position: absolute;
    top: -5px;
    left: -3px;
    width: 10px;
    height: 10px;
    background: #c3473a;
    border-radius: 50%;
    cursor: pointer;
  }
}


.info {
  // display: none;
  position: absolute;
  top: calc(-100vh + 110px);
  z-index: -1;
  width: 100%;
  height: calc(100vh - 110px);
  // padding-top: 50px;
  background: #f6f6f6;
  transform: translateY(100%);
  transition: transform ease-out 0.3s;
}
.info.is-open {
  transform: translateY(0);
  transition: transform ease-out 0.3s;
}

.content {
  height: calc(100% - 85px);
  width: 100%;
  overflow-y: auto;
  tbody tr:nth-child(odd){
    background: #fafafa;
  }
  tbody tr:hover {
    background: #f2f2f3;
  }
  tr {
    height: 35px;
  }
  td {
    padding-left: 20px;
    font-size: .75rem;
    color: #424242;
  }
  
}
</style>