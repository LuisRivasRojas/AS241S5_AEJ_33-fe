import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ChatComponent } from './components/chat/chat.component';
import { TranslateComponent } from './components/translate/translate.component';
import { HistoryComponent } from './components/history/history.component';

@NgModule({
  declarations: [App, ChatComponent, TranslateComponent, HistoryComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  bootstrap: [App]
})
export class AppModule {}
