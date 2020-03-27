@echo off

set fn=%1
set flag=%2
cd /d %~dp0

If "%1" == "" (
    echo error: Please type a project name
) else if "%2" == "" (
    echo error: Please type 'r' for create a complete project in Github and locally or 'l' for just locally project
) else ( 
    if "%2" == "r" (
        node remote.js %fn% %flag%
        ) else (
            if "%2"=="l" (
                node local.js %fn%
            )
        )
    )