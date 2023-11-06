export interface NavigationLinkInterface {
    id?:string
    path?:string,
    label?:string,
    icon?:string,
    links?:Array<NavigationLinkInterface>,
    divider?:string,
    isfav?:boolean,
    favArea?:boolean,
    permissions?:Array<any>
}