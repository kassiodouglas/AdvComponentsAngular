import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private readonly API = 'http://127.0.0.1:8000/api/products';
  private readonly token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2F1dGgiLCJpYXQiOjE3MDQ4MDMzNjksImV4cCI6MTcwNTAxOTM2OSwibmJmIjoxNzA0ODAzMzY5LCJqdGkiOiJZUmJrTjB3cFVBUnlNbEc4Iiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.i1Ca2U_MgIheosqT-AYAzG2E5BG3QYhgGrcKO_6eX0k';

  constructor(private http: HttpClient) {}

  /** Links da sidebar */
  sidebarlinks() {
    let links = [
      {
        path: '/',
        label: 'Home',
        icon: '<i class="fa-solid fa-house"></i>',
        permissions: ['home'],
        tags: ['home', 'inicio'],
      },

      {
        id: 'components',
        label: 'Componentes',
        icon: '<i class="fa-solid fa-boxes-packing"></i>',
        permissions: ['home'],
        links: [
          {
            id: 'side',
            label: 'Sidebar',
            icon: '<i class="fa-solid fa-bars"></i>',
            links: [{ path: '/como_usar', label: 'Como usar?' }],
          },

          {
            path: '/table',
            label: 'Table',
            icon: '<i class="fa-solid fa-table"></i>',
            tags: ['table', 'tableadv'],
          },

          {
            path: '/step',
            label: 'Step',
            icon: '<i class="fa-solid fa-table"></i>',
            tags: ['step', 'stepperadv','stepper'],
          },
        ],
      },

      { divider: 'Links ramdômicos' },
    ];

    links = (this.generateRandomSidebar(links));

    return links


  }

  /** Cabeçalho de requisição */
  options() {
    return {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('accept', 'application/json')
        .set('Authorization', `Bearer ${this.token}`),
    };
  }

  /** Rota que retorna os dados para a tableadv */
  getProducts(e: any): Observable<Array<any>> {
    return this.http.post<Array<any>>(this.API, e, this.options());
  }

  generateRandomString(length: any) {
    const characters =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  generateRandomIcon() {
    let icons: Array<string> = [
      '<i class="fa-solid fa-house"></i>',
      '<i class="fa-solid fa-users"></i>',
      '<i class="fa-solid fa-user-secret"></i>',
      '<i class="fa-solid fa-boxes-stacked"></i>',
      '<i class="fa-solid fa-people-carry-box"></i>',
      '<i class="fa-solid fa-square-check"></i>',
      '<i class="fa-solid fa-arrows-rotate"></i>',
      '<i class="fa-brands fa-tiktok"></i>',
      '<i class="fa-brands fa-github"></i>',
      '<i class="fa-regular fa-envelope"></i>',
      '<i class="fa-solid fa-car"></i>',
      '<i class="fa-solid fa-pen"></i>',
      '<i class="fa-brands fa-windows"></i>',
      '<i class="fa-solid fa-barcode"></i>',
      '<i class="fa-solid fa-fire"></i>',
      '<i class="fa-brands fa-squarespace"></i>',
      '<i class="fa-brands fa-react"></i>',
      '<i class="fa-solid fa-mask"></i>',
      '<i class="fa-solid fa-comments-dollar"></i>',
    ];
    const randomIndex = Math.floor(Math.random() * icons.length);
    const randomValue = icons[randomIndex];

    return randomValue;
  }

  generateRandomWordLink(sub: string = '') {
    const randomWord = [
      'Home',
      'Perfil',
      'Configurações',
      'Notificações',
      'Dashboard',
      'Categorias',
      'Favoritos',
      'Histórico',
      'Ajuda',
      'Sair',
      'Navegação',
      'Cotações',
      'Menu',
      'Admistrativo',
    ];

    const randomIndex = Math.floor(Math.random() * randomWord.length);
    const randomValue = randomWord[randomIndex] + ' ' + sub;

    return randomValue;
  }

  generateRandomSidebarLink() {
    const label = this.generateRandomWordLink();
    const icon = this.generateRandomIcon();
    const path = '/';
    return { label, icon, path };
  }

  generateRandomSidebarSubLink(): any {
    const id = this.generateRandomString(5);
    const label = this.generateRandomWordLink();
    const icon = this.generateRandomIcon();
    const links = [];

    const numLinks = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < numLinks; i++) {
      if (Math.random() < 0.5) links.push(this.generateRandomSidebarLink());
      else links.push(this.generateRandomSidebarSubLink());
    }

    return { id, label, icon, links };
  }

  generateRandomSidebar(links_external:any) {
    let links: any = links_external;

    for (let i = 0; i < 5; i++) {
      if (Math.random() < 0.5) links.push(this.generateRandomSidebarLink());
      else links.push(this.generateRandomSidebarSubLink());
    }

    return links;
  }
}
