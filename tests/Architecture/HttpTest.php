<?php

arch('http')
    ->expect('App\Http')
    ->toOnlyBeUsedIn('App\Http');
