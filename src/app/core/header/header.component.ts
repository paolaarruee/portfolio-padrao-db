import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('menuNav', { static: true })
  menuNavRef!: ElementRef;

  public toggleMenu() {
    const menuNav = this.menuNavRef.nativeElement;
    if (menuNav) {
      menuNav.classList.toggle('active');
    }
  }
}
