document.addEventListener('DOMContentLoaded',iniciarApp);
function iniciarApp(){
    navegacionFija();
    crearGaleria(); 
    scrollNav();
}
function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll',function(){
        if ( sobreFestival.getBoundingClientRect().top < 0 ) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }
        else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}
function scrollNav(){
    const enlaces =document.querySelectorAll('.navegacion-principal a')
    enlaces.forEach((enlaces)=>{
        enlaces.addEventListener('click',function(e){
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior:"smooth"});
        })
    });
}
function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');
    for (let index = 1; index <= 12 ; index++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${index}.avif" type="image/avif">
            <source srcset="build/img/thumb/${index}.webp" type="image/webp">
            <img loading="lazy" width ="200" height="300" src="build/img/thumb/${index}.jpg" alt="Imagen galeria">
        `;
        imagen.onclick = function(){
            mostrarImagen(`${index}`);
        } 

        galeria.appendChild(imagen);
    }
}
function mostrarImagen (index){
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${index}.avif" type="image/avif">
        <source srcset="build/img/grande/${index}.webp" type="image/webp">
        <img loading="lazy" width ="200" height="300" src="build/img/grande/${index}.jpg" alt="Imagen galeria">
    `;

    //crea el overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick= function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    //boton para cerrar el modal
    const cerrarModal = document.createElement('P')
    cerrarModal.textContent='X';
    cerrarModal.classList.add('btn-cerrar');
    overlay.appendChild(cerrarModal)
    cerrarModal.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    //añadir al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}