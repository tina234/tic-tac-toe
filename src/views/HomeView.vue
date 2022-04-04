<template>
	<div class="home-container" v-if="home">
		<h4 class="home-title">
			<span class="x-title">X</span>
			<span class="o-title">O</span>
		</h4>
		<div class="player-box">
			<p>PICK PLAYERS MARK</p>
			<div class="pick-player"> 
			<p @click="choosePlayer('x')">
				<span :class="{ 'choosen_player' : player_x }">X</span>
				<span class="player-selector" :class="{ 'go-right' : player_o }"></span>
			</p>
			<p @click="choosePlayer('o')">
				<span :class="{ 'choosen_player' : player_o }">O</span>
			</p>
			</div>
			<p>Remeber : X goes first</p>
		</div>
		<button class="vs-cpu" @click="changePage()">NEW GAME (VS CPU)</button>
	</div>

	<div class="game-container" v-if="!home">
		<div class="header">
		<h4 class="home-title">
			<span class="x-title">X</span>
			<span class="o-title">O</span>
		</h4>
		<span class="player-turn">{{ player_turn }} turn</span>
		<span class="refresh" @click="refreshGame()">R</span>
		</div>

		<div class="fields">
		<span v-for="n in 9" :key="n" :data-field="n" @click="selectField(n)">
			<icon :class="[ selected_fields[n] + '-field']">{{ selected_fields[n] }}</icon>
		</span>
		</div>

		<div class="footer">
		<p class="x-stats">
			<span>X(you)</span>
			<span>{{ player_x_wins }}</span>
		</p>
		<p class="ties">
			<span>Ties</span>
			<span>{{ ties }}</span>
		</p>
		<p class="o-stats">
			<span>O (CPU)</span>
			<span>{{ player_o_wins }}</span>
		</p>
		</div> 
	</div>
</template>

<script>

export default {
	name: 'HomeView',
	data() {
		return {
			home: true,
			player_x : true,
			player_o : false,
			player_turn: 'X',
			selected_fields: {},
			win_combinations: [ [1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]],
			player_x_wins : 0,
			ties: 0,
			player_o_wins : 0,
			game_finished : false,
		}
	},
	methods: {
		choosePlayer(player_mark) {
			if (player_mark == 'x') {
				this.player_x = true;
				this.player_o = false;
			} else {
				this.player_x = false;
				this.player_o = true;
			}
		},

		changePage(){
			this.home = false;
		},

		selectField(field_number) {
			if(this.selected_fields[field_number] === undefined && !this.game_finished){
				this.selected_fields[field_number] = this.player_turn;

				if (this.player_turn == 'X') {
					this.player_turn = 'O';
				} else {
					this.player_turn = 'X';
				}

				this.checkWin();
			}

			if(this.player_turn == 'O'){
				this.cpuPlay();
			}
		},

		refreshGame() {
			this.selected_fields = {};
			this.player_turn = 'X';
			this.game_finished = false;
		},

		checkWin() {
			if(Object.keys(this.selected_fields).length > 2) {
				let selected_pairs = {
					'O' : [],
					'X' : [],
				};
				let x_won = false;
				let o_won = false;

				for (const field_number in this.selected_fields) {
					selected_pairs[this.selected_fields[field_number]].push(parseInt(field_number));
				}

				this.win_combinations.forEach(combination => {
					x_won = combination.every(number => selected_pairs['X'].includes(number));
					o_won = combination.every(number => selected_pairs['O'].includes(number));

					if(x_won || o_won) {
						if(x_won) {
							this.player_x_wins++;
						} else if(o_won){
							this.player_o_wins++;
						}
						this.game_finished = true;
						return;
					}
				});

				if(Object.keys(this.selected_fields).length === 9 && (!x_won && !o_won)) {
					this.ties++;
					this.game_finished;
				}
			}
		},

		cpuPlay() {
			//random bi trebalo odabrati od dostupnih brojeva
			let test = Math.floor(Math.random() * 9) + 1;
			this.selectField(test);
		}
	},
}
</script>
