from flask import Flask, render_template, request, redirect, url_for

import subprocess
import random


app = Flask(__name__)
contador_cliques = 0

@app.route('/sala_dojo', methods=['POST'])
def jogo():

    IA = []
    PEDRA = "PEDRA"
    PAPEL = "PAPEL"
    TESOURA = "TESOURA"
    LAGARTO = "LAGARTO"
    SPOCK = "SPOCK"
    opcoes = [PEDRA, PAPEL, TESOURA, LAGARTO, SPOCK]
    pontos_ia = 0
    pontos_jogador = 0
    mensagem = ''
    pontos = ''
    escolha = request.form['escolha']

    while True:
        IA_escolha = (random.choice(opcoes))
        IA.clear()
        IA.append(IA_escolha)

        if escolha.upper() == IA[0]:
            mensagem = f'A I.A. escolheu {IA[0]}, e você escolheu {escolha}. Empatou'
            pontos = 'Pontuação' f'\nIA: {pontos_ia}' f'\nVocê: {pontos_jogador}'
        elif escolha.upper() == 'TESOURA' and IA[0] == 'PAPEL' or escolha.upper() == 'PAPEL' and IA[0] == 'PEDRA' or escolha.upper() == 'PEDRA' and IA[0] == 'LAGARTO' or escolha.upper() == 'LAGARTO' and IA[0] == 'SPOCK' or escolha.upper() == 'SPOCK' and IA[0] == 'TESOURA' or escolha.upper() == 'TESOURA' and IA[0] == 'LAGARTO' or escolha.upper() == 'LAGARTO' and IA[0] == 'PAPEL' or escolha.upper() == 'PAPEL' and IA[0] == 'SPOCK' or escolha.upper() == 'SPOCK' and IA[0] == 'PEDRA' or escolha.upper() == 'PEDRA' and IA[0] == 'TESOURA':
            mensagem = f'A I.A. escolheu {IA[0]}, e você escolheu {escolha}. Você ganhou!'
            pontos_jogador += 1
            pontos = 'Pontuação' f'\nIA: {pontos_ia}' f'\nVocê: {pontos_jogador}'
        else:
            mensagem = f'A I.A. escolheu {IA[0]}, e você escolheu {escolha}. Você perdeu...'
            pontos_ia += 1
            pontos = 'Pontuação' f'\nIA: {pontos_ia}' f'\nVocê: {pontos_jogador}'
        escolha = None


    return render_template('sala_dojo.html', mensagem=mensagem, pontos=pontos)


@app.route('/')
def index():
    return render_template('index.html')
@app.route('/local1')
def local1():
    return render_template('local1.html')
@app.route('/local2')
def local2():
    return render_template('local2.html')
@app.route('/local3')
def local3():
    return render_template('local3.html')
@app.route('/local4')
def local4():
    return render_template('local4.html')
@app.route('/local5')
def local5():
    return render_template('local5.html')
@app.route('/local6')
def local6():
    return render_template('local6.html')
@app.route('/local7')
def local7():
    return render_template('local7.html')
@app.route('/local_secreto')
def local_secreto():
    return render_template('local_secreto.html',     contador=contador_cliques)
@app.route('/farol_baixo')
def farol_baixo():
    return render_template('farol_baixo.html')
@app.route('/farol_cima')
def farol_cima():
    return render_template('farol_cima.html')
@app.route('/binoculo')
def binoculo():
    return render_template('binoculo.html')

@app.route('/farol_baixoTEXTO')
def farol_baixoTEXTO():
    return render_template('farol_baixoTEXTO.html')

@app.route('/montanhaTEXTO')
def montanhaTEXTO():
    return render_template('montanhaTEXTO.html')

@app.route('/sala_dojo')
def sala_dojo():
    return render_template('sala_dojo.html')
@app.route('/jato')
def jato():
    return render_template('jato.html')
@app.route('/descer')
def descer():
    return render_template('descer.html')
@app.route('/incrementar', methods=['POST'])
def incrementar():
    global contador_cliques
    contador_cliques += 1

    numero_aleatorio = 5  # Exemplo: redirecionar quando o contador atingir 5

    if contador_cliques == numero_aleatorio:
        return redirect(url_for('outra_pagina'))

    return redirect(url_for('local_secreto'))


@app.route('/outra_pagina')
def outra_pagina():
    return render_template('outra_pagina.html')


if __name__ == '__main__':
    app.run(debug=True)