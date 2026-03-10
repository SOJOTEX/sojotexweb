# SOJOTEX Landing Page

Esta carpeta contiene la versión moderna del landing page de SOJOTEX S.A.C. preparada para desplegar en Vercel y alojarse desde un repositorio GitHub.

## Flujo de desarrollo

```bash
npm install        # instala Vite y dependencias
npm run dev        # arranca un servidor local (http://localhost:5173)
npm run build      # genera la carpeta `dist` lista para desplegar
npm run preview    # prueba la build final
```

## Publicación

1. Inicializa el repositorio Git si no lo está:
   ```bash
   git init
   git add .
   git commit -m "Inicializar landing SOJOTEX"
   ```
2. Crea un repositorio remoto en GitHub y agrégalo como `origin`.
3. Empuja los cambios: `git push -u origin main`.
4. Conecta el repositorio a Vercel (https://vercel.com/) y usa el comando de build `npm run build`. Vercel detecta Vite automáticamente pero puedes especificar `build` y el directorio `dist`.
5. Después de cada cambio, empuja y Vercel redeployará usando el `build` script.

## Notas adicionales

- La hoja de estilos y la lógica interactiva viven en `src/styles.css` y `src/main.js`.
- El formulario progresivo solo muestra un estado de éxito estático; conecta un backend si quieres enviar datos reales.
