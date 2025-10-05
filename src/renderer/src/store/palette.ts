import { create } from "zustand";
import palette from 'material-colors-ts'

export type ColorType = 'light' | 'dark'

export type Color = {
  name: string
  hue: string
  shade?: { name: string, hue: string, type: ColorType }[]
  type: ColorType
}

type Store = {
  palette: Color[]
  map_hue: Map<string, Color>
  get_color(color: string): Color | void
}

export const usePalette = create<Store>((_set, get) => {

  const store: Store = {
    palette: [],
    map_hue: new Map(),
    get_color(color) {

      const { map_hue } = get()
      return map_hue.get(color)
    }
  }

  for (const color_key in palette) {
    const color = palette[color_key]

    let Color: Color = {
      name: color_key,
      hue: '',
      type: 'dark'
    }

    if (typeof color === 'string') {

      Color.hue = color
      Color.type = isColorLightOrDark(color)
      store.map_hue.set(color, Color)

    } else {

      Color.hue = color[500]
      Color.type = isColorLightOrDark(color[500])

      Color.shade = Object.entries(color)
        .map(([key, value]) => {

          const _color = value as string

          store.map_hue.set(_color, Color)

          return ({
            name: color_key + key,
            hue: _color,
            type: isColorLightOrDark(_color)
          })
        })

      store.map_hue.set(color[500], Color)

    }

    store.palette.push(Color)

  }

  return store

})


function isColorLightOrDark(hexColor: string) {
  // 1. Pulizia e normalizzazione del colore HEX
  // Rimuove l'hash iniziale se presente
  const hex = hexColor.replace(/^#/, '');

  // Se è in formato breve (es. "FFF"), lo espande (es. "FFFFFF")
  const fullHex = hex.length === 3 ?
    hex.split('').map(c => c + c).join('') :
    hex;

  // 2. Estrazione dei componenti RGB
  const r = parseInt(fullHex.substring(0, 2), 16); // Rosso
  const g = parseInt(fullHex.substring(2, 4), 16); // Verde
  const b = parseInt(fullHex.substring(4, 6), 16); // Blu

  // 3. Calcolo della Luminosità (Media Pesata)
  // Questa formula è usata spesso in UI design per approssimare la percezione umana
  // I pesi (0.299, 0.587, 0.114) riflettono la sensibilità dell'occhio ai colori (più sensibile al verde)
  const brightness = (r * 0.299 + g * 0.587 + b * 0.114);

  // 4. Soglia di Riferimento
  // Un valore tipico di soglia (threshold) è 128 (a metà tra 0 e 255)
  const threshold = 128;

  // 5. Risultato
  return brightness > threshold ? 'light' : 'dark';
}


// function LightenDarkenColor(col: string, amt: number) {
//   var usePound = false;
//   if (col[0] == "#") {
//     col = col.slice(1);
//     usePound = true;
//   }

//   var num = parseInt(col, 16);

//   var r = (num >> 16) + amt;

//   if (r > 255) r = 255;
//   else if (r < 0) r = 0;

//   var b = ((num >> 8) & 0x00FF) + amt;

//   if (b > 255) b = 255;
//   else if (b < 0) b = 0;

//   var g = (num & 0x0000FF) + amt;

//   if (g > 255) g = 255;
//   else if (g < 0) g = 0;

//   return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
// }