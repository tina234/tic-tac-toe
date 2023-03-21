import { defineStore } from 'pinia'
import {ref} from 'vue';

export const useGameStore = defineStore('gameStore', () => {
    let player_2 = false; 
    let home = true;
    let player_choice = ref('X');
    
    const choosePlayer = (player_mark) => {
        console.log(player_mark);
        player_choice.value = player_mark;
    }
   
    return {
        player_2,
        player_choice,
        home,
        choosePlayer
    };
})