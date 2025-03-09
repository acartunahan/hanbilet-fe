import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-uye-sil',
  standalone: true,
  imports:[CommonModule, FormsModule],
  templateUrl: './uye-sil.component.html',
  styleUrls: ['./uye-sil.component.css']
  
})
export class UyeSilComponent {
  userId: number | null = null; // Kullanıcı ID'si
  message: string = ''; // Silme işlemi sonucu mesajı
  isSuccess: boolean = false; // İşlem başarılı mı?

  constructor(private http: HttpClient) {}

  // Kullanıcıyı silme işlemi
  deleteUser() {
    if (!this.userId) {
      this.message = 'Lütfen bir kullanıcı ID girin.';
      this.isSuccess = false;
      return;
    }

    const url = `http://localhost:5232/api/user/${this.userId}`;

    this.http.delete(url).subscribe({
      next: (response: any) => {
        this.message = response.message || 'Kullanıcı başarıyla silindi.';
        this.isSuccess = true;
        this.userId = null; // Input'u temizle
      },
      error: (error) => {
        this.message = error.error?.message || 'Kullanıcı silinirken bir hata oluştu.';
        this.isSuccess = false;
      }
    });
  }
}