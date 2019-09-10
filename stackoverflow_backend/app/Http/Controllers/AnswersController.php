<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\Answer;
use App\Http\Resources\Answer as AnswerResource;

class AnswersController extends Controller
{
    public function store(Post $post)
    {
        $answer = new Answer($this->validateRequest());

        $answer->user_id = auth()->id();

        $answer = $post->answers()->save($answer);

        return new AnswerResource($answer);
    }

    protected function validateRequest()
    {
        return request()->validate([
            'body' => 'required'
        ]);
    }
}
