<template>
    <div class="home-container" ref='homeCont' :style="{ 'margin-top' : margin_top }">
		<h4 class="home-title">
			<span class="x-title">X</span>
			<span class="o-title">O</span>
		</h4>
		<div class="player-box">
			<p>PICK PLAYERS MARK</p>
			<div class="pick-player"> 
			<p @click="choosePlayer('X')">
				<span :class="[ this.$parent.player_choice == 'X' ? 'choosen_player' : '']">X</span>
				<span class="player-selector" :class="[ this.$parent.player_choice == 'O' ? 'go-right' : '']"></span>
			</p>
			<p @click="choosePlayer('O')">
				<span :class="[ this.$parent.player_choice == 'O' ? 'choosen_player' : '']">O</span>
			</p>
			</div>
			<p>Remeber : X goes first</p>
		</div>
		<button class="vs-cpu" @click="changePage()">NEW GAME (VS CPU)</button>
		<button class="vs-cpu" @click="changePage(true)">NEW GAME (VS P2)</button>
	</div>
</template>

<script>
    export default {
		data() {
			return {
				margin_top : 0,
			}
		},
		methods: {
			choosePlayer(mark) {
				this.$parent.choosePlayer(mark);
			},
			changePage(p2=false){
				this.$parent.changePage(p2);
			}
		},
        mounted() {
			let window_height = window.innerHeight;
		
			if(this.$refs.homeCont != undefined) {
				let home_height = this.$refs.homeCont.clientHeight;
				this.margin_top = (window_height - home_height) / 2 + 'px';
			}
        }
    }
</script>