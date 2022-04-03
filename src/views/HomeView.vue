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
      <span class="player-turn">X turn</span>
      <span class="refresh">R</span>
    </div>

    <div class="fields">
      <span v-for="n in 9" :key="n" :data-field="n"></span>
    </div>

    <div class="footer">
      <p class="x-stats">
        <span>X(you)</span>
        <span>0</span>
      </p>
      <p class="ties">
        <span>Ties</span>
        <span>0</span>
      </p>
      <p class="o-stats">
        <span>O (CPU)</span>
        <span>0</span>
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
    }
  }
}
</script>
