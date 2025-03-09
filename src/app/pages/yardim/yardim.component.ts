import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-yardim',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './yardim.component.html',
  styleUrls: ['./yardim.component.css']
})
export class YardimComponent {
  sections = [
    {
      id: 'table1',
      title: 'İptal, İade, Değişim ve Açık Bilet',
      icon: 'assets/icons/cancel.png',
      open: false,
      content: [
        { topic: 'Bilet İptali', description: 'Satın alınan biletler, seyahat tarihinden 24 saat önce iptal edilebilir.' },
        { topic: 'Bilet İadesi', description: 'Bilet iptal edildikten sonra, ödeme şekline göre belirlenen sürede iade yapılır.' },
        { topic: 'Bilet Değişimi', description: 'Seyahat tarihinden 12 saat önceye kadar tarih veya saat değişikliği yapılabilir.' },
        { topic: 'Açık Bilet', description: 'Biletiniz açık bilete dönüştürülebilir ve belirlenen süre içinde tekrar kullanılabilir.' }
      ]
    },
    {
      id: 'table2',
      title: 'Otobüs Bileti Kampanyaları',
      icon: 'assets/icons/ticket.png',
      open: false,
      content: [
        { topic: 'Erken Rezervasyon', description: 'Belirli tarihler için erken alımlarda indirim uygulanır.' },
        { topic: 'Grup İndirimi', description: '5 ve daha fazla kişilik gruplara özel indirimler sunulur.' },
        { topic: 'Gidiş-Dönüş İndirimi', description: 'Gidiş-dönüş biletlerinde ekstra indirim sağlanır.' },
        { topic: 'Öğrenci İndirimi', description: 'Geçerli öğrenci belgesi ile indirimli bilet satın alabilirsiniz.' }
      ]
    },
    {
      id: 'table3',
      title: 'Ödeme İşlemleri',
      icon: 'assets/icons/payment.png',
      open: false,
      content: [
        { topic: 'Kredi Kartı', description: 'Visa, MasterCard ve diğer yaygın kredi kartları ile ödeme yapabilirsiniz.' },
        { topic: 'Banka Havalesi', description: 'Belirtilen banka hesaplarına havale/EFT ile ödeme yapabilirsiniz.' },
        { topic: 'Kapıda Ödeme', description: 'Seçili seferlerde kapıda nakit veya kart ile ödeme yapabilirsiniz.' },
        { topic: 'Promosyon Kodları', description: 'Geçerli promosyon kodları ile indirimli ödeme yapabilirsiniz.' }
      ]
    },
    {
      id: 'table4',
      title: 'Biletiniz Hakkında',
      icon: 'assets/icons/info.png',
      open: false,
      content: [
        { topic: 'PNR Kodu', description: 'Biletinizi sorgulamak için PNR kodunuzu kullanabilirsiniz.' },
        { topic: 'Koltuğunuzu Seçin', description: 'Satın alma işlemi sırasında koltuk seçimi yapabilirsiniz.' },
        { topic: 'Bagaj Hakkı', description: 'Her yolcunun belirlenen bagaj hakkı bulunmaktadır. Fazla bagaj ek ücrete tabidir.' },
        { topic: 'Check-in', description: 'Online check-in yaparak daha hızlı ve kolay biniş yapabilirsiniz.' }
      ]
    }
  ];

  toggleSection(id: string) {
    this.sections.forEach(section => {
      section.open = section.id === id ? !section.open : false;
    });
  }
}


