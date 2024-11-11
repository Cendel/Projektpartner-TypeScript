//bu komponenti sayfayi yukariya almak icin kullanacagiz. Bunun gibi  bir yapi kullanmadigimiz zaman,
//footer daki menüden sayfa degistirince ekrani sayfa basina tasimiyor, footer'da birakiyordu.
//bu komponentin görsel bir yani yok.
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  //yukari tasima özelligi sayfa degistiginde calisacagi icin, öncelikle sayfa degisikliginin algilanmasi lazim. Bunu, menubar.js'de yaptigimiz gibi useLocation ile yapabiliriz.

  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, behavior: "instant" }); //=>Bu DOM'un bir methodu, react'da scroll hareketleriyle ilgili bir yapi bulunmuyor
  }, [pathname]); //pathname degisince useEffect in ici degisecek

  return null;
};

export default ScrollToTop;

//son olarak bu komponent i custom-routes.js'e ekliyoruz.
//App.js'e de ekleyebilirdik, önemli olan diger bütün komponentleri kusatmasi.
