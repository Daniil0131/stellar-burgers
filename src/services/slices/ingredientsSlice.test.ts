import reducer, { fetchIngredients } from './ingredientsSlice';
import type { TIngredient } from '@utils-types';

const ingredients: TIngredient[] = [
  {
    _id: 'bun-id',
    name: 'Булка',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: '',
    image_mobile: '',
    image_large: ''
  }
];

describe('ingredientsSlice', () => {
  it('обрабатывает pending', () => {
    const state = reducer(undefined, fetchIngredients.pending(''));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает fulfilled', () => {
    const state = reducer(
      undefined,
      fetchIngredients.fulfilled(ingredients, '')
    );

    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(ingredients);
  });

  it('обрабатывает rejected', () => {
    const state = reducer(
      undefined,
      fetchIngredients.rejected(null, '', undefined, 'Ошибка загрузки')
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
