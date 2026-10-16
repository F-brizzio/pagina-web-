'use strict';
const menuButton=document.querySelector('.menu-toggle');const mobileNav=document.getElementById('mobile-nav');
function closeMenu(){mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menú');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';mobileNav.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileNav.hidden){closeMenu();menuButton.focus();}});
const form=document.getElementById('quote-form');const service=document.getElementById('service');const commune=document.getElementById('commune');
function updatePreview(){document.getElementById('message-preview').textContent='Tu mensaje: '+service.value+(commune.value.trim()?' en '+commune.value.trim():'')+'. Puedes agregar fotos en WhatsApp.';}
form.addEventListener('input',updatePreview);form.addEventListener('change',updatePreview);
document.addEventListener('click',event=>{const link=event.target.closest('[data-service]');if(link){service.value=link.dataset.service;updatePreview();}});
function makeMessage(){const name=document.getElementById('name').value.trim();const details=document.getElementById('details').value.trim();return 'Hola, Roller Star Home.'+(name?' Soy '+name+'.':'')+'\nQuiero cotizar: '+service.value+'.\nMi comuna es: '+commune.value.trim()+'.'+(details?'\nDetalles: '+details:'')+'\nMe gustaría coordinar una visita gratis con medidas y muestras.';}
form.addEventListener('submit',event=>{event.preventDefault();commune.setCustomValidity(commune.value.trim()?'':'Cuéntanos tu comuna para preparar la consulta.');if(!form.reportValidity())return;const url='https://wa.me/56948808564?text='+encodeURIComponent(makeMessage());window.location.assign(url);});
commune.addEventListener('input',()=>commune.setCustomValidity(''));
const mobileQuote=document.querySelector('.mobile-quote');if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{mobileQuote.classList.toggle('is-hidden',entries.some(entry=>entry.isIntersecting));},{threshold:0});observer.observe(document.getElementById('cotizar'));}

// Tarjetas de trabajos: ver detalle y desplegar todos.
const projectsData = [
 {image:'/assets/living-blackout.webp',title:'Roller para living y comedor',alt:'Living con cortinas roller claras'},
 {image:'/assets/dormitorio.webp',title:'Roller blackout para dormitorio',alt:'Dormitorio con cortinas blackout'},
 {image:'/assets/doble.webp',title:'Instalación de sistema doble',alt:'Sistema roller doble'},
 {image:'/assets/living-screen.webp',title:'Roller screen para living',alt:'Living con cortina roller screen'}
];
const projectDialog = document.getElementById('project-dialog');
document.querySelectorAll('.project-view').forEach(button => button.addEventListener('click', () => {
 const project=projectsData[Number(button.dataset.project)]; if(!project) return;
 const photo=document.getElementById('project-dialog-image');photo.src=project.image;photo.alt=project.alt;
 document.getElementById('project-dialog-title').textContent=project.title;
 if (typeof projectDialog.showModal==='function') projectDialog.showModal();
}));
document.querySelector('.project-dialog-close').addEventListener('click',()=>projectDialog.close());
projectDialog.addEventListener('click',event=>{if(event.target===projectDialog)projectDialog.close();});
document.querySelector('.project-dialog-quote').addEventListener('click',()=>projectDialog.close());
const allProjectsButton=document.getElementById('show-all-projects');
allProjectsButton.addEventListener('click',()=>{
 document.querySelectorAll('.project-extra').forEach(card=>card.hidden=false);
 allProjectsButton.setAttribute('aria-expanded','true');
 allProjectsButton.hidden=true;
});

const context=document.modelContext;
if(context?.registerTool){const lifecycle=new AbortController();window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
 const register=tool=>{try{Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}};
 register({name:'prepare_quote_message',title:'Preparar consulta de cotización',description:'Completa el formulario visible y prepara un enlace de WhatsApp. No envía el mensaje ni agenda una visita.',inputSchema:{type:'object',properties:{service:{type:'string',enum:[...service.options].map(o=>o.value)},commune:{type:'string',maxLength:80,minLength:1},name:{type:'string',maxLength:80},details:{type:'string',maxLength:1600}},required:['service','commune'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){const allowed=['service','commune','name','details'];if(!input||typeof input!=='object'||Object.keys(input).some(k=>!allowed.includes(k))||![...service.options].some(o=>o.value===input.service)||typeof input.commune!=='string'||!input.commune.trim()||input.commune.length>80||('name'in input&&(typeof input.name!=='string'||input.name.length>80))||('details'in input&&(typeof input.details!=='string'||input.details.length>1600)))throw new Error('Datos de cotización no válidos');service.value=input.service;commune.value=input.commune;document.getElementById('name').value=input.name||'';document.getElementById('details').value=input.details||'';updatePreview();document.getElementById('cotizar').scrollIntoView({behavior:'instant'});const message=makeMessage();return {status:'prepared',message,whatsapp_url:'https://wa.me/56948808564?text='+encodeURIComponent(message),sent:false};}});
}


// Banner automático: cuatro imágenes cada cinco segundos.
(() => {
  const slides = Array.from(document.querySelectorAll('.hero-slides .hero-image'));
  const dots = Array.from(document.querySelectorAll('.hero-dot'));
  if (slides.length < 2) return;

  let current = Math.max(0, slides.findIndex(el => el.classList.contains('is-active')));
  let timer;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const selected = i === current;
      slide.classList.toggle('is-active', selected);
      slide.setAttribute('aria-hidden', String(!selected));
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
      if (i === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }

  function stop() { window.clearInterval(timer); timer = undefined; }
  function start() {
    stop();
    if (document.hidden) return;
    timer = window.setInterval(() => showSlide(current + 1), 5000);
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => {
    showSlide(i);
    start();
  }));
  document.addEventListener('visibilitychange', start);
  // Incluso con "reducir movimiento" activado, cambiará la foto cada 5 segundos.
  // La preferencia controla solo si el cambio se anima.
  function updateMotion() { document.querySelector('.hero')?.classList.toggle('reduce-motion', reducedMotion.matches); }
  reducedMotion.addEventListener?.('change', updateMotion);
  updateMotion();
  showSlide(current);
  start();
})();

// Transparente sobre el banner y oscura/legible al desplazarse.
(() => {
  const header = document.querySelector('.site-header');
  if (!header) return;
  function updateHeader() { header.classList.toggle('is-scrolled', window.scrollY > 36); }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
})();

// Catálogos interactivos: permite seleccionar cada producto incluso sin fotos.
(() => {
  document.querySelectorAll('.product-block').forEach(block => {
    const buttons = Array.from(block.querySelectorAll('.product-chip'));
    const cards = Array.from(block.querySelectorAll('.product-option'));
    const placeholder = block.querySelector('.product-photo-placeholder');
    const photoText = placeholder?.querySelector('span');
    const summary = block.querySelector('.product-selected-summary');
    const quote = block.querySelector('.product-quote-button');
    if (!buttons.length || buttons.length !== cards.length) return;

    function selectProduct(index) {
      const card = cards[index];
      if (!card) return;
      const name = card.querySelector('h5')?.textContent.trim() || buttons[index].textContent.trim();
      const description = card.querySelector('p')?.textContent.trim() || '';
      buttons.forEach((button, i) => {
        const active = i === index;
        button.classList.toggle('is-selected', active);
        button.setAttribute('aria-pressed', String(active));
      });
      cards.forEach((item, i) => item.classList.toggle('is-selected', i === index));
      if (photoText) photoText.textContent = 'Fotografía pendiente · ' + name;
      if (placeholder) placeholder.setAttribute('aria-label', 'Espacio reservado para la fotografía de ' + name);
      if (summary) summary.textContent = description;
      if (quote) {
        quote.dataset.service = name;
        quote.textContent = 'Cotizar ' + name + ' ↗';
      }
    }
    buttons.forEach((button, index) => button.addEventListener('click', () => selectProduct(index)));
    selectProduct(0);
  });
})();
