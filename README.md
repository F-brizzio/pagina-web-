# Roller Star Home — proyecto web

Copia del sitio publicado, versión 2, 12 de octubre de 2026.
Incluye la nueva imagen de terraza en la sección de textiles.

## Tecnología
HTML5, CSS3 y JavaScript nativo, sin framework ni dependencias de compilación.
Sitio estático adaptable a móviles. Las imágenes están optimizadas en WebP.
El formulario prepara un mensaje y abre WhatsApp; no guarda solicitudes en una base de datos.
Alojamiento actual: Sites de ChatGPT, infraestructura Cloudflare.
Dominio: https://rollerstar.cl

## Archivos
- dist/index.html: estructura, textos y referencias a imágenes.
- dist/style.css: estilos y diseño adaptable.
- dist/app.js: menú, selector de cortinas y formulario de WhatsApp.
- dist/assets/: imágenes.
- .openai/hosting.json: identificación y configuración del proyecto actual de Sites.

## Verlo en tu computador
Descomprime el ZIP. Con Python 3 instalado, abre una terminal en esta carpeta y ejecuta:

    python -m http.server 8000 --directory dist

Luego abre http://localhost:8000 en tu navegador.
Usa el servidor local: las rutas de imágenes empiezan con /assets/ y no están pensadas para abrir index.html directamente con doble clic.

## Editarlo o trasladarlo
Puedes editar HTML, CSS y JavaScript con cualquier editor de código.
Para un alojamiento estático distinto, publica el contenido de dist como raíz del sitio; no requiere compilación.
Para mantener este mismo sitio en Sites, utiliza su flujo de edición/publicación conservando el identificador del proyecto.
El dominio y sus DNS se administran por separado; el ZIP no transfiere esa configuración.

## Imágenes
terraza-cojines.webp es una ambientación generada a partir de la foto de cojines del taller.
Se identifica en la web como ambientación referencial. cojines.webp conserva la fotografía anterior.

Esta copia no contiene contraseñas, tokens ni el historial privado de Git.
