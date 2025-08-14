import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';

type MerchantKey = 'amazon' | 'mercadoLivre' | 'shopee';

interface Merchant {
  key: MerchantKey;
  label: string;
  btnBase: string;   // ex.: bg-[#FFE6B3]
  btnBorder: string; // ex.: border-[#E5C999]
  btnText: string;   // ex.: text-zinc-900
}

interface CompareRow {
  spec: string;
  iphone16: string;
  iphone15: string;
  s23: string;
}

interface CompareCTA {
  label: string;
  href: string;
  model: string;
  merchant: MerchantKey | 'amazon'; // mantive 'amazon' para os alternativos
  btnBase: string;
  btnBorder: string;
  btnText: string;
}

interface FaqItem {
  q: string;
  a: string;
}

@Component({
  selector: 'app-landing-page-iphone16.component',
  imports: [NgOptimizedImage],
  templateUrl: './landing-page-iphone16.component.html',
  styleUrl: './landing-page-iphone16.component.scss'
})
export class LandingPageIphone16Component {
  private title = inject(Title);

  price = 4679.10;

  affiliateLinks: Record<MerchantKey | 'alt1' | 'alt2', string> = {
    amazon: 'https://amzn.to/45AdB8b',
    mercadoLivre: 'https://mercadolivre.com/sec/1HzCfrS',
    shopee: 'https://s.shopee.com.br/8pbZvNw2Pl',
    alt1: 'https://amzn.to/45AdB8b', // iPhone 15 (ajuste se quiser)
    alt2: 'https://amzn.to/45AdB8b', // Galaxy S23 (ajuste se quiser)
  };

  faq: FaqItem[] = [
  { q: 'Tem nota fiscal e garantia?', a: 'Sim, conforme a loja escolhida (Amazon, Mercado Livre ou Shopee).' },
  { q: 'Posso parcelar?', a: 'Até 10x sem juros, dependendo do lojista.' },
  { q: 'O que vem na caixa?', a: 'iPhone, cabo USB-C e documentação.' },
];

  merchants: Merchant[] = [
    { key: 'amazon',       label: 'Amazon',       btnBase: 'bg-[#FFE6B3]', btnBorder: 'border-[#E5C999]', btnText: 'text-zinc-900' },
    { key: 'mercadoLivre', label: 'Mercado Livre',btnBase: 'bg-[#FFE600]', btnBorder: 'border-[#E6D300]', btnText: 'text-zinc-900' },
    { key: 'shopee',       label: 'Shopee',       btnBase: 'bg-[#FF5F00]', btnBorder: 'border-[#E05500]', btnText: 'text-white' },
  ];

  heroImages: string[] = [
    'https://http2.mlstatic.com/D_NQ_NP_2X_928475-MLA78901058072_092024-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_809152-MLA79138858581_092024-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_888579-MLA78900902176_092024-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_888921-MLA78901058088_092024-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_901248-MLA78900773752_092024-O.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_732287-MLA79138858617_092024-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_627582-MLA78900773762_092024-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_703931-MLA79138888225_092024-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_688982-MLA78900902202_092024-F.webp',
  ];

  logoList = [
    { src: 'https://i.pinimg.com/1200x/c7/4b/23/c74b23772d76d255f99a61db7d56b867.jpg', alt: 'Amazon' },
    { src: 'https://i.pinimg.com/1200x/79/33/12/793312b69b2c563a5923dd86ad892ece.jpg', alt: 'Mercado Livre' },
    { src: 'https://i.pinimg.com/1200x/5d/37/4b/5d374ba5148119cf4ae8940bceca7a78.jpg', alt: 'Shopee' },
  ];

  benefits: string[] = [
    'Controle da Câmera com acesso rápido a zoom e profundidade',
    'Câmera Fusion 48 MP + teleobjetiva 2x (qualidade óptica)',
    'Chip A18 de última geração e 5G',
    'Bateria para o dia inteiro e MagSafe',
  ];

  highlights = [
    { title: 'Fotos que vão além', desc: 'Ultra-angular com foco automático e macro; Fusion 48 MP em alta resolução.' },
    { title: 'Chip A18', desc: 'Duas gerações à frente do A16: poder gráfico e eficiência de energia.' },
    { title: 'Bateria e carregamento', desc: 'Até 22 h de vídeo¹, USB-C e MagSafe².' },
    { title: 'Feito para durar', desc: 'Alumínio aeroespacial, Super Retina XDR 6,1”³ e Ceramic Shield.' },
  ];

  compareRows: CompareRow[] = [
    { spec: 'Processador', iphone16: 'A18', iphone15: 'A16', s23: 'Snapdragon 8 Gen 2' },
    { spec: 'Câmeras', iphone16: '48 MP + 12 MP (ultra)', iphone15: '48 MP + 12 MP', s23: '50 + 12 + 10 MP' },
    { spec: 'Tela', iphone16: '6,1” Super Retina XDR', iphone15: '6,1” Super Retina XDR', s23: '6,1” Dynamic AMOLED 2X' },
    { spec: 'Bateria', iphone16: 'Até 22 h de vídeo¹', iphone15: 'Até 20 h', s23: '—' },
    { spec: 'IP / eSIM', iphone16: 'IP68 / eSIM', iphone15: 'IP68 / eSIM', s23: 'IP68 / eSIM' },
  ];

  compareCtas: CompareCTA[] = [
    { label: 'Quero o iPhone 16', href: this.affiliateLinks.amazon, model: 'iphone_16', merchant: 'amazon',
      btnBase: 'bg-[#FFE6B3]', btnBorder: 'border-[#E5C999]', btnText: 'text-zinc-900' },
    { label: 'Ver iPhone 15', href: this.affiliateLinks.alt1, model: 'iphone_15', merchant: 'amazon',
      btnBase: 'bg-slate-900', btnBorder: 'border-slate-800', btnText: 'text-white' },
    { label: 'Ver Galaxy S23', href: this.affiliateLinks.alt2, model: 'galaxy_s23', merchant: 'amazon',
      btnBase: 'bg-indigo-600', btnBorder: 'border-indigo-600', btnText: 'text-white' },
  ];

  constructor() {
    this.title.setTitle('iPhone 16 com preço de oportunidade | ClickReviews');
  }
}
