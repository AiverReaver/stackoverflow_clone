<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Answer;

class AnswersController extends Controller
{
    public function store()
    { }

    protected function validateRequest()
    {
        return request()->validate([
            'body' => 'required'
        ]);
    }
}
