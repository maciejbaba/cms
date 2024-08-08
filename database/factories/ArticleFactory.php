<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Provider\Book;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */


  public function definition(): array

  {
    $MAX_BODY_LENGTH = 50; // just for displaying purposes
    $TITLE_WORDS = 3;

    return [
      'title' => implode(' ', fake()->words($TITLE_WORDS)), // words gives array, we need to cast that into string otherwise error due to trying to store array
      'body' => fake()->text($MAX_BODY_LENGTH),
    ];
  }
}
