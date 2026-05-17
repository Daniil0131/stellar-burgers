import '../../index.css';
import styles from './app.module.css';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import {
  AppHeader,
  Modal,
  ProtectedRoute,
  IngredientDetails,
  OrderInfo
} from '@components';
import { Preloader } from '@ui';

import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { getUser, authChecked } from '../../services/slices/userSlice';
import { getCookie } from '../../utils/cookie';

import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as { background?: Location } | null;
  const background = state?.background;

  const {
    items: ingredients,
    isLoading: isIngredientsLoading,
    error
  } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (getCookie('accessToken')) {
      dispatch(getUser());
    } else {
      dispatch(authChecked());
    }
  }, [dispatch]);

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      {isIngredientsLoading ? (
        <Preloader />
      ) : error ? (
        <div className={`${styles.error} text text_type_main-medium pt-4`}>
          {error}
        </div>
      ) : (
        <>
          <Routes location={background || location}>
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/feed' element={<Feed />} />

            <Route
              path='/login'
              element={
                <ProtectedRoute onlyUnAuth>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path='/register'
              element={
                <ProtectedRoute onlyUnAuth>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path='/forgot-password'
              element={
                <ProtectedRoute onlyUnAuth>
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path='/reset-password'
              element={
                <ProtectedRoute onlyUnAuth>
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile/orders'
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />

            <Route path='/ingredients/:id' element={<IngredientDetails />} />
            <Route path='/feed/:number' element={<OrderInfo />} />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              }
            />

            <Route path='*' element={<NotFound404 />} />
          </Routes>

          {background && (
            <Routes>
              <Route
                path='/ingredients/:id'
                element={
                  <Modal onClose={closeModal} title='Детали ингредиента'>
                    <IngredientDetails />
                  </Modal>
                }
              />

              <Route
                path='/feed/:number'
                element={
                  <Modal onClose={closeModal} title='Детали заказа'>
                    <OrderInfo />
                  </Modal>
                }
              />

              <Route
                path='/profile/orders/:number'
                element={
                  <ProtectedRoute>
                    <Modal onClose={closeModal} title='Детали заказа'>
                      <OrderInfo />
                    </Modal>
                  </ProtectedRoute>
                }
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

export default App;
