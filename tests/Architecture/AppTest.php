<?php

arch('app')
    ->expect('App')
    ->not->toUse(['die', 'dd', 'ddd', 'dump', 'ray', 'sleep']);

arch()->preset()->php();
arch()->preset()->security()->ignoring('md5');
