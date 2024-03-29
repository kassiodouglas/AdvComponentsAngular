import {
  Component,
  OnInit,
  Input,
  ElementRef,
  EventEmitter,
  Output,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Link } from '../../interfaces/LinkInterface';
import { EventEmitterService } from '../../services/toggle.service';

@Component({
  selector: 'app-navigation-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements OnInit {
  /** PROPERTIES-------------------------------------------------------------------------------------------------------- */

  @Input()
  link!: Link;

  @Input()
  theme: string | any = 'light';

  @Output()
  onSetfav: EventEmitter<any> = new EventEmitter();

  arrowActive: boolean = false;

  @Input()
  permissions: Array<string> = [];

  @Input()
  usePermissions: boolean = true;

  linkId: string = '';

  @Input()
  useFav: boolean = false;

  @ViewChildren('advLinks') multAdvLinks!: QueryList<ElementRef>;

  /** CONSTRUCTOR-------------------------------------------------------------------------------------------------------- */

  constructor(private eventEmitterService: EventEmitterService) {}

  /** CYCLES-------------------------------------------------------------------------------------------------------- */

  ngOnInit() {
    if (this.link != undefined && this.link !== null && !this.link.divider)
      this.linkId = this.link
        .label!.replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '')
        .toLowerCase();
  }

  /** METHODS-------------------------------------------------------------------------------------------------------- */

  /** Altera o estado da seta indicativa*/
  arrow() {
    this.arrowActive = !this.arrowActive;
  }

  /** Seta ou retira um link como favorito */
  setFav(link: any) {
    var id = this.linkId;
    var star = document.querySelector(`#${id}`);

    if (star == null) return;

    var storage = localStorage.getItem('favoriteLinks');
    if (storage === null || storage === undefined) return;

    var links = JSON.parse(storage);

    if (star?.classList.contains('active')) {
      links.forEach((el: any, index: any) => {
        if (el.label == link.label) {
          links.splice(index, 1);
        }
      });
      star?.classList.remove('active');
      star?.classList.remove('fa-solid');
      star?.classList.add('fa-regular');
    } else {
      links.push(link);
      star?.classList.add('active');
      star?.classList.add('fa-solid');
      star?.classList.remove('fa-regular');
    }

    localStorage.setItem('favoriteLinks', JSON.stringify(links));

    this.eventEmitterService.onSetFav.emit(link);
  }

  /** Verifica se há permissão para ver o link */
  checkPermission(permisisons: any) {
    if (this.usePermissions === false) return true;

    if (permisisons === undefined) return true;

    var result = false;

    this.permissions.forEach((perm: any) => {
      if (permisisons.includes(perm)) {
        result = true;
        return;
      }
    });

    return result;
  }
}
