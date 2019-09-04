<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $guarded = [];


    public function user()
    {
        $this->belongsTo(User::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class)->withTimestamps();
    }

    public function comments()
    {
        $this->morphMany(Comment::class, 'commentable');
    }

    // public function createTags($tags)
    // {
    //     return $this->tags()->createMany($tags);
    // }

    public function addTagsToPost($tags)
    {
        return $this->tags()->attach($tags);
    }
}
