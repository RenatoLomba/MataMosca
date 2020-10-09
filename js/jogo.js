var altura //altura do jogo
var largura //largura do jogo
var vidas = 1 //numero de vidas
var tempo = 10 //tempo do jogo
var spawnMosca = 1500 //tempo de spawn da mosca
var dificuldade = window.location.search.replace('?', '') //dificuldade selecionada

//guarda o tamanho atual da tela
function ajustarTamanhoTela() {
	largura = window.innerWidth
	altura = window.innerHeight
}
ajustarTamanhoTela()

//guarda o tempo restante de jogo
function tempoRestante(tempo) {
	
	var cronometro = setInterval(function(){

		tempo--

		//se o tempo acabar, o jogador vence e o jogo acaba
		if (tempo < 0) {

			clearInterval(cronometro)
			clearInterval(intervalo)
			window.location.href="victory.html"

		} else {
			document.getElementById('id_cronometro').innerHTML = tempo
		}

	}, 1000)
}
tempoRestante(tempo)

//define uma posição aleatoria para a mosca na tela
function posicaoAleatoria() {

	//remover o mosquito anterior (caso exista)
	removerMoscaAnterior()

	//posicao aleatoria da mosca
	var posicaoX = Math.floor(Math.random() * largura) - 90
	var posicaoY = Math.floor(Math.random() * altura) - 90

	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	//criar elemento html
	var mosca = document.createElement('img')
	mosca.src = 'img/mosca.png'
	mosca.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
	mosca.style.left = posicaoX + 'px'
	mosca.style.top = posicaoY + 'px'
	mosca.style.position = 'absolute'
	mosca.id = 'id_mosca'

	//quando clicado será removido
	removerMosca(mosca)

	document.body.appendChild(mosca)
}

//remove a mosca ja criada após 2 segundos e perde pontos de vida
function removerMoscaAnterior() {
	if (document.getElementById('id_mosca')) {
		document.getElementById('id_mosca').remove()

		//se os pontos de vida acabarem, o jogo acaba e o jogador perde
		if (vidas > 3) {

			window.location.href="game_over.html"

		} else {
			document.getElementById('vida' + vidas).src = 'img/coracao_vazio.png'
			vidas++
		}
		
	}
}

//remove a mosca quando clicada sem perder pontos de vida
function removerMosca(mosca) {
	mosca.onmouseover = function() {
		this.src = 'img/mosca_morta.png' 
	}

	mosca.onmouseout = function() {
		this.src = 'img/mosca.png'
	}

	mosca.onmouseup = function() {
		this.remove()
	}
}

//define um tamanho aleatorios para a mosca
function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3)
	
	switch(classe) {
		case 0:
			return 'mosca1'

		case 1:
			return 'mosca2'

		case 2:
			return 'mosca3'
	}
}

//define um lado X aleatorio para a mosca
function ladoAleatorio() {
	var lado = Math.round(Math.random())

	switch(lado) {

		case 0:
			return 'ladoA'

		case 1:
			return 'ladoB'

	}
}

//com base na dificuldade selecionada define um tempo restante e tempo de spawn diferente
function selecionaDificuldade() {

	if (dificuldade === 'normal') {
		spawnMosca = 1500
		tempo = 15
	} else if (dificuldade === 'dificil') {
		spawnMosca = 1000
		tempo = 20
	} else if (dificuldade === 'chucknorris') {
		spawnMosca = 750
		tempo = 25
	}

}
selecionaDificuldade()