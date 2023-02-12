import { component$, useStylesScoped$, useStore, useTask$, NoSerialize } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import styles from './color-palette-extractor.scss?inline'
import { $ } from '@builder.io/qwik';

export const Icon = () => <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ededed"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.205 3h11.59c1.114 0 1.519.116 1.926.334.407.218.727.538.945.945.218.407.334.811.334 1.926v7.51l-4.391-4.053a1.5 1.5 0 0 0-2.265.27l-3.13 4.695-2.303-1.48a1.5 1.5 0 0 0-1.96.298L3.005 18.15A12.98 12.98 0 0 1 3 17.795V6.205c0-1.115.116-1.519.334-1.926.218-.407.538-.727.945-.945C4.686 3.116 5.09 3 6.205 3zm9.477 8.53L21 16.437v1.357c0 1.114-.116 1.519-.334 1.926a2.272 2.272 0 0 1-.945.945c-.407.218-.811.334-1.926.334H6.205c-1.115 0-1.519-.116-1.926-.334a2.305 2.305 0 0 1-.485-.345L8.2 15.067l2.346 1.508a1.5 1.5 0 0 0 2.059-.43l3.077-4.616zM7.988 6C6.878 6 6 6.832 6 7.988 6 9.145 6.879 10 7.988 10 9.121 10 10 9.145 10 7.988 10 6.832 9.121 6 7.988 6z" fill="#ededed"></path></g></svg>

const ColorConverter = component$(() => {
  useStylesScoped$(styles)

  let selectedImage

  const handelChange = $((event: any) => {
    selectedImage = URL.createObjectURL(event.target.files[0])
  });

  return (
    <div class='master'>
      <div class='contain'>
        <div class='left-col'>
          <label class={'drop-label'} for='myImage'> <Icon /><br /> Drop your image here</label>
          <label class={'select-label'} for='myImage'>Or Click here to Select your Image</label>
          <input
            type="file"
            id="myImage"
            accept="image/*"
            onChange$={event => handelChange(event)}
            style={{ visibility: 'hidden' }}
          />
          {selectedImage && <img alt="not fount" width={"250px"} src= {selectedImage} />}
        </div>
        <div class="right-col">
          <label>Color Palette</label>
        </div>
      </div>
    </div>
  );
});

export default ColorConverter

export const head: DocumentHead = {
  title: 'Color Palette Extractor',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};