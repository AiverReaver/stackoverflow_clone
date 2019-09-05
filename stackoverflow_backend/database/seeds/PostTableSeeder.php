<?php

use Illuminate\Database\Seeder;

class PostTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        factory(App\Post::class, 50)->create()->each(function ($post) {
            $tags = App\Tag::all()->random(rand(2, 5));
            $post->addTagsToPost($tags);
        });
    }
}
