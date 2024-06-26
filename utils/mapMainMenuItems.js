import {v4 as uuid} from 'uuid';
export const mapMainMenuItems = (menuItems) => {
// console.log("fetched menu",menuItems);
// const dest_split = `${menuItem.menuItem.destination?.uri.split("/index.php")}`;
// console.log('newURi',dest_split);
return menuItems.map((menuItem) => ({
 id: uuid(),
 destination: menuItem.menuItem.destination?.uri,
 label: menuItem.menuItem.label,
 subMenuItems: (menuItem.items || []).map((submenuitem) =>{
    return({
        id:uuid(),
        destination:`${submenuitem.destination?.uri}`,
        label:submenuitem.label,
    });
 })
}));
}