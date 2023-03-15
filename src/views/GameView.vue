<template>
    <div class="game-container">
		<div class="overlay" v-if="game_finished">
			<div>
				<p>{{ whoWon() }}</p>
				<h1 v-html="message"></h1>
				<div class="buttons">
					<span class="quit" @click=" quit()">QUIT</span>
					<span class="next-round" @click="refreshGame()">NEXT ROUND</span>
				</div>
			</div>
		</div>
		<div class="header">
			<h4 class="home-title" @click="$router.push('/')">
				<span class="x-title">X</span>
				<span class="o-title">O</span>
			</h4>
			<span class="player-turn">{{ player_turn }} TURN</span>
			<span class="refresh" @click="refreshGame()">
                <img src="@/assets/refresh.png" alt="">
            </span>
		</div>

		<div class="fields">
			<span v-for="n in 9" :key="n" :data-field="n" @click="selectField(n)">
				<span :class="{'wining-field':wining_combination.includes(n), [get_mark(n) + '-field']: true}">{{ get_mark(n) }}</span>
			</span>
		</div>

		<div class="footer">
			<p class="x-stats">
				<span>X ({{ store.player_choice == 'X' ? 'P1' : store.player_2 ? 'P2' : 'CPU' }})</span>
				<span>{{ player_x_wins }}</span>
			</p>
			<p class="ties">
				<span>TIES</span>
				<span>{{ ties }}</span>
			</p>
			<p class="o-stats">
				<span>O ({{ store.player_choice == 'O' ? 'P1' : store.player_2 ? 'P2' : 'CPU' }})</span>
				<span>{{ player_o_wins }}</span>
			</p>
		</div> 
	</div>
</template>

<script setup>
import { useGameStore } from '@/store/game.js';
import { onMounted, ref, router, h } from 'vue';
let store = useGameStore();

let selected_fields = ref({ 
    'X': [],
    'O': [],
});
let available_fields = [1,2,3,4,5,6,7,8,9];
const win_combinations = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
let player_turn = ref('X');
let player_x_wins = ref(0);
let player_o_wins = ref(0);
let ties = ref(0);
let game_finished = ref(false);
let message = ref('');
let wining_combination = ref([]);
let player_won = ref('');

const selectField = (field_number) => {
    if (!available_fields.includes(field_number) || game_finished.value) {
        return;
    }
    
    selected_fields.value[player_turn.value].push(field_number); 
    available_fields.splice(available_fields.indexOf(field_number), 1);
    player_turn.value = player_turn.value == 'X' ? 'O' : 'X'; 

    checkWin();

    if(player_turn.value != store.player_choice && !game_finished.value && !store.player_2){ 
        cpuPlay();
    }
}

const refreshGame = () => {
    selected_fields.value = {
        'X': [],
        'O': [],
    };
    player_turn.value = 'X';
    game_finished.value = false;
    available_fields = [1,2,3,4,5,6,7,8,9];
    wining_combination.value = [];
    player_won.value = '';
    
    if(store.player_choice != player_turn.value && !store.player_2) { 
        setTimeout(() => {
            cpuPlay();
        }, 2000);
    }
}

const restartScore = () => {
    player_x_wins.value = 0;
    ties.value = 0;
    player_o_wins.value = 0;
}

const checkWin = () => {
    let x_won = false;
    let o_won = false;

    win_combinations.every(combination => {
        x_won = combination.every(number => { return selected_fields.value['X'].includes(number)});
        o_won = combination.every(number => { return selected_fields.value['O'].includes(number)});
        if (x_won|| o_won) {
            game_finished.value = true;
            wining_combination.value = combination;
            return false;
        }

        return true;
        
    });

    if(x_won|| o_won) {
        if(x_won) {
            player_x_wins.value++;
            player_won.value = 'X';
            message.value = '<span class="x-mark">X</span> TAKES THE ROUND';
        } else if(o_won){
            player_o_wins.value++;
            player_won.value = 'O';
            message.value = '<span class="o-mark">O</span> TAKES THE ROUND';
        }
        return;
    }

    if(available_fields.length < 1 && (!x_won && !o_won)) {
        ties.value++;
        message.value = 'IT\'S A TIE';
        game_finished.value = true;
    }
}

const cpuPlay = () => {
    if(available_fields.length > 0){
        let random_field = available_fields[Math.floor(Math.random() * available_fields.length)];
        setTimeout(() => {
            selectField(random_field);
        }, 1000);
    }
}
        	
const quit = () => {
    refreshGame();
    restartScore();
}

const whoWon = () => {
    if (player_won.value != '') {
        if(store.player_choice == player_won.value){
            return 'PLAYER 1 WON';
        } else {
            return (store.player_2 == true ) ? 'PLAYER 2 WON' : 'CPU WON';
        }
    } else {
        return 'NOBODY WON';
    }
}

const get_mark = (field_num) => {
    let selected_mark = '';
    for (const mark in selected_fields.value) {
        if (selected_fields.value[mark].includes(field_num)) {
            selected_mark = mark;
        }
    }

    return selected_mark;
}

onMounted (() => {
    if(store.player_choice != player_turn.value && !store.player_2) {
        cpuPlay();
    }	
})
</script>
