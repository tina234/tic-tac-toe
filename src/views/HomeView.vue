<template>
	<div class="home-container">
		<h4 class="home-title">
			<span class="x-title">X</span>
			<span class="o-title">O</span>
		</h4>
		<div class="player-box">
			<p>PICK YOUR MARK</p>
			<div class="pick-player"> 
			<p @click="store.choosePlayer('X')">
				<span :class="{'choosen_player': store.player_choice == 'X'}">X</span>
				<span class="player-selector" :class="{'go-right': store.player_choice == 'O'}"></span>
			</p>
			<p @click="store.choosePlayer('O')">
				<span :class="{'choosen_player': store.player_choice == 'O'}">O</span>
			</p>
			</div>
			<p>Remeber : X goes first</p>
		</div>
		<router-link to="/game" @click="startGameVsCpu()"><button class="new-game-btn vs-cpu">NEW GAME (VS CPU)</button></router-link>
		<router-link to="/game" @click="startGameVsPlayer2()"><button class="new-game-btn vs-player2">NEW GAME (VS P2)</button></router-link>
	</div>
</template>

<script setup>
import { useGameStore } from '@/store/game.js';
let store = useGameStore ();

const startGameVsCpu = () => {
	store.player_2 = false;
	store.home = false;
}

const startGameVsPlayer2 = () => {
	store.player_2 = true;
	store.home = false;
}
</script>
