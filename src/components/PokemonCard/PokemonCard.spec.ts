import PokemonCard from './PokemonCard.vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from '../../routes';
import { nextTick } from 'vue';
import { fetchPokemonDetailsByUrl } from '../../services/pokemon';

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

vi.mock('../../services/pokemon/index.ts', () => ({
  fetchPokemonDetailsByUrl: vi.fn().mockResolvedValue({
    id: 1,
    sprites: { front_default: 'fake-img-url' },
  }),
}));

describe('PokemonCard Unit Testing', () => {
  let wrapper: VueWrapper;
  beforeEach(() => {
    wrapper = mount(PokemonCard, {
      props: {
        pokemon: {
          name: 'pokemon',
          url: 'fake-url',
        },
      },
      global: {
        plugins: [router],
      },
    });
  });

  it('renders correctly', async () => {
    expect(fetchPokemonDetailsByUrl).toHaveBeenCalledTimes(1);
    expect(wrapper.text()).toContain('pokemon');
  });
});
