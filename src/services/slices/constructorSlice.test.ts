import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './constructorSlice';
import type { TIngredient } from '@utils-types';

const bun: TIngredient = {
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
};

const main: TIngredient = {
  _id: 'main-id',
  name: 'Котлета',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: '',
  image_mobile: '',
  image_large: ''
};

const sauce: TIngredient = {
  _id: 'sauce-id',
  name: 'Соус',
  type: 'sauce',
  proteins: 1,
  fat: 2,
  carbohydrates: 3,
  calories: 4,
  price: 100,
  image: '',
  image_mobile: '',
  image_large: ''
};

describe('constructorSlice', () => {
  it('добавляет булку', () => {
    const state = reducer(undefined, addIngredient(bun));

    expect(state.bun).toEqual(bun);
    expect(state.ingredients).toEqual([]);
  });

  it('добавляет начинку', () => {
    const state = reducer(undefined, addIngredient(main));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject(main);
    expect(state.ingredients[0]).toHaveProperty('id');
  });

  it('удаляет ингредиент', () => {
    const stateWithIngredient = reducer(undefined, addIngredient(main));
    const id = stateWithIngredient.ingredients[0].id;

    const state = reducer(stateWithIngredient, removeIngredient(id));

    expect(state.ingredients).toHaveLength(0);
  });

  it('меняет порядок ингредиентов', () => {
    let state = reducer(undefined, addIngredient(main));
    state = reducer(state, addIngredient(sauce));

    const newState = reducer(
      state,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(newState.ingredients[0].name).toBe('Соус');
    expect(newState.ingredients[1].name).toBe('Котлета');
  });

  it('очищает конструктор', () => {
    let state = reducer(undefined, addIngredient(bun));
    state = reducer(state, addIngredient(main));

    const clearedState = reducer(state, clearConstructor());

    expect(clearedState.bun).toBeNull();
    expect(clearedState.ingredients).toEqual([]);
  });
});
