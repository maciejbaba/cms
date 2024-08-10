<?php

namespace App\Filament\Resources\ArticleResource\Pages;

use App\Filament\Resources\ArticleResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Access\Response;
use Filament\Notifications\Actions\Action;
use Filament\Notifications\Notification;


class EditArticle extends EditRecord
{
  protected static string $resource = ArticleResource::class;

  protected function beforeSave(): void
  {

    $article_user_id = $this->record->user_id;
    $curr_user_id = Auth::id();

    if ($article_user_id != $curr_user_id) {
      Notification::make()
        ->warning()
        ->title('You are not the owner of this article.')
        ->body('You must be the owner of the article to edit it.')
        ->persistent()
        ->actions([])
        ->send();
      $this->halt();
      return;
    }
  }

  protected function getHeaderActions(): array
  {
    return [
      Actions\DeleteAction::make(),
    ];
  }
}
