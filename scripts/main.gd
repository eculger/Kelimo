extends Node2D


var kelimeler = ["elma", "kitap", "masa", "kalem", "bahçe"]
var hedef_kelime = ""

func _ready():
	hedef_kelime = kelimeler.pick_random()
	var harfler = Array(hedef_kelime.split(""))
	harfler.shuffle()
	print("Karışık harfler: ", harfler)
	print("Cevap: ", hedef_kelime)
