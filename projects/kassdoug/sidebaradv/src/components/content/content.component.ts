import {
  Component,
  OnInit,
  Input,
  Injectable,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  HostListener,
  ElementRef,
  Renderer2,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { EventEmitterService } from '../../services/toggle.service';
import { Link } from '../../interfaces/LinkInterface';
import { customTheme } from '../../assets/themes/custom';

@Injectable()
@Component({
  selector: 'sidebaradv',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, OnChanges {
  /** PROPERTIES-------------------------------------------------------------------------------------------------------- */

  @Input()
  links!: Array<Link>;
  links_list!: Array<Link>;
  favorite_links: Link = {
    id: 'favoriteLinks',
    label: 'Links Favoritos (0)',
    icon: '<i class="text-warning fa-solid fa-star"></i>',
    links: [],
  };

  @Input()
  header: any = null;
  headerIsComponent = false;
  @ViewChild('containerHeader', { read: ViewContainerRef })
  containerHeader!: ViewContainerRef;

  @Input()
  position: string = 'left';
  position_initial!: string;

  @Input()
  withHover: boolean = false;
  withHover_initial!: boolean;

  @Input()
  router: boolean = true;

  @Input()
  theme: string | any = 'light';

  @Input()
  topbar: any = null;
  topbarIsComponent = false;
  @ViewChild('containerTopbar', { read: ViewContainerRef })
  containerTopbar!: ViewContainerRef;

  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;

  showToggle: boolean = true;
  showToggle_initial!: boolean;

  @Input()
  search: boolean = false;
  filter_link: string = '';

  @Input()
  permissions: Array<string> = [];

  @Input()
  usePermissions: boolean = false;

  @Input()
  useFav: boolean = false;

  @ViewChild('advSidebarContent', { static: false })
  advSidebarContent!: ElementRef;

  /** CONSTRUCTOR-------------------------------------------------------------------------------------------------------- */

  constructor(
    private eventEmitterService: EventEmitterService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.eventEmitterService.onNavigaionToggle.subscribe((data: any) => {
      this.sidebarToggle();
    });
    this.eventEmitterService.onSetFav.subscribe((data: any) => {
      setTimeout(() => {
        this.setFavoriteLinks();
      }, 10);
    });
  }

  /** CYCLES-------------------------------------------------------------------------------------------------------- */

  ngOnInit() {
    this.withHover_initial = this.withHover;
    this.showToggle_initial = this.showToggle;
    this.position_initial = this.position;

    this.topbarCheck();
    this.headerCheck();
    this.checksize();

    this.links_list = JSON.parse(JSON.stringify(this.links));
    this.checkFavs();

    if (typeof this.theme != 'string') this.setCustomTheme();
  }

  ngAfterContentInit(): void {
    setTimeout(() => this.topbarCheck(), 0);
    setTimeout(() => this.headerCheck(), 0);
    this.checksize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['useFav']) {
      if (changes['useFav'].currentValue == true) {
        this.checkFavs();
      } else if (
        changes['useFav'].currentValue == false &&
        changes['useFav'].firstChange != true
      ) {
        delete this.links_list[0];
        this.links_list = JSON.parse(JSON.stringify(this.links));
      }
    }
  }

  /** METHODS-------------------------------------------------------------------------------------------------------- */

  /** Método acionado ao redimensionar a tela */
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.checksize();
  }

  /** Verifica o tamanho da tela, menor que 720px seta para modo mobile */
  checksize() {
    if (this.screenWidth <= 720) {
      this.withHover = false;
      this.showToggle = false;
      this.position = 'left';
    } else {
      this.withHover = this.withHover_initial;
      this.showToggle = this.showToggle_initial;
      this.position = this.position_initial;
    }
  }

  /** Verifica se a topbar existe, se é um component e diferente de uma string, em caso positivo é inserido no conteudo */
  topbarCheck() {
    if (typeof this.topbar !== 'string' && this.topbar !== null) {
      this.topbarIsComponent = true;

      const factory: any =
        this.componentFactoryResolver.resolveComponentFactory(this.topbar);

      if (this.containerTopbar === undefined) {
        return;
      }
      const componentRef = factory.create(this.containerTopbar.injector);
      this.containerTopbar.insert(componentRef.hostView);
    }
  }

  /** Verifica se o cabeçalho existe, se é um component e diferente de uma string, em caso positivo é inserido na sidebar */
  headerCheck() {
    if (typeof this.header !== 'string' && this.header !== null) {
      this.headerIsComponent = true;

      const factory: any =
        this.componentFactoryResolver.resolveComponentFactory(this.header);

      if (this.containerHeader === undefined) {
        return;
      }
      const componentRef = factory.create(this.containerHeader.injector);
      this.containerHeader.insert(componentRef.hostView);
    }
  }

  /** Define o estado da sidebar */
  sidebarToggle() {
    this.showToggle = !this.showToggle;
  }

  /** Método acionado ao ouvir o evento onSidebarTooggle() */
  hoverSidebarToggle() {
    if (this.withHover == true) this.showToggle = !this.showToggle;
  }

  /** Verifica recursivamente se há o texto pesquisado */
  recursiveSearch(data: any, text: string): any {
    if (data.hasOwnProperty('dividder')) return;

    text = text.toLowerCase();

    if (data.hasOwnProperty('label') && data.hasOwnProperty('path')) {
      let label = data['label'].toLowerCase();
      let tags = data.hasOwnProperty('tags') ? data['tags'] : [];

      let foundTag: Boolean = false;
      tags.forEach((tag: string) => {
        tag = tag.toLowerCase();
        if (tag.includes(text)) {
          foundTag = true;
        }
      });

      if (label.includes(text) || foundTag) return data;
    } else if (data.hasOwnProperty('links')) {
      var ell: any = [];
      data.links.forEach((el: any) => {
        var res = this.recursiveSearch(el, text);
        if (res !== undefined) ell.push(res);
      });

      if (ell.length == 0) return undefined;

      data.links = ell;
      return data;
    }
  }

  /** Faz a pesquisa nos links do menu, acionado no evento onKeyUp() do input de pesquisa*/
  searchLinks() {
    this.links_list = JSON.parse(JSON.stringify(this.links));
    this.links_list.unshift(this.favorite_links);
    var filtered_menu: Array<any> = [];

    this.initFavorites(this.links_list);

    if (this.filter_link != '') {
      this.links_list.forEach((obj: any) => {
        if (obj.id !== 'favoriteLinks') {
          var x = this.recursiveSearch(obj, this.filter_link);

          if (x !== undefined) {
            if (x.hasOwnProperty('links') && x.links[0].length == 0) '';
            else filtered_menu.push(x);
          }
        }
      });

      var alllinks = Object.assign(
        filtered_menu.filter((i) => i !== undefined),
        this.favorite_links
      );
      this.links_list = alllinks;

      if (this.links_list == undefined || this.links_list.length == 0) {
        this.links_list = [{ divider: 'Nenhum menu encontrado' }];
      }
    }
  }

  /** Seta os links favoritos no browser*/
  setFavoriteLinks() {
    var storage = localStorage.getItem('favoriteLinks');

    if (storage === undefined || storage === null) {
      localStorage.setItem('favoriteLinks', JSON.stringify([]));
      storage = localStorage.getItem('favoriteLinks');
    }

    if (storage !== undefined && storage !== null) {
      var links = JSON.parse(storage);

      var indexToRemove: Array<number> = [];

      links.forEach((link: any, index: number) => {
        var permited: boolean = false;

        if (this.usePermissions) {
          if (link.permissions !== undefined) {
            link.permissions.forEach((perm: any) => {
              if (this.permissions.includes(perm)) {
                permited = true;
                return;
              }
            });
          } else {
            permited = true;
            // return;
          }
        } else {
          permited = true;
        }

        if (permited) {
          link['isfav'] = true;
          link['favArea'] = true;
        } else {
          indexToRemove.push(index);
        }
      });

      indexToRemove.forEach((x: number) => links.pop(x));

      // links = this.removeDuplicates(links, 'path')

      this.favorite_links.links = links;
      this.favorite_links.label = `Links Favoritos (${links.length})`;

      localStorage.setItem('favoriteLinks', JSON.stringify(links));
    }
  }

  /** Seta os links iniciais favoritados no menu favoritos */
  initFavorites(el: any) {
    if (el.hasOwnProperty('links')) {
      this.initFavorites(el.links);
    } else if (el.length > 0) {
      el.forEach((ellink: any) => {
        this.initFavorites(ellink);
      });
    } else {
      if (this.favorite_links.links !== undefined) {
        this.favorite_links.links.forEach((fav: any) => {
          if (fav.label == el.label) {
            el['isfav'] = true;
            fav['favArea'] = true;
          }
        });
      }
    }
  }

  /** Limpa o input de pesquisa de links */
  clearInputSearchlinks() {
    this.filter_link = '';
    this.searchLinks();
  }

  /** Define o tema customizado */
  setCustomTheme() {
    var cuss: any = customTheme;
    for (const [key, value] of Object.entries(this.theme)) {
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      cuss = cuss.replace(regex, value);
    }

    const styleElement = this.renderer.createElement('style');
    this.renderer.appendChild(styleElement, this.renderer.createText(cuss));
    this.renderer.appendChild(document.head, styleElement);

    const sidebarElement = this.el.nativeElement.querySelector('.sidebar');
    if (sidebarElement) {
      this.renderer.addClass(sidebarElement, 'custom');
    }

    this.theme = 'custom';
  }

  /** Adiciona os favoritos a lista de links */
  checkFavs() {
    if (this.useFav) {
      this.setFavoriteLinks();

      this.links_list.forEach((el) => this.initFavorites(el));

      this.links_list.unshift(this.favorite_links);
    }
  }

  /** Debug de todas props */
  CONSOLE() {
    console.log(
      `---------------------------CONSOLE SIDEBAR---------------------------`
    );

    console.log('links:', this.links);
    console.log('links_list:', this.links_list);
    console.log('favorite_links:', this.favorite_links);
    console.log('header:', this.header);
    console.log('headerIsComponent:', this.headerIsComponent);
    console.log('containerHeader:', this.containerHeader);
    console.log('position:', this.position);
    console.log('position_initial:', this.position_initial);
    console.log('withHover:', this.withHover);
    console.log('withHover_initial:', this.withHover_initial);
    console.log('router:', this.router);
    console.log('theme:', this.theme);
    console.log('topbar:', this.topbar);
    console.log('topbarIsComponent:', this.topbarIsComponent);
    console.log('containerTopbar:', this.containerTopbar);
    console.log('screenWidth:', this.screenWidth);
    console.log('screenHeight:', this.screenHeight);
    console.log('showToggle:', this.showToggle);
    console.log('showToggle_initial:', this.showToggle_initial);
    console.log('search:', this.search);
    console.log('filter_link:', this.filter_link);
    console.log('permissions:', this.permissions);
    console.log('usePermissions:', this.usePermissions);

    console.log(
      `---------------------------FIM CONSOLE SIDEBAR---------------------------`
    );
  }

  /** Remove casos de favoritos dumplicados no path ???????????????????????*/
  // removeDuplicates(array: any, property: any) {
  //   return array.filter(
  //     (obj: any, index: any, self: any) =>
  //       index === self.findIndex((o: any) => o[property] === obj[property])
  //   );
  // }
}
