import { writable } from 'svelte/store';

const gallery = writable<string[]>(
  [],
  (set) => {
    const persisted = localStorage.getItem(
      'gallery'
    );

    if (!persisted) {
      set([] as string[]);
      return;
    }

    try {
      set(JSON.parse(persisted));
    } catch {
      alert(
        'Could not load saved drawings!'
      );
      set([] as string[]);
    }
  }
);

gallery.subscribe((value) => {
  try {
    localStorage.setItem(
      'gallery',
      JSON.stringify(value)
    );
  } catch {
    alert('Could not save drawing!');
  }
});

export default gallery;
