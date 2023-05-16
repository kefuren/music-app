export default {
  playAudio: (ctx, audio) => {
    if (audio.value.paused) {
      ctx.commit('SET_PLAY_STATE', true);
      audio.value.play();
    } else {
      ctx.commit('SET_PLAY_STATE', false);
      audio.value.pause();
    }
  }
}