import PokemonDetailsCard from './PokemonDetailsCard.vue';
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { FetchPokemonDetails } from '../../services/pokemon';

const defaultProps: FetchPokemonDetails = {
  weight: '60',
  height: '10',
  stats: [
    {
      base_stat: 80,
      effort: 80,
      stat: {
        name: 'attack',
        url: 'fake-url',
      },
    },
  ],
  sprites: {
    front_default: 'fake-url',
  },
  name: 'pokemon',
  id: 1,
  types: [
    {
      slot: 1,
      type: {
        name: 'grass',
        url: 'fake-url',
      },
    },
  ],
};

describe('PokemonDetails Unit Testing', () => {
  it('renders correctly', () => {
    const wrapper = mount(PokemonDetailsCard, {
      props: {
        pokemonDetails: defaultProps,
      },
    });

    expect(wrapper.html())
      .toBe(`<div class="container" data-v-258a6f1c=""><img src="fake-url" data-v-258a6f1c="">
  <div data-v-258a6f1c=""><b data-v-258a6f1c="">Name:</b> pokemon</div>
  <div class="info" data-v-258a6f1c="">
    <div data-v-258a6f1c=""><b data-v-258a6f1c="">Height:</b> 100 cm</div>
    <div data-v-258a6f1c=""><b data-v-258a6f1c="">Weight:</b> 6 kg</div>
    <div data-v-258a6f1c=""><b data-v-258a6f1c="">Stats:</b>
      <div data-v-258a6f1c=""><span data-v-258a6f1c="">attack</span>: 80</div>
    </div>
    <div data-v-258a6f1c=""><b data-v-258a6f1c="">Types:</b>
      <div data-v-258a6f1c=""><span data-v-258a6f1c="">grass</span></div>
    </div>
  </div>
</div>`);
  });

  it('should not display when props are empty', () => {
    const wrapper = mount(PokemonDetailsCard, {
      props: {
        pokemonDetails: null,
      },
    });

    expect(wrapper.text().includes('Name')).toBe(false);
  });
});
