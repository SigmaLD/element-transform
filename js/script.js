/**
 *
 * Element Transform 0.2
 * http://www.sigmald.com
 * @author: Luiz Felipe / Danilo Teixeira
 * best view in Google Chrome
 *
 */

function elementTransform(target){
	
	var itens = document.getElementById(target).children,
			elements = itens.length,
			toggle,
			direction,
			styles = ["rotateToTop","rotateToBack","rotateToFront","scaleToBack","scaleToFront","moveToTop","moveToBottom","moveToRight"],
			styleTarget = window.location.search.substr(1) || "", // Escolha um dos styles acima ou deixe uma string vazia para o modo aleatório
			list = [],
			enable = true,
			index = 0;

	/** 
	 * Aplica ao elemento atual visibilidade e atribui a ele uma class padrão
	 * @param settings atribui invisibilidade ao elemento anterior
	 */
	function setCurrent(settings){
		itens[index].style.display = "block";

		setTimeout(function(){
			list.slice.call(itens).forEach(function(element,i){
				if(element.classList.contains(styles[settings])){
					element.setAttribute("class","");
					element.style.display = "none";
				}
			});

			itens[index].classList.add("defaultShow");

		},900);
	}
	setCurrent();

	/** 
	 * Define qual elemento deve desaparecer
	 * @param settings contém a class com o efeito de fechamento adequado
	 */
	function setPrev(settings){
		if(direction){
			if(index > 0 ){
				itens[index-1].classList.add(styles[settings]);
			}
			else if(index === 0){
				itens[elements-1].classList.add(styles[settings]);
			}
		}
		else{
			if(index < elements-1 ){
				itens[index+1].classList.add(styles[settings]);
			}
			else if(index === elements-1){
				itens[0].classList.add(styles[settings]);
			}	
		}
	}

	/**
	 * Chama as funções que definem quais elementos devem ser configurados e como devem ser as configurações
	 * setStyle escolhe entre aleatório ou padrão o efeito de fechamento do elemento
	 */
	function callback(){
		var typeStyle = Math.round(Math.random()*(styles.length-1)),
						indice = styles.indexOf(styleTarget),
						setStyle = (indice >= 0 && indice <= styles.length)? indice : typeStyle;
						
						setCurrent(setStyle);
						setPrev(setStyle);
	}

	function setIndex(){
		if(elements > 1){
			if(direction){
				index++;
				index = (index > elements-1)? 0 : index;
			}
			else{
				index--;
				index = (index < 0)? elements-1 : index;	
			}
		}
		else{
			return false;
		}
		callback();
	}

	function init(event){
		if(event.keyCode == 39){
			direction = true;
			setIndex();
			clearInterval(toogle);
		}
		else if(event.keyCode == 37){
			direction = false;
			setIndex();
			clearInterval(toogle);
		}
	}

	if(enable && elements > 1){
		toogle = setInterval(function(){
					setIndex();
				},6000);
	}

	document.addEventListener("keyup",init,false);
};