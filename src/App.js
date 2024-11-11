import React, { useEffect, useState } from "react";
import { getUser } from "./api/user-service";
import { encryptedLocalStorage } from "./helpers/functions/encrypt-storage";
import LoadingPage from "./pages/common/LoadingPage";
import CustomRoutes from "./router/CustomRoutes";
import { useAppDispatch } from "./store/hooks";
import { loginFailed, loginSuccess } from "./store/slices/auth-slice";

const App = () => {
  //Sorun tanimi: Kullanici sayfayi refresh yaptiginda ya da uygulamayi kisa süreligine kapatip actiginda kullanici bilgileri gidiyor ve tekrar login olmasi gerekiyordu. Oysa elimizde backend den aldigimiz token var, bu token expire olana kadar bunun üzerinden kullaniciyi tekrar otomatik olarak tanimlayabilir ve böylece kullanicinin tekrar tekrar login olma zorunlulugunu engelleyebiliriz. Uygulamanin ilk datalarini cekildigi, backende baglanip merkezi state in initial degerlerini verdigimiz yer genelde App.js oldugu icin (bizim durumumuzda da böyle), bu bahsedilen islemi burada yapacagiz. (Biz bu islemi burada yapmadan önce bu dosyada sadece return bölümü vardi ve return bölümünde de sadece CustomRoutes tanimliydi.) Artik App.js, yani uygulamanin herhangi bir yeri, refresh edildiginde, elimizde token oldugu müddetce, kullanici bilgisi tanimli gelecek.
  //ilave bilgi: Javacilar bu frontend projesinden sonra bir shopping uygulamasi yapacaklar. O uygulamada söyle bir özellik olacak bununla ilgili: müsteri sepetine ürünler ekliyor, fakat alisverisi tamamlamiyor. Bu sepet bilgisinin backend'de saklanmasi gerekiyor, cünkü kullanicinin bir sonraki login inde bu sepet bilgisine de ulasmasi gerekir. Dolayisiyla sepet bilgisi backend'de saklanacak, kullanci bir sonraki login inde bu bilgiyi, kendi user bilgileri ile burada kurdugumuz bir yapiyla tekrar cekecek, baska bir ifadeyle backend'deki bu bilgiyi kullanarak kendi initial degerlerini tekrar tanimlayacak.

  //yukarida tanimladigimiz isleme basliyoruz. Öncelikle burada bir yükleme islemi oldugu icin useState yapisini kullanarak bir loading bilgisi olusturuyoruz, degerini true atiyoruz, cünkü girer girmez datayi cekmek istiyoruz:
  //bu loading i, return icerisinde cagirdigimiz LoadingPage icin hazirladik, orada kullanacagiz. LoadingPage i daha önce hazirlamistik, ilk defa burada kullaniyoruz. Data cekilene kadar icerisinde bir Spinner olan bu LoadingPage imiz görülecek.
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch(); //asagida dispatch i kullanacagimiz icin onu burada aldik.

  //bir loadData fonksiyonu olusturup, icerisinde backend e baglanacagimiz bir try catch yapisi olusturuyoruz:
  const loadData = async () => {
    try {
      const token = encryptedLocalStorage.getItem("token");
      if (token) {
        //bir üst satirda token adinda bir variable olusturup bu satirda söyle dedik, eger token var ise calistir, yoksa calistirma. Böylece, token olmadan buranin gereksiz yere calismasini önlemis olduk.
        const resp = await getUser(); //getUser, bizim api klasöründe user-service.js'de, kullanici bilgilerini backend e baglanip almak üzere tanimladigimiz fonksiyonumuzdu.
        dispatch(loginSuccess(resp.data)); //resp.data yi loginSuccess e gönderdik.
      }
    } catch (err) {
      console.log(err);
      dispatch(loginFailed()); //hata olmasi, data nin alinmamasi durumuna karsin loginFailed fonksiyonumuzu burada cagirdik.
    } finally {
      setLoading(false);
    }
  };

  //yukarida olusturdugumuz loadData fonksiyonunun bir kere calismasi saglamak icin bir useEffect olusturup icerisinde loadData yi cagiriyoruz.
  useEffect(() => {
    loadData();
  }, []);

  return <div>{loading ? <LoadingPage /> : <CustomRoutes />}</div>;
};

export default App;
