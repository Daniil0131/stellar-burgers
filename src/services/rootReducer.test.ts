import { rootReducer } from './rootReducer';

describe('rootReducer', () => {
  it('возвращает начальное состояние при неизвестном экшене', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: {
        items: [],
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      },
      order: {
        orderRequest: false,
        orderModalData: null,
        error: null
      },
      userOrders: {
        orders: [],
        isLoading: false,
        error: null
      },
      user: {
        user: null,
        isAuthenticated: false,
        isAuthChecked: false,
        request: false,
        error: null
      }
    });
  });
});
