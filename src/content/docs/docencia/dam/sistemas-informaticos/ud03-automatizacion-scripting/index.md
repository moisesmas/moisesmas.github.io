---
title: "Unitat 3 · Automatització de tasques i shell scripting"
description: "Com automatitzar tasques d'administració amb scripts de Bash i PowerShell i programar-les perquè s'executen soles, més la gestió bàsica de la informació del sistema i de les còpies de seguretat."
---

Esta unitat t'ensenya a fer que l'ordinador faça la feina repetitiva per tu: escriuràs scripts en **Bash** i en **PowerShell**, els programaràs perquè s'executen soles i aprendràs a localitzar, copiar i restaurar informació del sistema. És l'eina que més diferencia un administrador que apaga focs d'un que els evita.

## Què vas a aprendre

- Escriure i executar scripts en Bash i en PowerShell: shebang, permisos d'execució i política d'execució.
- Treballar amb variables, cometes, operadors i codis d'eixida, i entendre què fa el shell amb una línia abans d'executar-la.
- Controlar el flux d'un script: condicionals, bucles, paràmetres i entrada de dades de l'usuari.
- Manipular fitxers i text amb ordres i canonades (`grep`, `cut`, `sort`, `sed`… i els seus equivalents en PowerShell).
- Escriure scripts d'administració reals: còpia de seguretat amb data, alta massiva d'usuaris i monitoratge del disc.
- Planificar i automatitzar tasques amb cron (Linux) i el Programador de tasques (Windows).
- Reconéixer l'estructura de directoris de Linux i de Windows i localitzar informació amb eines gràfiques i amb ordres.
- Restaurar còpies de seguretat i usar utilitats de gestió de la informació: compressors, `du`/`df`, `rsync` i `robocopy`.

## La unitat d'un colp d'ull

| Trimestre | Hores | Pes en l'avaluació | RA que treballa |
|---|---|---|---|
| 1r | 20 h | 12 % | RA3: gestiona la informació del sistema identificant les estructures d'emmagatzematge i aplicant mesures per a assegurar la integritat de les dades (criteris a-g) |

Els criteris RA3.a (comparar sistemes d'arxius) i RA3.d (particions i unitats lògiques) es treballen sobretot en la unitat 2; ací es treballen els criteris b, c, e, f i g.

## Mapa de la unitat

1. [Introducció al scripting](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/01-introduccio-al-scripting/): què és un script, shebang, permisos, política d'execució, variables, cometes, operadors i codis d'eixida.
2. [Estructures de control i ordres de text](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/02-estructures-de-control-i-text/): condicionals, bucles, paràmetres, `read`/`Read-Host`, redireccions i les ordres de text.
3. [Scripts pràctics i tasques programades](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/03-scripts-practics-i-tasques-programades/): còpia amb data, alta massiva, monitoratge del disc, cron i Programador de tasques (la preparació de la presencial).
4. [Informació del sistema, còpies i utilitats](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/04-informacio-del-sistema-i-copies/): estructura de directoris, cerques, restaurar còpies, compressors, `df`/`du`, `rsync` i `robocopy`.
5. [Activitats](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/actividades/): set activitats, sis d'estudi autònom i la pràctica de la sessió presencial.
6. [Planificació](/docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting/planificacion/): el calendari de les tres sessions, què fer en cada una i com estudiar la unitat.

## Laboratoris

Un laboratori interactiu per a practicar: el «Traçador d'scripts», on veuràs com s'executa un script pas a pas, com canvien les variables i els codis d'eixida, i podràs practicar la sintaxi de Bash i de PowerShell.

::artefacto{src="tracador-de-scripts"}
