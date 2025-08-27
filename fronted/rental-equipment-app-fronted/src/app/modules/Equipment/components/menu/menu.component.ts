import {Component, OnInit} from '@angular/core';
import {RouterModule} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{
  username: string = '';

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = new JwtHelperService().decodeToken(token);
      console.log('Decoded token:', decodedToken);
      const fullName = decodedToken.fullName || 'Usuario';
      this.username = fullName.split(' ')[0];
    }


    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach(link => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        linkColor.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  toggleMenu() {
    const menu = document.getElementById('navbarSupportedContent');
    if (menu) {
      menu.classList.toggle('show');
    }
  }
}
