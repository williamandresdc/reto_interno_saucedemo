### Documentación oficial
    https://playwright.dev/docs/intro

### curso udemy
    [playwright-from-zero-to-hero](https://www.udemy.com/course/playwright-from-zero-to-hero)

### Comando para ejecutar todos los test
    npx playwright test

### Comando para visualizar reporte generado post ejecución
    npx playwright show-report

### Comando para abrir modo UI: recomendado para depuración
    npx playwright test --ui

### Comando para abrir el debug de un test por consola
    npx playwright test onboardingrp.spec.ts:27 --debug --project=firefox
    #27 es la linea de codigo del test que quiero ejecutar

### para ejecutar en modo sin modo headless
    npx playwright test --headed

### para ejecutar un test en particular por el nombre 
<!-- -g <grep> or --grep <grep> -->
    npx playwright test -g "nombre-test"

### Ejecutar test que tengan @tags
<!-- -g <grep> or --grep <grep> -->
    npx playwright test --grep=@nameTag

    Si se desea anidar 2 o más tags:
    OR--> npx playwright test --grep="@tag1|tag2"
    AND--> npx playwright test --grep="(?=.*@fast)(?=.*@slow)"

### comando para abrir codegen con un navegador en especifico
    npx playwright codegen --browser=firefox

### Comando para repetir el test n veces
    npx playwright test --repeat-each 4

### Obtener la versión de playwright del proyecto
    npx playwright --version

### ejecutar test con otro archivo de configuración de playwright
    npx playwright test --config=playwright-pdn.config.ts

## Allure report
    comando para levantar server: 
        allure serve allure-results
    comando para generar reporte: 
        allure generate allure-results -o allure-report --clean
    Generar reporte allure sin instalar allure localmente
        allure generate --single-file allure-results 
    comando para abrir reporte ya generado: 
        allure open allure-report
    


# PENDIENTES:
 [] realizar prueba con la libreria https://zerostep.com/