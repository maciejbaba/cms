<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Article;
use Illuminate\Support\Facades\Auth;

class CheckArticleOwner
{
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next): Response
  {
    $article = Article::find($request->route('record'));

    if (!$article || $article->user_id !== Auth::id()) {
      abort(403, 'Unauthorized action.');
    }

    return $next($request);
  }
}
