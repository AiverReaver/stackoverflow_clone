<?php

namespace App\Http\Controllers;

use App\Http\Resources\Tag as TagResource;
use Illuminate\Http\Request;
use App\Tag;

class TagsController extends Controller
{

    public function getTags(Request $request)
    {
        $tags = Tag::where('name', '')->get();

        if ($request->query('searchQuery') != '') {

            $tags = Tag::where('name', 'like', '%' . $request->get('searchQuery') . '%')->get();
        }

        return TagResource::collection($tags);
    }
}
