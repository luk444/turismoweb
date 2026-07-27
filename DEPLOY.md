# Guía de Deployment y Configuración

## 1. Configuración de Firebase

### Paso 1: Crear proyecto en Firebase
1. Ir a [Firebase Console](https://console.firebase.google.com/)
2. Click en "Agregar proyecto"
3. Nombrar el proyecto (ej: "mendoza-experience")
4. Deshabilitar Google Analytics (opcional)
5. Click en "Crear proyecto"

### Paso 2: Configurar Authentication
1. En Firebase Console, ir a **Build → Authentication**
2. Click en "Comenzar"
3. En la pestaña "Sign-in method", habilitar:
   - **Correo electrónico/Contraseña** ✓
   - **Google** ✓ (opcional)
   - **GitHub** ✓ (opcional)
4. Guardar cambios

### Paso 3: Configurar Firestore Database
1. Ir a **Build → Firestore Database**
2. Click en "Crear base de datos"
3. Seleccionar **Comenzar en modo de prueba** (por ahora)
4. Elegir ubicación: **southamerica-east1** (Buenos Aires)
5. Click en "Activar"

### Paso 4: Obtener credenciales de Firebase
1. Ir a **Project Settings** (ícono de engranaje)
2. En la sección "Your apps", click en **</> (Web)**
3. Registrar app con nombre: "mendoza-web"
4. **Copiar el objeto `firebaseConfig`** que aparece

### Paso 5: Configurar variables de entorno
1. Crear archivo `.env` en la raíz del proyecto (usar `.env.example` como referencia)
2. Pegar las credenciales de Firebase:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-ABC123XYZ
```

3. **IMPORTANTE**: El archivo `.env` está en `.gitignore` y NO se sube a GitHub

---

## 2. Deployment en Netlify

### Opción A: Deploy desde Git (Recomendado)

1. **Subir código a GitHub/GitLab**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Conectar con Netlify**
   - Ir a [Netlify](https://app.netlify.com/)
   - Click en "New site from Git"
   - Conectar repositorio de GitHub/GitLab
   - Seleccionar el repositorio

3. **Configurar build settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Netlify detectará automáticamente el archivo `netlify.toml`

4. **Configurar variables de entorno en Netlify**
   - Ir a **Site settings → Environment variables**
   - Agregar todas las variables del archivo `.env`:
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN`
     - `VITE_FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_STORAGE_BUCKET`
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`
     - `VITE_FIREBASE_APP_ID`
     - `VITE_FIREBASE_MEASUREMENT_ID`
     - `VITE_MP_PUBLIC_KEY` (si usás MercadoPago)

5. **Deploy**
   - Click en "Deploy site"
   - Esperar a que termine el build
   - Netlify te dará una URL como: `https://tu-proyecto.netlify.app`

### Opción B: Deploy manual (para pruebas)

1. **Instalar Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login en Netlify**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

---

## 3. Configuración de Firebase Functions (Backend)

### Paso 1: Instalar Firebase CLI
```bash
npm install -g firebase-tools
```

### Paso 2: Login e inicializar
```bash
firebase login
firebase init functions
```

### Paso 3: Configurar MercadoPago (Backend)
1. Ir a [MercadoPago Developers](https://www.mercadopago.com.ar/developers)
2. Crear aplicación
3. Obtener **ACCESS TOKEN** (producción) y **PUBLIC KEY**
4. En Firebase Console → Functions → Runtime settings → Variables de entorno:
   - `MP_ACCESS_TOKEN`: Tu access token de MercadoPago (PRODUCCIÓN)
   - `MP_PUBLIC_KEY`: Tu public key (opcional, ya está en el frontend)

### Paso 4: Deploy de Functions
```bash
cd functions
npm install
firebase deploy --only functions
```

---

## 4. Configuración de Dominio Personalizado (Opcional)

1. En Netlify: **Site settings → Domain management → Add custom domain**
2. Ingresar tu dominio (ej: `mendozaexperience.com.ar`)
3. Netlify te dará nameservers o un registro DNS para configurar
4. Configurar en tu proveedor de dominio:
   - **Nameservers** (recomendado):
     ```
     dns1.p01.nsone.net
     dns2.p01.nsone.net
     dns3.p01.nsone.net
     dns4.p01.nsone.net
     ```
   - O **Registro A**:
     ```
     Tipo: A
     Nombre: @
     Valor: 75.2.60.5
     ```

5. Esperar propagación DNS (24-48hs)

---

## 5. Verificación Post-Deploy

### Checklist de verificación:
- [ ] Página carga correctamente
- [ ] Hero se ve completo en pantalla (no cortado)
- [ ] Formulario de búsqueda funciona
- [ ] Login/Registro funcionan
- [ ] Tours se muestran correctamente
- [ ] Botón de WhatsApp funciona
- [ ] Sitio es responsive en mobile

### Probar en:
- Desktop (Chrome, Firefox, Safari)
- Mobile (iOS Safari, Android Chrome)
- Diferentes tamaños de pantalla

---

## 6. Solución de Problemas Comunes

### Error: "Firebase not initialized"
- Verificar que las variables de entorno estén configuradas en Netlify
- Verificar que el archivo `.env` exista en desarrollo local

### Error: "Module not found"
- Ejecutar `npm install` antes de deploy
- Verificar que todas las dependencias estén en `package.json`

### Build falla en Netlify
- Verificar versión de Node.js en Netlify (debe ser >= 18)
- Revisar logs de build en Netlify
- Verificar que `npm run build` funcione localmente

### Formulario de búsqueda no funciona
- Verificar que el botón tenga `onClick={handleSearch}`
- Verificar consola del navegador para errores

---

## 7. Estructura de Archivos Importantes

```
mendoza-experience/
├── .env                    # Variables de entorno (NO se sube a git)
├── .env.example           # Ejemplo de variables
├── .gitignore             # Archivos ignorados por git
├── netlify.toml           # Configuración de Netlify
├── package.json           # Dependencias del proyecto
├── src/
│   ├── firebase/
│   │   └── config.ts      # Configuración de Firebase
│   ├── components/
│   │   └── home/
│   │       ├── Hero.tsx   # Hero principal
│   │       └── TourSearch.tsx  # Formulario de búsqueda
│   └── pages/
│       └── HomePage.tsx   # Página principal
├── functions/             # Firebase Functions (backend)
│   ├── src/
│   │   └── index.ts       # Cloud Functions
│   └── package.json
└── DEPLOY.md             # Esta guía
```

---

## 8. Contacto y Soporte

- **Firebase Console**: https://console.firebase.google.com
- **Netlify Dashboard**: https://app.netlify.com
- **MercadoPago Developers**: https://www.mercadopago.com.ar/developers

---

## Resumen de Pasos Rápidos

1. ✅ Crear proyecto Firebase
2. ✅ Configurar Authentication y Firestore
3. ✅ Crear archivo `.env` con credenciales
4. ✅ Subir código a GitHub
5. ✅ Conectar repositorio en Netlify
6. ✅ Configurar variables de entorno en Netlify
7. ✅ Deploy automático
8. ✅ Verificar funcionamiento

¡Listo! Tu sitio estará online en minutos. 🚀