import { useState } from 'react';

const HARFLER = ['k', 'a', 'l', 'e', 'm', 't', 'i', 'r'];

const GECERLI_KELIMELER = [
  'kalem',
  'elma',
  'kale',
  'terim',
  'kitle',
  'mera',
  'tel',
  'kar',
  'ter',
  'ark',
];

const HARF_DEGERLERI: Record<string, number> = {
  a: 1,
  b: 3,
  c: 4,
  ç: 4,
  d: 3,
  e: 1,
  f: 7,
  g: 5,
  ğ: 8,
  h: 5,
  ı: 2,
  i: 1,
  j: 10,
  k: 1,
  l: 1,
  m: 2,
  n: 1,
  o: 2,
  ö: 7,
  p: 5,
  r: 1,
  s: 2,
  ş: 4,
  t: 1,
  u: 2,
  ü: 3,
  v: 7,
  y: 3,
  z: 4,
};

const ISTISNALAR: Record<string, number> = {};

function karistir(dizi: string[]): string[] {
  const kopya = [...dizi];
  for (let i = kopya.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopya[i], kopya[j]] = [kopya[j], kopya[i]];
  }
  return kopya;
}

function puanHesapla(kelime: string): number {
  if (Object.prototype.hasOwnProperty.call(ISTISNALAR, kelime)) {
    return ISTISNALAR[kelime];
  }
  let toplam = 0;
  for (const harf of kelime) {
    toplam += HARF_DEGERLERI[harf] ?? 0;
  }
  toplam += Math.max(0, (kelime.length - 3) * 5);
  return toplam;
}

export default function App() {
  const [karisikHarfler] = useState<string[]>(() => karistir(HARFLER));
  const [slotlar, setSlotlar] = useState<string[]>(() => Array(HARFLER.length).fill(''));
  const [sonraki, setSonraki] = useState<number>(0);
  const [toplamPuan, setToplamPuan] = useState<number>(0);
  const [labelText, setLabelText] = useState<string>('Puan: 0');

  const harfBasildi = (harf: string) => {
    if (sonraki < slotlar.length) {
      const yeniSlotlar = [...slotlar];
      yeniSlotlar[sonraki] = harf;
      setSlotlar(yeniSlotlar);
      setSonraki(sonraki + 1);
    }
  };

  const temizle = () => {
    setSlotlar(Array(HARFLER.length).fill(''));
    setSonraki(0);
  };

  const gonderBasildi = () => {
    const kelime = slotlar.join('');
    if (GECERLI_KELIMELER.includes(kelime)) {
      const puan = puanHesapla(kelime);
      const yeniToplam = toplamPuan + puan;
      setToplamPuan(yeniToplam);
      setLabelText(`${kelime}: +${puan} | Toplam: ${yeniToplam}`);
    } else {
      setLabelText('Geçersiz kelime');
    }
    temizle();
  };

  return (
    <main className="kelimo-board">
      <div className="kelimo-label" role="status" aria-live="polite">
        {labelText}
      </div>

      <div className="kelime-alani" aria-label="Kelime Alanı">
        {slotlar.map((harf, index) => (
          <button
            key={index}
            type="button"
            className="slot-btn"
            aria-label={`Slot ${index + 1}: ${harf || 'boş'}`}
          >
            {harf}
          </button>
        ))}
      </div>

      <div className="harf-alani" aria-label="Harf Alanı">
        {karisikHarfler.map((harf, index) => (
          <button
            key={`${harf}-${index}`}
            type="button"
            className="harf-btn"
            onClick={() => harfBasildi(harf)}
          >
            {harf}
          </button>
        ))}
      </div>

      <button type="button" className="gonder-btn" onClick={gonderBasildi}>
        Gönder
      </button>
    </main>
  );
}
