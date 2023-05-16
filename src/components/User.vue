<template>
  <div class="user-info relative-position" @click="onUserClick">
		<article>
			<img :src="userInfo?.avatarUrl || defaultAvatar" alt="">
		</article>
		<div class="user">
			<span class="username ellipsis">{{ userInfo?.nickname || '未登录' }}</span>
			<i class="iconfont icon-caret-right" ref="caretRightRef"></i>
		</div>

		<div 
			v-if="showUserList"
			class="user-list" 
			:style="userListStyle"
		>
			<div class="top">
				<div class="userevents flex justify-around">
					<div class="event column items-center">
						<strong>{{  userInfo.eventCount }}</strong>
						<span>动态</span>
					</div>
					<div class="follows column items-center">
						<strong>{{  userInfo.follows }}</strong>
						<span>关注</span>
					</div>
					<div class="followeds column items-center">
						<strong>{{ userInfo.followeds }}</strong>
						<span>粉丝</span>
					</div>
				</div>
				<div class="qd-btn">签到</div>
			</div>
			<div class="list">
				<li @click="logout">
					<div class="content">
						<i class="iconfont icon-guanbi"></i>
						<span>退出登录</span>
					</div>
				</li>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getUserDetailService } from '../services/user'
import { useStore } from 'vuex'

const store = useStore();
const caretRightRef = ref(null);
const showUserList = ref(false);
const userListStyle = ref('');

onMounted(() => {
	document.addEventListener('click', function(e) {
		showUserList.value = false
	}, false);
})

const userInfo = computed({
	get: () => store.state.userInfo,
  set: (val) => {
    store.commit('SET_USER_INFO', val);
  }
});
const defaultAvatar = 'http://p2.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg';

const onUserClick = async () => {
	if (userInfo.value?.userId) {
		const user = await getUserDetailService(userInfo.value.userId);
		Object.assign(userInfo.value, user.profile);

		userListStyle.value = `left:${ caretRightRef.value.offsetLeft + 20 }px`;
		showUserList.value = !showUserList.value
		return
	}
	
	electronAPI.openLoginWin();
}

const logout = () => {
	localStorage.removeItem('cookie');
	store.commit("SET_USER_INFO", {});
	alert('退出成功')
}

</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  font-size: 14px;

	.user {
		user-select: none;
	}
	.username {
		display: inline-block;
		max-width: 100px;
		vertical-align: bottom;
	}
	article {
		width: 40px;
		height: 40px;
		margin: 10px;
		border-radius: 50%;
		overflow: hidden;
		cursor: pointer;
	}
	.icon-caret-right {
		font-size: 13px;
		color: #8D8D8D;
	}

	.user-list {
		display: none;
		position: absolute;
    top: 8px;
		width: 320px;
		height: 440px;
		border-radius: 5px;
		background: #fff;
		box-shadow: 0 1px 5px #0003, 0 2px 2px #00000024, 0 3px 1px -2px #0000001f;
	}
	.user-list .top {
		width: 100%;
    height: 150px;
		text-align: center;
	}
	.user-list .top .userevents {
		padding: 25px 10px 20px;
	}

	.user-list .top .qd-btn {
		width: 100px;
		height: 30px;
    margin: 0 auto;
    line-height: 30px;
    text-align: center;
    font-size: 12px;
    border: solid 1px #ccc;
    border-radius: 50px;
		&:hover {
			background: #eee;
		}
	}
	.user-list .top strong {
		font-size: 1.65rem;
	}

	.event,
	.follows,
	.followeds {
		flex: 1;
		color: #333;
		font-size: 12px;
	}

	.follows {
		border-left: solid 1px #eee;
		border-right: solid 1px #eee;
	}

	.user-list .list li {
		width: 100%;
    height: 40px;
    line-height: 30px;
    padding: 5px 0;
		border-top: solid 1px #eee;
	}
	.user-list .list li .content:hover {
		background: #f2f2f2;
	}

	.user-list .list i {
		vertical-align: middle;
		margin: 0 10px;
	}

}
</style>