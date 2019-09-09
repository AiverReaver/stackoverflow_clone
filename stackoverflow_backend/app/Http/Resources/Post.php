<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Post extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->when($this->description != '', $this->description),
            'created_at' => $this->created_at,
            'updated_at' => $this->when($this->updated_at != '', $this->updated_at),
            'tags' => Tag::collection($this->tags),
            'comments' => Comment::collection($this->whenLoaded('comments')),
            'answers' => Answer::collection($this->whenLoaded('answers')),
            'owner' => new User($this->user),
            'answers_count' => $this->answers->count()
        ];
    }
}
