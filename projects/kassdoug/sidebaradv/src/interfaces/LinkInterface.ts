export interface Link {
    id?:string
    path?:string,
    label?:string,
    icon?:string,
    links?:Array<Link>|undefined,
    divider?:string,
    isfav?:boolean,
    favArea?:boolean,
    permissions?:Array<any>,
    tags?:Array<string>
}