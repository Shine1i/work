export interface City {
  name: string;
  imageUrl: string;
  count: number;
  href: string;
}

export const cities: City[] = [
  {
    name: "Stockholm",
    imageUrl: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800&auto=format&fit=crop&q=80",
    count: 9065,
    href: "#",
  },
  {
    name: "Göteborg",
    imageUrl: "https://www.planetware.com/wpimages/2023/03/sweden-gothenburg-top-attractions-things-to-do-enjoy-views-from-skansen-kronan-blue-sky.jpg",
    count: 5075,
    href: "#",
  },
  {
    name: "Malmö",
    imageUrl: "https://www.planetware.com/photos-large/S/sweden-malmo-turning-torso.jpg",
    count: 2661,
    href: "#",
  },
  {
    name: "Uppsala",
    imageUrl: "https://www.planetware.com/wpimages/2021/01/sweden-uppsala-top-attractions-uppsala-castle.jpg",
    count: 1488,
    href: "#",
  },
  {
    name: "Linköping",
    imageUrl: "https://visitlinkoping.se/en/wp-content/uploads/gb/2023/12/linkopingcity-artiekl-1200x720-1-1024x614.jpg",
    count: 1676,
    href: "#",
  },
  {
    name: "Västerås",
    imageUrl: "https://www.campervansweden.com/assets/img/blog/611/vasteras.webp",
    count: 1343,
    href: "#",
  },
];
