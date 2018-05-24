<template>
  <div id="app">
      <div class="container">
          <app-buscar-conta :contas="contas"></app-buscar-conta>
          <hr>
          <app-contas :contas="contas"></app-contas>
      </div>
  </div>
</template>

<script>
import appBuscarConta from './components/BuscarConta.vue';
import appContas from './components/Contas.vue';

export default {
    name: 'app',
    data() {
      return {
          contas: []
      }
    },
    components: {
        appBuscarConta,
        appContas
    }
}
</script>

<style>
</style>
