<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Post as PostResource;
use App\Post;
use App\Tag;

class PostsController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api')->except(['index', 'show']);
    }

    public function index()
    {

        $posts = Post::select('title', 'created_at', 'user_id', 'id');

        if (request()->query('searchQuery') != '') {
            $posts = $posts->where('title', 'like', '%' . request()->query('searchQuery') . '%');
        }

        $posts = $posts->paginate(15);


        return PostResource::collection($posts);
    }

    public function show(Post $post)
    {
        $post = $post->load(['comments', 'answers']);
        return new PostResource($post);
    }

    public function store()
    {
        $post = auth()->user()->posts()->create($this->validateRequest());

        if ($tags = request('tags')) {
            $tags = Tag::whereIn('name', $tags)->get();
            $post->addTagsToPost($tags);
        }

        return new PostResource($post);
    }

    public function update(Request $request, Post $post)
    {
        $post->update($request->toArray());

        $post->save();

        return response('', 200);
    }

    public function delete(Post $post)
    {
        $post->delete();

        return response('', 204);
    }

    protected function validateRequest()
    {
        return request()->validate([
            'title' => 'required',
            'description' => 'required'
        ]);
    }
}
