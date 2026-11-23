extends Node2D

var harfler = ["k", "a", "l", "e", "m", "t", "i", "r"]
var gecerli_kelimeler = ["kalem", "elma", "kale", "terim", "kitle", "mera", "tel", "kar", "ter", "ark"]
var harf_degerleri = {
	"a": 1, "b": 3, "c": 4, "ç": 4, "d": 3, "e": 1, "f": 7,
	"g": 5, "ğ": 8, "h": 5, "ı": 2, "i": 1, "j": 10, "k": 1,
	"l": 1, "m": 2, "n": 1, "o": 2, "ö": 7, "p": 5, "r": 1,
	"s": 2, "ş": 4, "t": 1, "u": 2, "ü": 3, "v": 7, "y": 3, "z": 4
}
var istisnalar = {}

var slotlar = []
var sonraki = 0
var toplam_puan = 0

func _ready():
	print("1 basladi")
	var karisik = harfler.duplicate()
	karisik.shuffle()
	for i in harfler.size():
		var slot = Button.new()
		slot.custom_minimum_size = Vector2(40, 40)
		slotlar.append(slot)
		$KelimeAlani.add_child(slot)
	print("2 slotlar tamam")
	for harf in karisik:
		var btn = Button.new()
		btn.text = harf
		btn.pressed.connect(harf_basildi.bind(harf))
		$HarfAlani.add_child(btn)
	print("3 harfler tamam")
	$Gonder.pressed.connect(gonder_basildi)
	$Label.text = "Puan: 0"
	print("4 bitti")

func harf_basildi(harf):
	if sonraki < slotlar.size():
		slotlar[sonraki].text = harf
		sonraki += 1

func gonder_basildi():
	var kelime = ""
	for slot in slotlar:
		kelime += slot.text
	if kelime in gecerli_kelimeler:
		var puan = puan_hesapla(kelime)
		toplam_puan += puan
		$Label.text = kelime + ": +" + str(puan) + " | Toplam: " + str(toplam_puan)
	else:
		$Label.text = "Geçersiz kelime"
	temizle()

func temizle():
	for slot in slotlar:
		slot.text = ""
	sonraki = 0

func puan_hesapla(kelime):
	if istisnalar.has(kelime):
		return istisnalar[kelime]
	var toplam = 0
	for harf in kelime:
		toplam += harf_degerleri.get(harf, 0)
	toplam += max(0, (kelime.length() - 3) * 5)
	return toplam
