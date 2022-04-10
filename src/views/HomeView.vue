<template>
	<HomeContainer v-if="home" />
	<GameContainer v-if="!home" />
</template>

<script>

import HomeContainer from "../components/HomeContainer.vue";
import GameContainer from "../components/GameContainer.vue";

export default {
	el: '#app',
	name: 'HomeView',
	data() {
		return {
			home: true,
			player_choice: 'X',
			player_2 : false,
		}
	},
	components : {
		HomeContainer,
		GameContainer,
	},
	methods: {
		choosePlayer(player_mark) {
			this.player_choice = player_mark;
		},

		changePage(p2=false){
			this.home = false;
			this.player_2 = p2;
		},
	},
}
</script>
