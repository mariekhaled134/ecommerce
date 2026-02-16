import { AuthService } from './../../../core/auth/service/authentication/auth.service';
import { FlowbiteService } from './../../../core/service/flowbite/flowbite';
import {
  Component,
  computed,
  inject,
  Input,
  PLATFORM_ID,
  Signal,
  signal,
  OnInit,
  Renderer2
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { CartService } from '../../../feature/cart/service/cart.service';
import { STORED_KEYS } from '../../../core/constants/storedKeys';
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  @Input({ required: true }) isLogin!: boolean;

  private readonly flowbiteService = inject(FlowbiteService);
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly translateService = inject(TranslateService);

  // ✅ cart count (initial value لازم يكون رقم)
  count: Signal<number> = computed(() => this.cartService.cartCount());

  // ✅ dropdown state
  private readonly renderer=inject(Renderer2)
  isOpen = signal(false);

  // ✅ languages
  languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'de', name: 'Deutsch' },
  ];

  // ✅ selected language (default)
  selectedLanguage = signal(this.languages[1]); // ar

  ngOnInit(): void {

    // init flowbite
    this.flowbiteService.loadFlowbite(() => {
      initFlowbite();
    });

    // ⚠️ أي localStorage لازم يكون هنا
    if (isPlatformBrowser(this.platformId)) {

      /* ---------- LANGUAGE ---------- */
      const savedLang = localStorage.getItem('lang') || 'ar';
      this.translateService.setDefaultLang('ar');
      this.translateService.use(savedLang);

      const langObj = this.languages.find(l => l.code === savedLang);
      if (langObj) {
        this.selectedLanguage.set(langObj);
      }

      /* ---------- CART ---------- */
      const token = localStorage.getItem(STORED_KEYS.userToken);
      if (token) {
        this.getAllCartData();
      }
    }
  }

  /* ================= CART ================= */
  getAllCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems ?? 0);
      }
    });
  }

  /* ================= LOGOUT ================= */
  signOut(): void {
    this.authService.userLogOut();
    this.isLogin = false;
  }

  /* ================= DROPDOWN ================= */
  toggleDropdown(): void {
    this.isOpen.update(open => !open);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }

  selectLanguage(language: typeof this.languages[0]): void {
    this.selectedLanguage.set(language);
    this.translateService.use(language.code);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', language.code);
    }
this.renderer.setAttribute(document.documentElement ,'lang',language.code)
this.renderer.setAttribute(document.documentElement ,'dir',language.code === 'en'|| language.code === 'de'? 'ltr':'rtl')

    this.closeDropdown();
  }
}
