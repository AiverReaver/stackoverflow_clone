<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Comment as CommentResource;
use App\Comment;
use App\Post;
use App\Answer;

class CommentsController extends Controller
{
    public function storePostComment(Post $post)
    {
        $comment = new Comment($this->validateRequest());

        $comment->user_id = auth()->id();

        $comment = $post->comments()->save($comment);
        return new CommentResource($comment);
    }

    public function storeAnswerComment(Answer $answer)
    {
        $comment = new Comment($this->validateRequest());

        $comment->user_id = auth()->id();

        $answer->comments()->save($comment);
        return new CommentResource($comment);
    }

    protected function validateRequest()
    {
        return request()->validate([
            'body' => 'required'
        ]);
    }
}
