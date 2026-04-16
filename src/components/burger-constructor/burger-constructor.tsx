import { FC, useMemo } from 'react';
import { useDrop } from 'react-dnd';

import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient, TIngredient } from '@utils-types';

import { useDispatch, useSelector } from '../../services/store';
import {
  addIngredient,
  clearConstructor,
  removeIngredient
} from '../../services/slices/constructorSlice';
import {
  clearOrderModalData,
  createOrder
} from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();

  const constructorItems = useSelector((state) => state.burgerConstructor);
  const orderRequest = useSelector((state) => state.order.orderRequest);
  const orderModalData = useSelector((state) => state.order.orderModalData);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: TIngredient) {
      dispatch(addIngredient(item));
    }
  });

  const handleDelete = (id: string) => {
    dispatch(removeIngredient(id));
  };

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    dispatch(createOrder())
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      })
      .catch(() => {});
  };

  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (sum: number, item: TConstructorIngredient) => sum + item.price,
        0
      ),
    [constructorItems]
  );

  return (
    <div ref={dropTarget}>
      <BurgerConstructorUI
        price={price}
        orderRequest={orderRequest}
        constructorItems={constructorItems}
        orderModalData={orderModalData}
        onOrderClick={onOrderClick}
        closeOrderModal={closeOrderModal}
        onDelete={handleDelete}
      />
    </div>
  );
};
