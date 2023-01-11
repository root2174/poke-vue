import Header from './Header.vue';
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from '../../routes';

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

describe('Header Unit Testing', () => {
  it('renders correctly', () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('img').exists()).toBe(true);
  });

  it('redirects user to home when logo is clicked.', async () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [router],
      },
    });

    const push = vi.spyOn(router, 'push');
    await wrapper.find('img').trigger('click');

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith('/');
  });
});
