<template>
    <div class="row justify-content-md-center">
        <h2 class="text-center col-sm-12">Contas</h2>

        <table class="table">
            <thead class="thead-light">
            <tr>
                <th>Número</th>
                <th>Saldo</th>
                <th>Atualizar</th>
                <th>Remover</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="conta in contas">
                <td>{{ conta.id }}</td>
                <td><input type="text"
                           :value="conta.saldo"
                           class="form-control"
                           v-model="conta.saldo"
                />
                </td>
                <td><button id="btnSave" class="btn btn-success" @click.prevent="attConta(conta.id, conta.saldo)">Atualizar</button></td>
                <td><button class="btn btn-danger" @click="excluirConta(conta.id)">Excluir</button></td>
            </tr>
            <tr>
                <td>
                    <input id="numeroConta"
                           name="nro_conta"
                           type="text"
                           class="form-control"
                           v-model.number="numero"
                           placeholder="Número da conta" />
                </td>
                <td>
                    <input type="text"
                           id="saldo"
                           name="saldo"
                           required
                           class="form-control"
                           v-model="saldo"
                           placeholder="Saldo" />
                </td>
                <td>
                    <button id="btnInsert" class="btn btn-primary" @click.prevent="insereConta">Inserir</button>
                </td>
                <td></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                numero: null,
                saldo: null,
                accs: []
            }
        },
        props: ['contas'],
        methods: {
            excluirConta(id) {
                let data = {number: this.numero, balance: this.saldo};
                let vmthis = this;

                swal({
                    title: 'Tem certeza que deseja excluir a conta?',
                    text: "Não será possível reverter essa ação!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, excluir!'
                }).then(function () {
                    $.ajax({
                        url: 'http://localhost:3000/contas/' + id,
                        type: 'delete',
                        data: JSON.stringify(data),
                        crossDomain: true,
                        contentType: 'application/json',
                        dataType: 'json',
                        success: function (res) {
                            swal(
                                'Conta excluida',
                                '',
                                'success'
                            );
                            vmthis.contas.forEach(function(el, ix) {
                                id === el.id ? vmthis.contas.splice(ix, 1) : '';
                            });
                        },
                        error: function (xhr, text, err) {
                            swal(
                                'Erro',
                                'Não foi possível excluir a conta',
                                'error'
                            );
                            console.log('error: ', err);
                            console.log('text: ', text);
                            console.log('xhr: ', xhr);
                        }
                    });

                    swal(
                        'A conta foi exluida!',
                        '',
                        'success'
                    );
                });
            },
            attConta(id, saldo) {
                let data = {number: id, balance: saldo};
                let vmthis = this;

                $.ajax({
                    url: 'http://localhost:3000/contas/' + data.number,
                    type: 'put',
                    contentType: 'application/json',
                    crossDomain: true,
                    data: JSON.stringify(data),
                    success: function (res) {
                        swal(
                            'Conta atualizada',
                            '',
                            'success'
                        );
                        let conta = vmthis.contas.find(x => x.id === data.number.toString());
                        conta.saldo = res.balance;
                    },
                    error: function (xhr, text, err) {
                        swal(
                            'Erro',
                            'Não foi possível inserir a conta',
                            'error'
                        );
                        console.log('error: ', err);
                        console.log('text: ', text);
                        console.log('xhr: ', xhr);
                    }
                });
                this.numero = '';
                this.saldo = '';
            },
            insereConta() {
                let data = {number: this.numero, balance: this.saldo};
                $.ajax({
                    url: 'http://localhost:3000/conta',
                    type: 'post',
                    contentType: 'application/json',
                    crossDomain: true,
                    data: JSON.stringify(data),
                    success: function (res) {
                        swal(
                            'Conta inserida',
                            '',
                            'success'
                        );
                    },
                    error: function (xhr, text, err) {
                        swal(
                            'Erro',
                            'Não foi possível inserir a conta',
                            'error'
                        );
                        console.log('error: ', err);
                        console.log('text: ', text);
                        console.log('xhr: ', xhr);
                    }
                });
                this.numero = '';
                this.saldo = '';
                let oThis = this;
                setTimeout(function () {
                    oThis.attTable()
                }, 500);
            },
            attTable() {
                let vmthis = this;
                $.ajax({
                    url: 'http://localhost:3000/conta',
                    type: 'get',
                    crossDomain: true,
                    dataType: 'json',
                    success: function (res) {
                        let last_inserted = res.pop();
                        vmthis.contas.push({id: last_inserted.number, saldo: last_inserted.balance});
                    },
                    error: function(err) {
                        console.log('ERRO');
                        console.log(err);
                    }
                });
            }
        },
        beforeCreate() {
            let vmthis = this;
            $.ajax({
                url: 'http://localhost:3000/conta',
                type: 'get',
                crossDomain: true,
                dataType: 'json',
                success: function (res) {
                    res.forEach(function(conta) {
                        vmthis.contas.push({id: conta.number, saldo: conta.balance});
                    });
                    vmthis.contas.sort((a,b) => {
                       return a.id - b.id;
                    });
                },
                error: function(err) {
                    console.log('ERRO');
                    console.log(err);
                }
            });
        }
    }
</script>
<style scoped>

</style>