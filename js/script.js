
// SELECIONAMOS O ELEMENTO
var video = document.querySelector('video')

// AQUI TEMOS ACESSO A WEBCAM DO NAVEGADOR  // ISSO RETORNA UMA PROMISE 
// POR ISSO PRECISAMOS USAR O then() PARA QUANDO DER CERTO E O catch() EM CASOS DE ERRO.
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
        video.play();
    })
    .catch(error => {
        console.log(error)
    })


var link = null; // VARIÁVEL GLOBAL PARA ARMAZENR LINK

// SELECIONANDO UM BOTÃO E ADICIONANDO EVENTO DE CLICK
document.querySelector('button').addEventListener('click', (e) => {
    if (link) {
        document.body.removeChild(link); // REMOVE O LINK EXISTENTE
    }

    // SELECIONANDO O ELEMENTO CANVAS E ATRIBUINDO A UMA VÁRIAVEL
    var canvas = document.querySelector('canvas');

    // DEFININDO A ALTURA
    canvas.height = video.videoHeight;

    // DEFININDO A LARGURA
    canvas.width = video.videoWidth;

    // AQUI INICIALIZAMOS A TAG CANVAS E DEFINIMOS UMA APLICAÇÃO 2D
    var context = canvas.getContext('2d');

    // AQUI DEFINIMOS QUE A JANELA DA CAMERA COMEÇA DO CANTO SUPERIOR ESQUERDO
    context.drawImage(video, 0, 0);

    // AQUI CRIAMOS E TAG <a> QUE É UM LINK
    link = document.createElement('a');

    // SEMPRE QUE CLICARMOS NO LINK, FAREMOS O DOWNLOAD E O NOME DA FOTO SERÁ  ('foto.png')
    link.download = 'foto.png';

    // ESTAMOS PEGANDO OS PIXELS DA MINHA IMAGEM E PASSANDO PARA O MEU ATRIBUTO href
    link.href = canvas.toDataURL();

    // CRIAMOS A TAG <i>
    var icon = document.createElement('i');

    icon.classList.add('fas', 'fa-upload'); // ADICIONA CLASSES PARA ÍCONE (NESTE EXEMPLO, ESTAMOS USANDO O ÍCONE DE UPLOAD)

    // ADICIONAMOS O ICON DENTRO DO LINK
    link.appendChild(icon);

    link.appendChild(document.createTextNode("Baixar Imagem"));

    // ADICIONANDO O LINK DENTRO DA TAG BODY
    document.body.appendChild(link);
});



