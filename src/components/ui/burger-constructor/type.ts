import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorItems = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

export type BurgerConstructorUIProps = {
  price: number;
  orderRequest: boolean;
  constructorItems: TConstructorItems;
  orderModalData: { number: number } | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
  onDelete: (id: string) => void;
};
