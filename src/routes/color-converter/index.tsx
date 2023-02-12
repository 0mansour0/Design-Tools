import { component$, useStyles$, useStylesScoped$, useStore, useTask$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import styles from './color-converter.scss?inline'
import { $ } from '@builder.io/qwik';

const ColorConverter = component$(() => {
  useStylesScoped$(styles)

  const state = useStore({
    color: '#000000',
    rgb: 'rgb(0,0,0)',
    r:0,
    g:0,
    b:0,
    hsl: 'hsl(0,0%,0%)'
  })

  const handelpalletteChange = $((color: string) => {
    state.color = color
  });

  const handelChange = $((e: any) => {
    state.color = document.getElementById('input-hex')?.value
  });

  const convertToRGB = $(() => {
    const color = state.color.slice(1)
    let aRgbHex = color.match(/.{1,2}/g);
    let aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];

    state.rgb = 'rgb'

    state.rgb+= '('
    let i = 0
    aRgb.forEach(element => {
      if(i !== 0)
        state.rgb+= ','
      state.rgb+= element
      i++
    });
    state.rgb+= ')'

    state.r= aRgb[0]
    state.g= aRgb[1]
    state.b= aRgb[2]

  });

  const rgbToHslc = $((r:number, g:number, b:number) => {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

       // Calculate hue
      // No difference
      if (delta == 0)
      h = 0;
    // Red is max
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
      h = (b - r) / delta + 2;
    // Blue is max
    else
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);
      
    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;
    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
      
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    state.hsl = "hsl(" + h + "," + s + "%," + l + "%)";
  });

  const handelClick = $(() => {
    state.color = '#' + Math.floor(Math.random()*16777215).toString(16);
  });

  useTask$(({ track }) => {
    track(() => state.color);
    convertToRGB()
    rgbToHslc(state.r, state.g, state.b)
  });

  return (
    <div class='main'>
      <div class='container'>
        <div class='inputs'>
          <div class='left-col'>
            <label class='label-input'>Enter Color</label>
            <input id='input-hex' name='input-hex' type='text' value={state.color} onChange$={e => handelChange(e)} />
            <label class='under'>Example: #808080 or rgb(128, 128, 128) or
            <button class={'btn-Random'} onClick$={handelClick}>Get Random Color</button>
            </label>
          </div>
          <div class="right-col">
            <input type="color" class="colorpicker" value={state.color} onChange$={e => handelpalletteChange(e.target.value)} />
          </div>
        </div>
        <label class='colorValues'>Color Values</label>
        <div class="outputs">
          <div class="left-col">
            <div class="output">
              <div class="hex">
                <label class='label-output-hex'>Hex</label>
                <input id='output-hex' name='output-hex' type='text' value={state.color} disabled={true} />
              </div>
              <div class="rgb">
                <label class='label-output-rgb'>RGB</label>
                <input id='output-rgb' name='output-rgb' type='text' value={state.rgb} disabled={true} />
              </div>   
              <div class="hsl">
                <label class='label-output-hsl'>HSL</label>
                <input id='output-hsl' name='output-hsl' type='text' value={state.hsl} disabled={true} />
              </div>   
            </div>
          </div>
          <div class="right-col square" style={{backgroundColor:`${state.color}`}}>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ColorConverter

export const head: DocumentHead = {
  title: 'Color Converter',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};