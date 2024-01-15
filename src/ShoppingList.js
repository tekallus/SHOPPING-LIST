import React, { useState } from "react";
import "./styles.css";

// yapacagimiz alisveris listesi KABACA div altinda form ,label , input  ve formu gondermekicin add buton olacak
//mevcut oge ve var olan ogeler icin iki farkli useState tanimlayalim
//form gonderildiginde calisacak fonksiyon, yeni oge ekleme fonksiyonu ve ogeleri silme fonksiyonlarini da tamamlayim ilgili yerlere baglantisini saglayalim
const ShoppingList = () => {
  // alisveri listesindeki ogeleri takip etmek icin state tanimlamalari
  // alisveris iki tane state tanimlamaliyiz biri mevcut durumu digeride yeni ogeyi tutacak
  //  items, mevcut alışveriş listesindeki tum ogeleri içerirken, newItem, yeni eklenen öğeyi temsil eder.
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  // inputa Yeni öğe ekleme fonksiyonu bos eklemeyi engelleyecek sekilde if (newItem.trim() !== "") kosullu
  const addNewItem = () => {
    if (newItem.trim() !== "") {
      setItems([...items, newItem]); //listedekileri koruyarak yeni itemide ekleme
      setNewItem("");
    }
  };

  // Öğe silme fonksiyonu
  const deleteItem = (itemToDelete) => {
    // Silinmek istenen öğenin ilk örneğinin index'ini bulalim
    const index = items.indexOf(itemToDelete);

    // Eğer öğe bulunursa, bu index'ten önceki ve sonraki tüm elemanları içeren yeni bir dizi oluşturalim
    //
    if (index !== -1) {
      // 'index' değeri -1 değilse, yani öğe dizide bulunuyorsa bu bloğa girilir
      // 'indexOf' metodu, aranan öğenin dizideki ilk indeksini döndürür
      // Eğer öğe bulunamazsa 'indexOf' -1 döndürür.

      // '...items.slice(0, index)' ifadesi, dizinin başlangıcından 'index' (hariç) indeksine kadar olan kısmı alır
      // Bu, silinecek öğeden önceki kısmı temsil eder.

      // '...items.slice(index + 1)' ifadesi, 'index' indeksinden sonraki kısmı alır
      // Bu, silinecek öğeden sonraki kısmı temsil eder.

      // 'updatedItems' adlı yeni dizi, yukarıdaki iki parçanın birleştirilmesi ile oluşur
      const updatedItems = [
        ...items.slice(0, index),
        ...items.slice(index + 1)
      ];
      setItems(updatedItems);
    }
  };

  // Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = (e) => {
    e.preventDefault(); // Bu satır, formun varsayılan davranışını engeller. yeniden yüklenmesini önler
    //Bu, genellikle bir formun SPA (Single Page Application) içinde çalıştığı modern web uygulamalarında kullanılır.
    //Form gönderildiğinde sayfanın yeniden yüklenmesi istenmiyorsa preventDefault() kullanılır.
    addNewItem();
  };

  return (
    <div className="mainContainer">
      <h2>Project 4: Alışveriş Listesi</h2>
      <div className="shoppingContainer">
        <h3>Alınacaklar</h3>

        <form onSubmit={handleSubmit}>
          <label>
            <input
              className="shoppinInput"
              type="text"
              value={newItem}
              placeholder="Yeni bir madde ekleyin"
              onChange={(e) => setNewItem(e.target.value)}
            />
          </label>
          <button type="submit">Add</button>
        </form>
        {/* alisveris listesi ogelerini listelemek icin items adlı bir dizi üzerinde dönerek her bir öğeyi ve index'i ile birlikte alır. map fonksiyonu, dizi elemanları üzerinde dönüş yapar  */}
        <ul>
          {items.map((item, index) => (
            <li key={index} className="shoppingItem">
              {item}
              <button onClick={() => deleteItem(item)} className="deleteButton">
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShoppingList;
