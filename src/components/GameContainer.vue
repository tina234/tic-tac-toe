<template>
    <div class="game-container" :style="{ 'margin-top' :  margin_top }">
		<div class="overlay" v-if="game_finished">
			<div>
				<p>{{ whoWon() }}</p>
				<h1>{{ message }}</h1>
				<div class="buttons">
					<span class="quit" @click="quit()">QUIT</span>
					<span class="next-round" @click="refreshGame()">NEXT ROUND</span>
				</div>
			</div>
		</div>
		<div class="header">
			<h4 class="home-title">
				<span class="x-title">X</span>
				<span class="o-title">O</span>
			</h4>
			<span class="player-turn">{{ player_turn }} turn</span>
			<span class="refresh" @click="refreshGame()">R</span>
		</div>

		<div class="fields">
			<span v-for="n in 9" :key="n" :data-field="n" :class="[  wining_combination.includes(n) ? 'wining-field' : '' ]" @click="selectField(n)">
				<icon :class="[ selected_fields[n] + '-field' ]">{{ selected_fields[n] }}</icon>
			</span>
		</div>

		<div class="footer">
			<p class="x-stats">
				<span>X ({{ this.$parent.player_choice == 'X' ? 'P1' : this.$parent.player_2 ? 'P2' : 'CPU' }})</span>
				<span>{{ player_x_wins }}</span>
			</p>
			<p class="ties">
				<span>Ties</span>
				<span>{{ ties }}</span>
			</p>
			<p class="o-stats">
				<span>O ({{ this.$parent.player_choice == 'O' ? 'P1' : this.$parent.player_2 ? 'P2' : 'CPU' }})</span>
				<span>{{ player_o_wins }}</span>
			</p>
		</div> 
	</div>
</template>

<script>
export default {
    data() {
		return {
			player_turn: 'X',
			selected_fields: {},
			available_fields : [1,2,3,4,5,6,7,8,9],
			win_combinations: [ [1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]],
			player_x_wins : 0,
			ties: 0,
			player_o_wins : 0,
			game_finished : false,
			message: '',
			wining_combination : [],
			player_won: '',
		}
	},
    methods: {
        selectField(field_number) {
			if(this.selected_fields[field_number] === undefined && !this.game_finished){
				this.selected_fields[field_number] = this.player_turn;
				this.available_fields.splice(this.available_fields.indexOf(field_number), 1);
			
				if (this.player_turn == 'X') {
					this.player_turn = 'O';
				} else {
					this.player_turn = 'X';
				}

				this.checkWin();
			}

			if(this.player_turn != this.$parent.player_choice && !this.game_finished && !this.$parent.player_2){
				this.cpuPlay();
			}
		},
        refreshGame() {
			this.selected_fields = {};
			this.player_turn = 'X';
			this.game_finished = false;
			this.available_fields = [1,2,3,4,5,6,7,8,9];
			this.wining_combination = [];
			if(this.$parent.player_choice != this.player_turn && !this.$parent.player_2) {
				setTimeout(() => {
					this.cpuPlay();
				}, 200);
			}
		},

		restartScore() {
			this.player_x_wins = 0;
			this.ties = 0;
			this.player_o_wins = 0;
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
							this.player_won = 'X';
							this.message = 'X TAKES THE ROUND';
						} else if(o_won){
							this.player_o_wins++;
							this.player_won = 'O';
							this.message = 'O TAKES THE ROUND';
						}
						this.wining_combination = combination;
						this.game_finished = true;
						return;
					}
				});

				if(Object.keys(this.selected_fields).length === 9 && (!x_won && !o_won)) {
					this.ties++;
					this.message = 'IT\'S A TIE';
					this.game_finished = true;
				}
			}
		},

		cpuPlay() {
			if(this.available_fields.length > 0){
				let random_field = this.available_fields[Math.floor(Math.random() * this.available_fields.length)];
				setTimeout(() => {
					this.selectField(random_field);
				}, 700);
			}
		},
        	
		quit() {
			this.$parent.home = true;
			this.refreshGame();
			this.restartScore();
		},

		whoWon() {
			if (this.player_won != '') {
				if(this.$parent.player_choice == this.player_won){
					return 'Player 1 won';
				} else {
					return (this.player_2 == true ) ? 'Player 2 won' : 'CPU won';
				}
			} else {
				return 'NOBODY WON';
			}
		}
    },
    mounted() {
        if(this.$parent.player_choice != this.player_turn && !this.$parent.player_2) {
            this.cpuPlay();
        }

		let window_height = window.innerHeight;
		if(this.$refs.gameCont != undefined) {
			let game_height = this.$refs.gameCont.clientHeight;
			this.margin_top = (window_height - game_height) / 2 + 'px';
		}
		
	}
}
</script>