<template>
    <div class="row justify-content-center">
        <h2 class="text-center col-sm-12">Buscar Conta</h2>
        <div class="form-group col-sm-8">
            <label for="buscarConta">Buscar conta por id:</label>
            <input id="buscarConta" type="text" class="form-control" v-model.number="numero">
        </div>
        <div class="w-100"></div>
        <button class="btn btn-primary" @click.prevent="buscaConta">Buscar</button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                numero: null
            }
        },
        props: ['contas'],
        methods: {
            buscaConta() {
                let conta = this.contas.find(x => x.id === this.numero.toString());
                swal({
                    html: 'Numero da conta: ' + conta.id + '</br>' + 'Saldo: ' + conta.saldo
                });
            }
        }
    }
</script>