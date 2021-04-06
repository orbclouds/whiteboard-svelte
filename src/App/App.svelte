<script lang="ts">
  import { GoogleAnalytics } from '@beyonk/svelte-google-analytics';

  import Orb from '@app/Orb';

  import draw from './draw';
  import gallery from './gallery';

  let canvas: HTMLCanvasElement;

  const clear = () => {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );
  };

  const save = () => {
    if (!canvas) return;

    const href = canvas.toDataURL();
    gallery.update((prev) => [
      ...prev,
      href,
    ]);
  };

  const load = (src: string) => () => {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const image = document.createElement(
      'img'
    );
    image.setAttribute('src', src);

    clear();
    ctx.drawImage(image, 0, 0);
  };
</script>

<GoogleAnalytics
  properties={[
    import.meta.env
      .SNOWPACK_PUBLIC_GOOGLE_ANALYTICS_ID,
  ]}
/>

<Orb />

<header>
  <button
    type="button"
    on:click={clear}
  >
    Clear
  </button>
  <button type="button" on:click={save}>
    Save
  </button>
</header>

<main>
  <h2>Your saved artwork:</h2>
  <div class="gallery">
    {#each $gallery as art}
      <button
        class="saved"
        on:click={load(art)}
      >
        <img
          src={art}
          alt="Oops, couldn't load!"
        />
      </button>
    {/each}
  </div>
  <canvas bind:this={canvas} use:draw />
</main>

<style>
  header {
    width: 80%;
    margin: 16px auto;
  }
  button {
    border: none;
    font: inherit;
    cursor: pointer;
    appearance: none;
    padding: 12px 16px;
    border-radius: 8px;
    background: rgba(
      255,
      255,
      255,
      0.2
    );
    border: solid 1px rgba(0, 0, 0, 0.2);
    transition: background 0.3s
      cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  button:hover {
    background: rgba(
      255,
      255,
      255,
      0.3
    );
  }
  main {
    width: 80%;
    margin: 0 auto;
  }
  div.gallery {
    display: flex;
    margin: 32px 0;
    overflow: auto;
  }
  button.saved {
    margin: 0 8px;
  }
  div.gallery button:first-of-type {
    margin-left: 0;
  }
  div.gallery button:last-of-type {
    margin-right: 0;
  }
  img {
    height: 100px;
    display: block;
    border-radius: 8px;
    background: white;
    border: solid 1px rgba(0, 0, 0, 0.2);
  }
  canvas {
    cursor: url(data:text/plain;charset=utf-8;base64,8J+WjA==);
    display: block;
    margin: 0 auto;
    touch-action: none;
    background: white;
    border-radius: 32px;
    border: solid 1px #ccc;
  }
</style>
