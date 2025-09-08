#  SauceDemo E2E & API Test Automation

Proyecto de automatización de pruebas E2E para SauceDemo y pruebas de API para Demoblaze utilizando Playwright con TypeScript y Page Object Model (POM).
Además se utiliza .env para manejo de data sensible y compatibilidad con reportes de Allure.

## Descripción

Este proyecto incluye dos tipos de automatización:

1. **Pruebas E2E** - Automatiza el flujo completo de compra en [SauceDemo](https://www.saucedemo.com/)
2. **Pruebas de API** - Valida endpoints REST de [Demoblaze API](https://api.demoblaze.com/) para registro y autenticación

###  Características principales

-  **Selección dinámica de productos** - Los productos se extraen automáticamente de la página web
-  **Page Object Model (POM)** - Arquitectura modular y mantenible  
-  **Pruebas de API REST** - Validación completa de endpoints con TypeScript
-  **Constantes organizadas** - Enums y constantes centralizadas por funcionalidad
-  **TypeScript** - Tipado fuerte para mayor confiabilidad
-  **Validaciones robustas** - Verificaciones exhaustivas en cada paso
-  **Test Steps detallados** - Estructura BDD con `test.step()` para mejor trazabilidad
-  **Reportes detallados** - Múltiples formatos de reportes disponibles
-  **Allure Reports** - Reportes avanzados con gráficos y métricas

##  Pasos para ejecución desde 0

###  Prerrequisitos

- **Node.js** (versión 18 o superior)
- **Git** (opcional, para clonar el repositorio)
- **VS Code** (recomendado para desarrollo)

###  Instalación

#### 1. Clonar o descargar el proyecto
```bash
# Si tienes Git instalado
git clone <url-del-repositorio> //TODO cambiar
cd reto_pichincha

# O simplemente descarga y extrae el ZIP del proyecto
```

#### 2. Instalar dependencias del proyecto
```bash
# Instalar todas las dependencias
npm install
```

#### 3. Instalar Playwright y navegadores
```bash
# Instalar Playwright CLI globalmente (opcional pero recomendado)
npm install -g @playwright/test

# Instalar los navegadores necesarios
npx playwright install

# Alternativamente, instalar solo navegadores específicos
npx playwright install chromium firefox webkit
```

#### 4. Verificar la instalación
```bash
# Verificar que Playwright está correctamente instalado
npx playwright --version
```

###  Configuración

El proyecto incluye configuración predefinida en `playwright.config.ts` con:
- Múltiples navegadores (Chromium, Firefox, WebKit)
- Configuración de timeouts optimizada
- Reportes en múltiples formatos
- Screenshots y videos en caso de fallos

##  Comandos de Ejecución

### 📦 **Scripts NPM Personalizados**

El proyecto incluye scripts predefinidos en `package.json` para facilitar la ejecución:

```bash
# Ejecutar todas las pruebas (equivale a npx playwright test)
npm run test

# Ejecutar pruebas y generar reporte HTML automáticamente
npm run test:report

# Generar reporte Allure ligero en un solo archivo
npm run allure:reportlite

# Generar reporte Allure completo y abrirlo automáticamente
npm run allure:report
```

**📋 Detalles de los scripts:**

- **`npm run test`** - Ejecuta todas las pruebas usando Playwright
- **`npm run test:report`** - Ejecuta las pruebas, genera reporte HTML y lo abre automáticamente
- **`npm run allure:reportlite`** - Genera un reporte Allure en un solo archivo (ideal para compartir)
- **`npm run allure:report`** - Genera reporte Allure completo en carpeta y lo abre en el navegador

###  Ejecución Básica

```bash
# Ejecutar todas las pruebas (E2E + API)
npx playwright test

# Ejecutar solo pruebas E2E
npx playwright test tests/flujo_reto_tecnico.spec.ts

# Ejecutar solo pruebas de API
npx playwright test tests/reto_tecnico.api.spec.ts --project=api-tests

# Ejecutar pruebas en modo headed (ver navegador)
npx playwright test --headed

# Ejecutar con interfaz gráfica interactiva
npx playwright test --ui
```

###  Navegadores Específicos

```bash
# Ejecutar solo en Chromium
npx playwright test --project=chromium

# Ejecutar solo en Firefox
npx playwright test --project=firefox

# Ejecutar solo en WebKit (Safari)
npx playwright test --project=webkit

# Ejecutar en todos los navegadores
npx playwright test --project=chromium --project=firefox --project=webkit
```

###  Reportes

####  Reporte HTML Nativo de Playwright
```bash
# Ejecutar con reporte HTML detallado
npx playwright test --reporter=html

# Ejecutar con reporte en línea simple
npx playwright test --reporter=line

# Ejecutar con múltiples reportes
npx playwright test --reporter=html,line

# Abrir el último reporte HTML generado
npx playwright show-report
```

####  Reportes Allure (Avanzados)

**Allure** proporciona reportes más avanzados con gráficos, métricas detalladas y mejor visualización de resultados.

```bash
# ============ COMANDOS DIRECTOS ALTERNATIVOS ============
# Ejecutar pruebas y generar datos para Allure
npx playwright test --reporter=allure-playwright

# Generar reporte Allure sin instalar Allure localmente
allure generate --single-file allure-results

# Abrir reporte Allure ya generado
allure open allure-report

# Generar y servir reporte en una sola línea
allure serve allure-results
```

> **💡 Tip:** Se recomienda usar los scripts de npm (`npm run allure:reportlite`) 
> ya que simplifican el proceso.

** Características de Allure Reports:**
-  Gráficos de tendencias y métricas
-  Historial de ejecuciones
-  Detalles granulares de cada test
-  Screenshots automáticos en fallos
-  Videos de ejecución
-  Análisis de duración y performance


## 📁 Estructura del Proyecto

```
📦 reto_pichincha/
├── 📂 src/
│   ├── 📂 data/
│   │   └── 📄 test-data.ts              # Datos de prueba centralizados
│   ├── 📂 interfaces/
│   │   └── 📄 user-data.interface.ts    # Interfaces TypeScript
│   ├── 📂 pages/                        # Page Object Model
│   │   ├── 📄 index.ts                  # Exportaciones centralizadas
│   │   ├── 📄 login.page.ts             # Página de login
│   │   ├── 📄 inventory.page.ts         # Página de inventario
│   │   ├── 📄 cart.page.ts              # Página de carrito
│   │   ├── 📄 checkout-information-step-one.page.ts  # Información checkout
│   │   ├── 📄 checkout-overview-step-two.page.ts     # Resumen checkout
│   │   └── 📄 checkout-complete.page.ts # Confirmación final
│   └── 📂 utils/
│       └── 📂 constants/                #  Constantes organizadas por funcionalidad
│           ├── 📄 api-urls.constants.ts      # URLs de API endpoints
│           ├── 📄 api-messages.constants.ts  # Mensajes, status codes y validaciones
│           ├── 📄 api-users.constants.ts     # Usuarios y credenciales para API
│           ├── 📄 index.ts              # Exportaciones de constantes
│           └── 📄 messages.constants.ts # Constantes de mensajes E2E
├── 📂 tests/
│   ├── 📂 helpers/
│   │   └── 📄 sauce-demo-fixture.ts     # Fixtures personalizadas
│   ├── 📄 flujo_reto_tecnico.spec.ts    #  Test principal E2E (SauceDemo)
│   └── 📄 reto_tecnico.api.spec.ts      #  Tests de API REST (Demoblaze)
├── 📂 test-results/                     # Resultados de pruebas
├── 📂 playwright-report/                # Reportes HTML nativos
├── 📂 allure-results/                   # Datos para Allure
├── 📂 allure-report/                    # Reportes Allure generados
├── 📄 playwright.config.ts              # Configuración Playwright
├── 📄 package.json                      # Dependencias del proyecto
└── 📄 README.md                         # Este archivo
```

##  Escenarios de Prueba

###  Historia de Usuario E2E (SauceDemo)
```gherkin
Feature: Flujo de compra en SauceDemo
  Como usuario de SauceDemo
  Quiero realizar un proceso de compra
  Para validar que el flujo E2E funciona correctamente

Scenario: Completar compra con 2 productos aleatorios
  Given el usuario se encuentra autenticado con credenciales válidas
  When agrega 2 productos aleatorios al carrito de compra
  Then el contador del carrito debería reflejar la cantidad de productos agregados
  When completa el formulario de compra con datos aleatorios y finaliza la compra
  Then debería visualizar el mensaje de confirmación "THANK YOU FOR YOUR ORDER"
```

###  🔗 Historia de Usuario API (Demoblaze)
```gherkin
Feature: Validación de API REST para Demoblaze
  Como QA Automatizador de pruebas
  Quiero validar las funcionalidades de la API de Demoblaze
  Para asegurar que los endpoints de registro y autenticación funcionan correctamente

Scenario: Registro exitoso de nuevo usuario
  When envío una petición POST al endpoint de registro con credenciales nuevas y válidas
  Then debería recibir un status 200 y un cuerpo de respuesta vacío

Scenario: Validación de usuario existente
  When intento registrar un usuario ya registrado
  Then debería recibir un mensaje de error notificando que el usuario ya existe

Scenario: Autenticación con credenciales válidas
  When envío una petición POST al endpoint de login con credenciales válidas
  Then debería recibir un token de autenticación válido

Scenario: Autenticación con credenciales inválidas
  When envío una petición POST al endpoint de login con credenciales inválidas
  Then debería recibir un mensaje de error
```

###  📋 Pasos del Test E2E

1. ** Autenticación** - Login con credenciales válidas
2. ** Selección de productos** - Agregar 2 productos aleatorios
3. ** Validación de carrito** - Verificar productos agregados
4. ** Checkout información** - Completar datos personales
5. ** Revisión de pedido** - Validar resumen y totales
6. ** Confirmación** - Finalizar compra y validar mensaje

###  🔗 Endpoints de API Validados

| Endpoint | Método | Descripción | Validaciones |
|----------|--------|-------------|--------------|
| `/signup` | POST | Registro de usuario | Status 200, cuerpo vacío, sin errorMessage |
| `/signup` | POST | Usuario existente | Status 200, errorMessage presente |
| `/login` | POST | Login válido | Status 200, token válido, sin errorMessage |
| `/login` | POST | Login inválido | Status 200, errorMessage presente |

##  🆕 Mejoras Implementadas en API

### **Estructura BDD con test.step()**

Cada test utiliza `test.step()` para mejor trazabilidad y reportes:

```typescript
test('Validar el registro exitoso de un nuevo usuario', async ({ request }) => {
  await test.step('When envío una petición POST al endpoint de registro', async () => {
    // Lógica de la petición
  });

  await test.step('Then debería recibir un status 200 y cuerpo vacío', async () => {
    // Validaciones
  });
});
```

##  Configuración Avanzada

###  Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

> **⚠️ IMPORTANTE - Seguridad del archivo .env:**
> 
> Por efectos prácticos y didácticos, el archivo `.env` se incluye en este repositorio. 
> Sin embargo, **en un caso realista y en proyectos de producción**, este archivo **NO se debe subir** 
> al repositorio y debe estar incluido en el archivo `.gitignore` para proteger información sensible 
> como credenciales, URLs de entornos privados, tokens de API, etc.
> 
> ```bash
> # Ejemplo de .gitignore para proyectos reales
> .env
> .env.production
> ```

##  Recursos Adicionales

- [ Documentación oficial de Playwright](https://playwright.dev/)
- [ Guía de Page Object Model](https://playwright.dev/docs/pom)
- [ Configuración avanzada](https://playwright.dev/docs/test-configuration)
- [ Mejores prácticas](https://playwright.dev/docs/best-practices)