import {Injectable, Renderer2, RendererFactory2} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private readonly attr = 'data-theme';
  private readonly storageKey = 'app-theme';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    const saved = localStorage.getItem(this.storageKey);
    if(saved){
      this.setTheme(saved);
    }
  }
  setTheme(theme:string ): void{
    const html = document.documentElement;
    this.renderer.setAttribute(html, this.attr, theme);
    localStorage.setItem(this.storageKey, theme);
  }
  getTheme(): string{
    return document.documentElement.getAttribute(this.attr) ?? 'light';
  }

  toggle(themeA: string, themeB: string): void {
    const current = this.getTheme();
    this.setTheme(current === themeA ? themeB : themeA);
  }
}
