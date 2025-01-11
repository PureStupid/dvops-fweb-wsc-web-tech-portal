<?php

use App\Http\Controllers\Controller;

arch('controllers')
    ->expect('App\Http\Controllers')
    ->toBeClasses()
    ->classes()
    ->toExtend(Controller::class);
