import { FC, memo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { BurgerConstructorElementUI } from '../ui/burger-constructor-element';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import { moveIngredient } from '../../services/slices/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems, onDelete }) => {
    const dispatch = useDispatch();
    const ref = useRef<HTMLLIElement>(null);

    const [, drop] = useDrop({
      accept: 'constructorIngredient',
      hover(item: { index: number }) {
        if (item.index === index) return;

        dispatch(
          moveIngredient({
            fromIndex: item.index,
            toIndex: index
          })
        );

        item.index = index;
      }
    });

    const [, drag] = useDrag({
      type: 'constructorIngredient',
      item: { index }
    });

    drag(drop(ref));

    const handleMoveUp = () => {
      if (index === 0) return;
      dispatch(moveIngredient({ fromIndex: index, toIndex: index - 1 }));
    };

    const handleMoveDown = () => {
      if (index === totalItems - 1) return;
      dispatch(moveIngredient({ fromIndex: index, toIndex: index + 1 }));
    };

    const handleClose = () => {
      onDelete(ingredient.id);
    };

    return (
      <li ref={ref}>
        <BurgerConstructorElementUI
          ingredient={ingredient}
          index={index}
          totalItems={totalItems}
          handleMoveUp={handleMoveUp}
          handleMoveDown={handleMoveDown}
          handleClose={handleClose}
        />
      </li>
    );
  }
);
