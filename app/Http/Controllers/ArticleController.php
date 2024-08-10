<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{

  public function getOne(Request $request)
  {
    $article = Article::find($request->route('record'));
    if (!$article) {
      abort(404);
    }
    return $article;
  }

  public function getAll()
  {
    $articles = Article::all();
    if (!$articles) {
      abort(404);
    }
    return $articles;
  }
  public function create(Request $request)
  {
    $article = new Article();
    $article->title = $request->title;
    $article->body = $request->body;
    $article->user_id = Auth::id(); // get id of current user
    $article->save();
    return $article;
  }

  public function update(Request $request)
  {
    echo "update";
    $article = Article::find($request->route('record'));
    if (!$article) {
      abort(404);
    }
    $article->title = $request->title;
    $article->body = $request->body;
    $article->save();
    return $article;
  }

  public function destroy(Request $request)
  {
    $article = Article::find($request->route('record'));
    if (!$article) {
      abort(404);
    }
    $article->delete();
    return $article;
  }
}
